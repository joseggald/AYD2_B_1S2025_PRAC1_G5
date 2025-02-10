import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/constants/queryKey";
import { toast } from "@/hooks/Toast/use-toast";
import { patientService, IPatient } from "@/features";
import { usePatientsStore } from "@/store/dashboard"; 

export const usePatients = () => {
  return useQuery({
    queryKey: QUERY_KEYS.DOCTOR.PATIENTS.ALL,
    queryFn: patientService.getPatients
  });
};

export const useCreatePatientMutation = () => {
  const queryClient = useQueryClient();
  const incrementTotal = usePatientsStore((state) => state.incrementTotal);
  return useMutation({
    mutationKey: QUERY_KEYS.DOCTOR.PATIENTS.CREATE,
    mutationFn: patientService.createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: QUERY_KEYS.DOCTOR.PATIENTS.ALL 
      });
      incrementTotal();
      toast({
        title: "Éxito",
        description: "Paciente creado correctamente",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Error al crear el paciente: " + error,
        variant: "destructive",
      });
    },
  });
};

export const useUpdatePatientMutation = () => {
  const queryClient = useQueryClient();
  const decrementTotal = usePatientsStore((state) => state.decrementTotal);
  return useMutation({
    mutationKey: [QUERY_KEYS.DOCTOR.PATIENTS.UPDATE],
    mutationFn: async (patient: IPatient) => {
      if (!patient.id_patient) throw new Error('ID de paciente es requerido');
      return patientService.updatePatient(patient);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: QUERY_KEYS.DOCTOR.PATIENTS.ALL 
      });
      if (variables.id_patient) {
        queryClient.invalidateQueries({ 
          queryKey: QUERY_KEYS.DOCTOR.PATIENTS.DETAIL(variables.id_patient.toString()) 
        });
      }
      decrementTotal();
      toast({
        title: "Éxito",
        description: "Paciente actualizado correctamente",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Error al actualizar el paciente: " + error,
        variant: "destructive",
      });
    },
  });
};

export const useDeletePatientMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.DOCTOR.PATIENTS.DELETE],
    mutationFn: async (id: string) => {
      return patientService.deletePatient(id);
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ 
        queryKey: QUERY_KEYS.DOCTOR.PATIENTS.ALL 
      });
      queryClient.invalidateQueries({ 
        queryKey: QUERY_KEYS.DOCTOR.PATIENTS.DETAIL(id) 
      });
      toast({
        title: "Éxito",
        description: "Paciente eliminado correctamente",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Error al eliminar el paciente: " + error,
        variant: "destructive",
      });
    },
  });
};

export const useExpedient = (cui: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.DOCTOR.PATIENTS.EXPEDIENTS(cui),
    queryFn: () => patientService.getExpedients(cui),
    enabled: Boolean(cui), // Solo se ejecuta si hay un CUI
  });
};