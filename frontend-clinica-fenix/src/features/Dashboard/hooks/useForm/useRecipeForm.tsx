import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IRecipe, useCreateRecipeMutation, useUpdateRecipeMutation } from "@/features";
import { useEffect } from "react";

export function useRecipeForm({ onSuccess, editingRecipe }: { onSuccess?: () => void; editingRecipe?: IRecipe | null } = {}) {
  const createMutation = useCreateRecipeMutation();
  const updateMutation = useUpdateRecipeMutation();

  const formSchema = z.object({
    id_patient: z.number().min(1, { message: "El paciente es requerido" }),
    medicine: z.string().min(1, { message: "El medicamento es requerido" }),
    dose: z.string().min(1, { message: "La dosis es requerida" }),
    frequency: z.string().min(1, { message: "La frecuencia es requerida" }),
    indications: z.string().optional(),
    doctor_signature: z.string().min(1, { message: "La firma del doctor es requerida" }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_patient: 0,
      medicine: "",
      dose: "",
      frequency: "",
      indications: "",
      doctor_signature: "",
    }
  });

  useEffect(() => {
    if (editingRecipe) {
      form.reset({
        id_patient: editingRecipe.id_patient,
        medicine: editingRecipe.medicine,
        dose: editingRecipe.dose,
        frequency: editingRecipe.frequency,
        indications: editingRecipe.indications || "",
        doctor_signature: editingRecipe.doctor_signature,
      });
    }
  }, [editingRecipe, form]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function onSubmit(values: any) {
    try {
      if (editingRecipe?.id_recipe) {
        await updateMutation.mutateAsync({ ...values, id_recipe: editingRecipe.id_recipe });
      } else {
        await createMutation.mutateAsync(values);
      }
      onSuccess?.();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return {
    form,
    onSubmit,
    isLoading: createMutation.isPending || updateMutation.isPending
  };
}