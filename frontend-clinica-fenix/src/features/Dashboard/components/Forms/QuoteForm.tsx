import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { usePatients, useQuoteForm } from "@/features";
import { LoadingOverlay } from "@/components/Loader/Loader";
import { IQuote } from "@/features";

interface QuoteFormProps extends React.ComponentPropsWithoutRef<"div"> {
  onSuccess?: () => void;
  editingQuote?: IQuote | null;
}

export function QuoteForm({
  className,
  onSuccess,
  editingQuote,
  ...props
}: QuoteFormProps) {
  const { form, onSubmit, isLoading } = useQuoteForm({ 
    onSuccess, 
    editingQuote 
  });

  const buttonText = editingQuote ? "Actualizar Cita" : "Crear Cita";
  const { data: patientsData } = usePatients();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      {...field}
                      value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="hour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hora</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      max="23" 
                      step="1"
                      placeholder="Hora (0-23)"
                      {...field}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value >= 0 && value <= 23) {
                          field.onChange(value);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input placeholder="Descripción de la cita" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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