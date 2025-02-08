import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IPatient, useCreatePatientMutation, useUpdatePatientMutation } from "@/features";
import { useEffect } from "react";

interface UsePatientFormProps {
  onSuccess?: () => void;
  editingPatient?: IPatient | null;
}

export function usePatientForm({ onSuccess, editingPatient }: UsePatientFormProps = {}) {
  const createPatientMutation = useCreatePatientMutation();
  const updatePatientMutation = useUpdatePatientMutation();

  const formSchema = z.object({
    name: z.string().nonempty({
      message: "El nombre es obligatorio.",
    }),
    lastname: z.string().nonempty({
      message: "El apellido es obligatorio.",
    }),
    cui: z.coerce.string().nonempty({
      message: "El CUI es obligatorio.",
    }).regex(/^\d+$/, {
      message: "El CUI debe contener solo números.",
    }),
    phone: z.string().nonempty({
      message: "El teléfono es obligatorio.",
    }),
    email: z.string().email({
      message: "Ingrese un email válido.",
    }),
    age: z.coerce.number().min(0, {
      message: "La edad debe ser mayor a 0.",
    }),
    gender: z.string().nonempty({
      message: "El género es obligatorio.",
    }),
    income_at: z.date({
      required_error: "La fecha de ingreso es obligatoria.",
    }),
  });

  type PatientFormValues = z.infer<typeof formSchema>;

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastname: "",
      cui: "",
      phone: "",
      email: "",
      age: 0,
      gender: "",
      income_at: new Date(),
    },
  });

  useEffect(() => {
    if (editingPatient) {
      form.reset({
        name: editingPatient.name,
        lastname: editingPatient.lastname,
        cui: String(editingPatient.cui),
        phone: editingPatient.phone,
        email: editingPatient.email,
        age: Number(editingPatient.age),
        gender: editingPatient.gender,
        income_at: new Date(editingPatient.income_at),
      });
    }
  }, [editingPatient, form]);

  async function onSubmit(values: PatientFormValues) {
    try {
      const submitValues = {
        ...values,
        cui: String(values.cui), // Asegurar que CUI sea string al enviar
      };

      if (editingPatient?.id_patient) {
        await updatePatientMutation.mutateAsync({
          ...submitValues,
          id_patient: editingPatient.id_patient,
        });
      } else {
        await createPatientMutation.mutateAsync(submitValues);
      }
      
      onSuccess?.();
      
      if (!editingPatient) {
        form.reset();
      }
    } catch (error) {
      console.error('Error en el formulario:', error);
    }
  }

  return {
    form,
    onSubmit,
    isLoading: createPatientMutation.isPending || updatePatientMutation.isPending,
    isEditing: !!editingPatient,
  };
}