import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Users, Calendar, FileText } from "lucide-react";
import { usePatientsStore } from "@/store/dashboard"; 
// Forms
import { PatientForm } from "@/features";
import { PatientList } from "@/features";
import { IPatient } from "@/features";

type TabType = 'patients' | 'quotes' | 'recipes';

export function DashboardView() {
  const [activeTab, setActiveTab] = useState<TabType>('patients');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<IPatient | null>(null);
  const totalPatients = usePatientsStore((state) => state.totalPatients);
  const getFormTitle = () => {
    switch (activeTab) {
      case 'patients':
        return editingPatient ? 'Editar Paciente' : 'Nuevo Paciente';
      case 'quotes':
        return 'Nueva Cita';
      case 'recipes':
        return 'Nueva Receta';
    }
  };

  const getFormDescription = () => {
    switch (activeTab) {
      case 'patients':
        return editingPatient 
          ? 'Modifica los datos del paciente.' 
          : 'Ingresa los datos del nuevo paciente.';
      case 'quotes':
        return 'Programa una nueva cita médica.';
      case 'recipes':
        return 'Crea una nueva receta médica.';
    }
  };

  const handleEditPatient = (patient: IPatient) => {
    setEditingPatient(patient);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingPatient(null);
  };

  const handleNewClick = () => {
    setEditingPatient(null);
    setIsDialogOpen(true);
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'patients':
        return (
          <PatientForm 
            onSuccess={handleCloseDialog} 
            editingPatient={editingPatient}
          />
        );
      case 'quotes':
        return <PatientForm onSuccess={handleCloseDialog} />;
      case 'recipes':
        return <PatientForm onSuccess={handleCloseDialog} />;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Panel de Control</h1>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <Users className="h-4 w-4 inline-block mr-2" />
              Pacientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPatients}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <Calendar className="h-4 w-4 inline-block mr-2" />
              Citas Pendientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <FileText className="h-4 w-4 inline-block mr-2" />
              Recetas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs 
        defaultValue="patients" 
        className="space-y-4"
        onValueChange={(value) => {
          setActiveTab(value as TabType);
          setEditingPatient(null);
          setIsDialogOpen(false);
        }}
      >
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="patients">Pacientes</TabsTrigger>
            <TabsTrigger value="quotes">Citas</TabsTrigger>
            <TabsTrigger value="recipes">Recetas</TabsTrigger>
          </TabsList>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Button 
              onClick={handleNewClick}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              {'Nuevo Registro'}
            </Button>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{getFormTitle()}</DialogTitle>
                <DialogDescription>
                  {getFormDescription()}
                </DialogDescription>
              </DialogHeader>
              {renderForm()}
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Listado de Pacientes</CardTitle>
            </CardHeader>
            <CardContent>
              <PatientList onEdit={handleEditPatient} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quotes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Listado de Citas</CardTitle>
            </CardHeader>
            <CardContent>
              <PatientList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recipes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Listado de Recetas</CardTitle>
            </CardHeader>
            <CardContent>
              <PatientList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}