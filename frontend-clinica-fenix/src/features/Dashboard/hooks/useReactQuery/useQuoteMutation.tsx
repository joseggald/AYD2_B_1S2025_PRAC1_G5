import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/constants/queryKey";
import { toast } from "@/hooks/Toast/use-toast";
import { quoteService, IQuote } from "@/features";
import { useQuotesStore } from "@/store/dashboard";


export const useQuotes = () => {
  return useQuery({
    queryKey: QUERY_KEYS.DOCTOR.QUOTES.ALL,
    queryFn: quoteService.getQuotes
  });
};

export const useCreateQuoteMutation = () => {
  const queryClient = useQueryClient();
  const incrementTotal = useQuotesStore((state) => state.incrementTotal);
  return useMutation({
    mutationKey: QUERY_KEYS.DOCTOR.QUOTES.CREATE,
    mutationFn: quoteService.createQuote,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: QUERY_KEYS.DOCTOR.QUOTES.ALL 
      });
      incrementTotal();
      toast({
        title: "Éxito",
        description: "Cita creada correctamente",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Error al crear la cita: " + error,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateQuoteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.DOCTOR.QUOTES.UPDATE],
    mutationFn: async (quote: IQuote) => {
      if (!quote.id_citas) throw new Error('ID de cita es requerido');
      return quoteService.updateQuote(quote);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: QUERY_KEYS.DOCTOR.QUOTES.ALL 
      });
      toast({
        title: "Éxito",
        description: "Cita actualizada correctamente",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Error al actualizar la cita: " + error,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteQuoteMutation = () => {
  const queryClient = useQueryClient();
  const decrementTotal = useQuotesStore((state) => state.decrementTotal);
  return useMutation({
    mutationKey: [QUERY_KEYS.DOCTOR.QUOTES.DELETE],
    mutationFn: quoteService.deleteQuote,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: QUERY_KEYS.DOCTOR.QUOTES.ALL 
      });
      decrementTotal();
      toast({
        title: "Éxito",
        description: "Cita eliminada correctamente",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Error al eliminar la cita: " + error,
        variant: "destructive",
      });
    },
  });
};
