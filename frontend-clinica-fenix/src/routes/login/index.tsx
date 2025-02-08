import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/features/Login";
import DefaultLayout from "@/layout/DefaultLayout/DefaultLayout";
import { createPublicGuard } from "@/utils/functions/guards/public.guard";

export const Route = createFileRoute("/login/")({
  component: RouteComponent,
  beforeLoad: createPublicGuard({
    redirectTo: "/home",
  }),
});

function RouteComponent() {
  return (
    <DefaultLayout
      title="Iniciar sesión"
      description="Ingresa tus credenciales para acceder a tu cuenta."
    >
      <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        {/* Fondo animado */}
        <div
          className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{
            backgroundImage: 'url(/background2.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-gray-900/90 to-gray-900/95 backdrop-blur-sm" />
        </div>

        {/* Contenedor del formulario */}
        <div className="relative z-10 w-full max-w-sm animate-fade-up">
          <LoginForm />
        </div>
      </div>
    </DefaultLayout>
  );
}