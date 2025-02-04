import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/features/Login";
import DefaultLayout from "@/layout/DefaultLayout/DefaultLayout";

export const Route = createFileRoute("/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DefaultLayout
      title="Iniciar sesión"
      description="Ingresa tus credenciales para acceder a tu cuenta."
    >
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </DefaultLayout>
  );
}
