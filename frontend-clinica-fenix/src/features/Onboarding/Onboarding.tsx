import { useState } from 'react';
import DefaultLayout from "@/layout/DefaultLayout/DefaultLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Building2, UserPlus, Users } from "lucide-react";

export const Onboarding = () => {
  const [activeTab, setActiveTab] = useState("welcome");

  return (
    <DefaultLayout
      title="Clinica Fenix"
      description="Onboarding page AYD2"
    >
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Logo and Welcome Section */}
          <div className="text-center space-y-4">
            <div className="inline-block p-2 bg-slate-900 rounded-lg mb-4">
              <Building2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
              Bienvenido a Clínica Fénix
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Tu salud es nuestra prioridad. Comienza tu experiencia con nosotros.
            </p>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full max-w-xl mx-auto">
              <TabsTrigger value="welcome">Bienvenida</TabsTrigger>
              <TabsTrigger value="role">Rol</TabsTrigger>
              <TabsTrigger value="start">Comenzar</TabsTrigger>
            </TabsList>

            <TabsContent value="welcome" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>¡Bienvenido al Sistema!</CardTitle>
                  <CardDescription>
                    Estamos aquí para ayudarte a comenzar con tu experiencia en Clínica Fénix
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg bg-slate-50">
                      <Users className="w-8 h-8 mb-2 text-slate-600" />
                      <h3 className="font-semibold">Para Pacientes</h3>
                      <p className="text-sm text-slate-600">Accede a tus citas y expediente médico</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-slate-50">
                      <UserPlus className="w-8 h-8 mb-2 text-slate-600" />
                      <h3 className="font-semibold">Para Personal Médico</h3>
                      <p className="text-sm text-slate-600">Gestiona pacientes y consultas</p>
                    </div>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => setActiveTab("role")}
                  >
                    Continuar <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="role">
              <Card>
                <CardHeader>
                  <CardTitle>Selecciona tu Rol</CardTitle>
                  <CardDescription>
                    Elige el tipo de cuenta que mejor se adapte a tus necesidades
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <Button 
                      variant="outline" 
                      className="justify-start h-auto p-4"
                      onClick={() => setActiveTab("start")}
                    >
                      <div className="flex items-center space-x-4">
                        <Users className="w-6 h-6" />
                        <div className="text-left">
                          <h3 className="font-semibold">Paciente</h3>
                          <p className="text-sm text-slate-600">Para usuarios que buscan atención médica</p>
                        </div>
                      </div>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start h-auto p-4"
                      onClick={() => setActiveTab("start")}
                    >
                      <div className="flex items-center space-x-4">
                        <UserPlus className="w-6 h-6" />
                        <div className="text-left">
                          <h3 className="font-semibold">Personal Médico</h3>
                          <p className="text-sm text-slate-600">Para doctores y personal de la clínica</p>
                        </div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="start">
              <Card>
                <CardHeader>
                  <CardTitle>¡Todo Listo!</CardTitle>
                  <CardDescription>
                    Ya puedes comenzar a usar el sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600">
                    Has completado el proceso de onboarding. Ahora puedes acceder a todas las funcionalidades según tu rol.
                  </p>
                  <Button className="w-full">
                    Comenzar a Usar el Sistema
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Onboarding;