import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePatients, useRecipeForm } from "@/features";
import { LoadingOverlay } from "@/components/Loader/Loader";
import { IRecipe } from "@/features";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RecipeFormProps extends React.ComponentPropsWithoutRef<"div"> {
onSuccess?: () => void;
editingRecipe?: IRecipe | null;
}

export function RecipeForm({
className,
onSuccess,
editingRecipe,
...props
}: RecipeFormProps) {
const { form, onSubmit, isLoading } = useRecipeForm({ 
    onSuccess, 
    editingRecipe 
});

const buttonText = editingRecipe ? "Actualizar Receta" : "Crear Receta";
const { data: patientsData } = usePatients();
return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className={cn("flex flex-col gap-6", className)} {...props}>
                <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="id_patient"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Paciente</FormLabel>
                                <Select 
                                    onValueChange={(value) => field.onChange(Number(value))} 
                                    value={field.value?.toString()}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona un paciente" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {patientsData?.data.patients.map((patient) => (
                                            <SelectItem 
                                                key={patient.id_patient} 
                                                value={patient.id_patient?.toString() || ""}
                                            >
                                                {patient.name} {patient.lastname}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="medicine"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Medicamento</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre del medicamento" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="dose"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Dosis</FormLabel>
                                <FormControl>
                                    <Input placeholder="Dosis del medicamento" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="frequency"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Frecuencia</FormLabel>
                                <FormControl>
                                    <Input placeholder="Frecuencia de administración" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="indications"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Indicaciones</FormLabel>
                                <FormControl>
                                    <Input placeholder="Indicaciones adicionales" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="doctor_signature"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Firma del Doctor</FormLabel>
                                <FormControl>
                                    <Input placeholder="Firma del doctor" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white hover:bg-blue-700" 
                    disabled={isLoading}
                >
                    {buttonText}
                </Button>
            </div>
            {isLoading && <LoadingOverlay />}
        </form>
    </Form>
);
}