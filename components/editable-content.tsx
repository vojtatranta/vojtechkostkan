"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLang } from "@/components/lang-context";

type EditableContentProps = {
  id: string; // unique id of the content block
  placeholder?: string;
  placeholderByLocale?: { cs?: string; en?: string };
  as?: "p" | "h1" | "h2" | "h3" | "div" | "span";
  className?: string;
  initialValue?: string; // optional server-provided initial value to SSR without flash
  initialValueByLocale?: Partial<Record<string, string>>; // optional map of locale -> initial value
};

export default function EditableContent({
  id,
  placeholder = "",
  placeholderByLocale,
  as = "div",
  className,
  initialValue,
  initialValueByLocale,
}: EditableContentProps) {
  const { data: session, status } = useSession();
  const isAuthed = !!session?.user?.email;
  const { locale } = useLang();
  const router = useRouter();

  const t = useMemo(
    () =>
      locale === "cs"
        ? {
            editTitle:
              "Klikněte pro úpravu. Změny uložte tlačítkem Uložit.",
            editBtnAria: "Upravit obsah",
            save: "Uložit",
            discard: "Zahodit",
            signOut: "Odhlásit",
            statusDirty: "Neuložené změny",
            statusSaved: "Uloženo",
            hideControlsTitle: "Skrýt ovládání",
          }
        : {
            editTitle:
              "Click to edit. Save your changes with the Save button.",
            editBtnAria: "Edit content",
            save: "Save",
            discard: "Discard",
            signOut: "Sign out",
            statusDirty: "Unsaved changes",
            statusSaved: "Saved",
            hideControlsTitle: "Hide controls",
          },
    [locale]
  );

  // Pick the effective initial based on current locale.
  // If a per-locale map is provided, do NOT fall back to generic initialValue to avoid mixing locales.
  const effectiveInitial = useMemo(() => {
    if (initialValueByLocale) {
      const v = initialValueByLocale[locale];
      return v ?? ""; // show placeholder when missing translation
    }
    return initialValue ?? "";
  }, [initialValueByLocale, initialValue, locale]);

  const effectivePlaceholder = useMemo(() => {
    if (placeholderByLocale) {
      return placeholderByLocale[locale] ?? placeholder ?? "";
    }
    return placeholder ?? "";
  }, [placeholderByLocale, placeholder, locale]);

  const [value, setValue] = useState<string>(effectiveInitial);
  const [serverValue, setServerValue] = useState<string>(effectiveInitial);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pinned, setPinned] = useState<boolean>(false); // keep toolbar visible while editing
  const [dismissed, setDismissed] = useState<boolean>(false); // user manually hid toolbar
  const [focusWithin, setFocusWithin] = useState<boolean>(false);
  const [editHover, setEditHover] = useState<boolean>(false);

  const dirty = useMemo(() => value !== serverValue, [value, serverValue]);

  // Ref to control the contentEditable element without React clobbering selection
  const elRef = useRef<HTMLElement | null>(null);

  // Reset state when id, locale, or provided initial values change
  useEffect(() => {
    setValue(effectiveInitial);
    setServerValue(effectiveInitial);
    const el = elRef.current;
    if (el) {
      const initial = effectiveInitial || effectivePlaceholder || "";
      if (el.textContent !== initial) {
        el.textContent = initial;
      }
    }
  }, [id, locale, effectiveInitial, effectivePlaceholder]);

  // Initialize the editable DOM content when switching auth state (mount) to avoid flashes
  useEffect(() => {
    if (!isAuthed) return;
    const el = elRef.current;
    if (!el) return;
    const initial = (serverValue ?? "") || effectivePlaceholder || "";
    if (el.textContent !== initial) {
      el.textContent = initial;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthed]);

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: id, value, locale }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `Chyba uložení (${res.status})`);
      }
      setServerValue(value);
      setPinned(false);
      setDismissed(false);
    } catch (e: any) {
      setError(e?.message || "Chyba uložení");
    } finally {
      setSaving(false);
    }
  };

  const discard = () => {
    setValue(serverValue);
    // Reflect the reverted value into the contentEditable element immediately
    const el = elRef.current;
    if (el) {
      el.textContent = (serverValue ?? "") || effectivePlaceholder || "";
    }
    setPinned(false);
    setDismissed(false);
  };

  const Tag: any = as;

  return (
    <div>
      {!isAuthed ? (
        <Tag className={className}>{value || effectivePlaceholder}</Tag>
      ) : (
        <div
          className={"group relative"}
          onFocus={() => setFocusWithin(true)}
          onBlur={() => setFocusWithin(false)}
        >
          <Tag
            ref={elRef as any}
            className={
              (className ? className + " " : "") +
              "rounded-md outline-none ring-0 focus:outline-dashed focus:outline-1 focus:outline-orange-300/50 selection:bg-orange-200/30" +
              (editHover
                ? " outline-dashed outline-2 outline-offset-2 outline-orange-400/70"
                : "") +
              (focusWithin || dirty
                ? " ring-2 ring-orange-400/60 ring-offset-2 ring-offset-white"
                : "")
            }
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            title={t.editTitle}
            onInput={(e: React.FormEvent<HTMLElement>) => {
              // Do not trim while typing to avoid caret jumps
              setValue(e.currentTarget.textContent || "");
              setPinned(true);
              setDismissed(false);
            }}
            onKeyDown={(e: any) => {
              // Prevent newlines in headings for cleaner layout
              if (
                (as === "h1" || as === "h2" || as === "h3") &&
                e.key === "Enter"
              ) {
                e.preventDefault();
              }
            }}
            onPaste={(e: React.ClipboardEvent<HTMLElement>) => {
              // Paste as plain text to avoid unexpected formatting
              e.preventDefault();
              const text = e.clipboardData.getData("text/plain");
              // Insert at caret
              try {
                document.execCommand("insertText", false, text);
              } catch {
                const sel = window.getSelection();
                if (!sel || sel.rangeCount === 0) return;
                sel.deleteFromDocument();
                sel.getRangeAt(0).insertNode(document.createTextNode(text));
                // Move caret to end
                sel.collapseToEnd();
              }
            }}
            data-editable="true"
          />

          {(focusWithin || dirty) && !dismissed && (
            <div
              className={
                "absolute left-0 bottom-full mb-2 z-50 flex items-center gap-2 rounded-md border border-neutral-200 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/85 p-2"
              }
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onClick={(e) => e.stopPropagation()}
              >
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  save();
                }}
                disabled={!dirty || saving}
                className="rounded bg-black px-3 py-1.5 text-xs text-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {saving ? "Saving…" : t.save}
              </button>
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  discard();
                }}
                disabled={!dirty || saving}
                className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-xs text-black disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t.discard}
              </button>
              <span className="ml-2 text-[11px] text-neutral-600">
                {dirty ? t.statusDirty : t.statusSaved}
              </span>
              <button
                type="button"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={async (e) => {
                  e.stopPropagation();
                  setPinned(false);
                  setDismissed(false);
                  try {
                    await signOut({ redirect: false });
                  } finally {
                    const target = locale === "en" ? "/en" : "/";
                    router.replace(target);
                    router.refresh();
                  }
                }}
                className="ml-2 rounded border border-neutral-300 bg-white px-2.5 py-1 text-[11px] text-neutral-700 hover:bg-neutral-50"
                title={t.signOut}
              >
                {t.signOut}
              </button>
              <button
                type="button"
                aria-label={t.hideControlsTitle}
                title={t.hideControlsTitle}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  setPinned(false);
                  setDismissed(true);
                }}
                className="ml-2 rounded border border-neutral-300 bg-white px-2 py-1 text-[11px] text-neutral-700 hover:bg-neutral-50"
              >
                ✕
              </button>
            </div>
          )}
          {/* Edit trigger button (always visible) */}
          <button
            type="button"
            aria-label={t.editBtnAria}
            title={t.editBtnAria}
            className="absolute -right-2 -top-2 z-50 h-7 w-7 rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm text-neutral-700 shadow-sm hover:bg-white hover:opacity-100 opacity-60 transition-opacity duration-150 flex items-center justify-center"
            onMouseEnter={() => setEditHover(true)}
            onMouseLeave={() => setEditHover(false)}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              const el = elRef.current as HTMLElement | null;
              if (!el) return;
              // Ensure content is initialized
              if (el.textContent == null || el.textContent === "") {
                el.textContent = (serverValue ?? "") || effectivePlaceholder || "";
              }
              // Focus and move caret to end
              el.focus();
              try {
                const sel = window.getSelection();
                if (sel) {
                  const range = document.createRange();
                  range.selectNodeContents(el);
                  range.collapse(false); // caret at end
                  sel.removeAllRanges();
                  sel.addRange(range);
                }
              } catch {}
              setPinned(true);
              setDismissed(false);
            }}
          >
            {/* simple pencil icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M15.586 3.586a2 2 0 0 1 0 2.828l-9 9A2 2 0 0 1 5.172 16H3a1 1 0 0 1-1-1v-2.172a2 2 0 0 1 .586-1.414l9-9a2 2 0 0 1 2.828 0ZM12 5l3 3" />
            </svg>
          </button>
          {error && <div className="mt-2 text-xs text-red-600">{error}</div>}
        </div>
      )}
    </div>
  );
}
