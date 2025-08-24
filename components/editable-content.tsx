"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";

type EditableContentProps = {
  id: string; // unique id of the content block
  placeholder?: string;
  as?: "p" | "h1" | "h2" | "h3" | "div" | "span";
  className?: string;
  initialValue?: string; // optional server-provided initial value to SSR without flash
};

export default function EditableContent({
  id,
  placeholder = "",
  as = "div",
  className,
  initialValue,
}: EditableContentProps) {
  const { data: session, status } = useSession();
  const isAuthed = !!session?.user?.email;

  const [value, setValue] = useState<string>(initialValue ?? "");
  const [serverValue, setServerValue] = useState<string>(initialValue ?? "");
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pinned, setPinned] = useState<boolean>(false); // keep toolbar visible while editing
  const [dismissed, setDismissed] = useState<boolean>(false); // user manually hid toolbar

  const dirty = useMemo(() => value !== serverValue, [value, serverValue]);

  // Ref to control the contentEditable element without React clobbering selection
  const elRef = useRef<HTMLElement | null>(null);

  // Initialize the editable DOM content when switching to edit mode or when key changes
  useEffect(() => {
    if (!isAuthed) return;
    const el = elRef.current;
    if (!el) return;
    // Only set initial content when mounting/changing id/auth, not on every keystroke
    const initial = (serverValue ?? "") || placeholder || "";
    if (el.textContent !== initial) {
      el.textContent = initial;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isAuthed]);

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: id, value }),
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
      el.textContent = (serverValue ?? "") || placeholder || "";
    }
    setPinned(false);
    setDismissed(false);
  };

  const Tag: any = as;

  return (
    <div>
      {!isAuthed ? (
        <Tag className={className}>{value || placeholder}</Tag>
      ) : (
        <div className="group relative">
          <Tag
            ref={elRef as any}
            className={
              (className ? className + " " : "") +
              "outline-none ring-0 focus:outline-dashed focus:outline-1 focus:outline-white/60 selection:bg-orange-200/40"
            }
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            title="Klikněte pro úpravu. Změny uložte tlačítkem Uložit."
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

          <div
            className={
              "absolute left-0 -top-1 -translate-y-full z-50 flex items-center gap-2 rounded-md border border-neutral-200 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/85 p-2 transition-opacity duration-150 " +
              ((pinned || (dirty && !dismissed))
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none") +
              " group-hover:opacity-100 group-hover:pointer-events-auto focus-within:opacity-100 focus-within:pointer-events-auto"
            }
          >
            <button
              onClick={save}
              disabled={!dirty || saving}
              className="rounded bg-black px-3 py-1.5 text-xs text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {saving ? "Ukládám…" : "Uložit"}
            </button>
            <button
              onClick={discard}
              disabled={!dirty || saving}
              className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-xs text-black disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Zahodit
            </button>
            <span className="ml-2 text-[11px] text-neutral-600">
              {dirty ? "Neuložené změny" : "Uloženo"}
            </span>
            <button
              type="button"
              onClick={async () => {
                setPinned(false);
                setDismissed(true);
                await signOut();
              }}
              className="ml-2 rounded border border-neutral-300 bg-white px-2.5 py-1 text-[11px] text-neutral-700 hover:bg-neutral-50"
              title="Odhlásit"
            >
              Odhlásit
            </button>
            <button
              type="button"
              aria-label="Skrýt ovládání"
              title="Skrýt ovládání"
              onClick={() => {
                setPinned(false);
                setDismissed(true);
              }}
              className="ml-2 rounded border border-neutral-300 bg-white px-2 py-1 text-[11px] text-neutral-700 hover:bg-neutral-50"
            >
              ✕
            </button>
          </div>
          {error && <div className="mt-2 text-xs text-red-600">{error}</div>}
        </div>
      )}
    </div>
  );
}
