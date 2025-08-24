export const metadata = {
  title: "Registrace | vojta kostkan",
};

export default function RegisterPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-2xl font-semibold">Registrace</h1>
      <p className="text-sm text-neutral-700">
        Registrace je omezená na schválené účty. Pokud potřebujete přístup,
        kontaktujte správce webu.
      </p>
    </main>
  );
}
