import LoginForm from "@/components/auth/login-form";

export const metadata = {
  title: "Přihlášení | vojta kostkan",
};

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-2xl font-semibold">Přihlášení</h1>
      <LoginForm />
    </main>
  );
}
