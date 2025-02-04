import DefaultLayout from "@/layout/DefaultLayout/DefaultLayout";

export const Onboarding = () => {
  return (
    <DefaultLayout
      title="Clinica Fenix"
      description="Onboarding page AYD2"
    >
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-5xl font-bold text-center text-gray-800">
          FRONTEND CLINICA FENIX
        </h1>
      </div>
    </DefaultLayout>
  );
};
