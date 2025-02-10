import { useEffect, useState } from "react";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
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
import { Plus, Users, Calendar, FileText, UserCircle, LogOut } from "lucide-react";
import { usePatientsStore, useQuotesStore, useRecipesStore  } from "@/store/dashboard"; 
import { useAuthStore } from "@/store/auth";
import { navigationService } from '../../router';
// Forms
import { PatientForm, useQuotes, useRecipes } from "@/features";
import { PatientList } from "@/features";
import { IPatient } from "@/features";
import { QuoteForm } from "@/features";
import { QuoteList } from "@/features";
import { IQuote } from "@/features";
import { RecipeList } from "@/features";
import { RecipeForm } from "@/features";
import { IRecipe } from "@/features";
type TabType = 'patients' | 'quotes' | 'recipes';

export function DashboardView() {
  const [activeTab, setActiveTab] = useState<TabType>('patients');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<IPatient | null>(null);
  const [editingQuote, setEditingQuote] = useState<IQuote | null>(null);
  const [editingRecipe, setEditingRecipe] = useState<IRecipe | null>(null);
  //endpoints
  const { data: quotesData } = useQuotes();
  const { data: recipesData } = useRecipes();
  //store
  const totalPatients = usePatientsStore((state) => state.totalPatients);
  const totalQuotes = useQuotesStore((state) => state.totalQuotes);
  const totalRecipes = useRecipesStore((state) => state.totalRecipes);

  const { user, logout } = useAuthStore();
  const fullName = `${user?.name ?? ''} ${user?.lastname ?? ''}`.trim();
  const usernameDisplay = user?.username ? `@${user.username}` : '';

  useEffect(() => {
    if (quotesData) {
      useQuotesStore.getState().setTotalQuotes(quotesData.data.quotes.length);
    }    
  }, [quotesData]);

  useEffect(() => {
    if (recipesData?.data?.recipes) {
      useRecipesStore.getState().setTotalRecipes(recipesData.data.recipes.length);
    }
  }, [recipesData]);

  const logoutAccount = () => {
    navigationService.goToLogin();
    logout();
  }

  const getFormTitle = () => {
    switch (activeTab) {
      case 'patients':
        return editingPatient ? 'Editar Paciente' : 'Nuevo Paciente';
      case 'quotes':
        return editingQuote ? 'Editar cita' : 'Nueva Cita';
      case 'recipes':
        return editingRecipe ? 'Editar Receta' : 'Nueva Receta';
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

  const handleEditQuote = (quote: IQuote) => {
    setEditingQuote(quote);
    setIsDialogOpen(true);
  }

  const handleEditRecipe = (recipe: IRecipe) => {
    setEditingRecipe(recipe);
    setIsDialogOpen(true);
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingPatient(null);
    setEditingQuote(null);
    setEditingRecipe(null);
  };

  const handleNewClick = () => {
    setEditingPatient(null);
    setEditingQuote(null);
    setEditingRecipe(null);
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
        return (
          <QuoteForm 
            onSuccess={handleCloseDialog} 
            editingQuote={editingQuote}
          />
        )
      case 'recipes':
        return <RecipeForm
          onSuccess={handleCloseDialog}
          editingRecipe={editingRecipe} />;
    }
  };
  const ProfileDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 hover:bg-gray-100 group"
        >
          <div className="relative">
            <UserCircle className="h-7 w-7 text-primary group-hover:text-primary/80 transition-colors" />
            {user?.role === 'admin' && (
              <span className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs px-1 rounded-full">
                ★
              </span>
            )}
          </div>
          <div className="hidden sm:block text-left">
            {fullName && (
              <p className="text-sm font-medium text-foreground">{fullName}</p>
            )}
            {usernameDisplay && (
              <p className="text-xs text-muted-foreground">{usernameDisplay}</p>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-64 p-2">
        <DropdownMenuLabel className="flex flex-col gap-1 bg-accent/50 rounded-md p-3">
          {fullName && (
            <div className="font-medium text-foreground truncate">{fullName}</div>
          )}
          <div className="flex flex-col gap-1">
            {user?.email && (
              <div className="text-xs text-muted-foreground truncate">
                ✉️ {user.email}
              </div>
            )}
            {usernameDisplay && (
              <div className="text-xs text-muted-foreground truncate">
                👤 {usernameDisplay}
              </div>
            )}
            {user?.role && (
              <div className="text-xs text-primary mt-1">
                🛡️ {user.role.toUpperCase()}
              </div>
            )}
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          onSelect={() => logoutAccount()}
          className="cursor-pointer focus:bg-red-50 focus:text-red-600 px-3 py-2.5"
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span className="font-medium">Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Panel de Control</h1>
        <ProfileDropdown />
      </div>
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
              Citas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuotes}</div>
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
            <div className="text-2xl font-bold">{totalRecipes}</div>
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
              <QuoteList onEdit={handleEditQuote} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recipes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Listado de Recetas</CardTitle>
            </CardHeader>
            <CardContent>
              <RecipeList onEdit={handleEditRecipe}/>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

