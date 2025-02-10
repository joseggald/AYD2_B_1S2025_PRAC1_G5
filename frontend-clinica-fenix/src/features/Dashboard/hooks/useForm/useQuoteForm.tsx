import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IQuote, useCreateQuoteMutation, useUpdateQuoteMutation } from "@/features";
import { useEffect } from "react";

export function useQuoteForm({ onSuccess, editingQuote }: { onSuccess?: () => void; editingQuote?: IQuote | null } = {}) {
  const createMutation = useCreateQuoteMutation();
  const updateMutation = useUpdateQuoteMutation();

  const formSchema = z.object({
    date: z.date(),
    hour: z.number().int().min(0).max(23, {
      message: "La hora debe estar entre 0 y 23"
    }),
    description: z.string().min(3),
    id_patient: z.number()
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      hour: 9,
      description: "",
      id_patient: 0
    }
  });

  useEffect(() => {
    if (editingQuote) {
      form.reset({
        date: new Date(editingQuote.date),
        hour: editingQuote.hour,
        description: editingQuote.description,
        id_patient: editingQuote.id_patient
      });
    }
  }, [editingQuote, form]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function onSubmit(values: any) {
    try {
      if (editingQuote?.id_citas) {
        await updateMutation.mutateAsync({ ...values, id_citas: editingQuote.id_citas });
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