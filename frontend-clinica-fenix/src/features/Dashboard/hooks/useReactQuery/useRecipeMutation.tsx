import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/constants/queryKey";
import { toast } from "@/hooks/Toast/use-toast";
import { recipeService, IRecipe } from "@/features";
import { useRecipesStore } from "@/store/dashboard";

export const useRecipes = () => {
  return useQuery({
    queryKey: QUERY_KEYS.DOCTOR.RECIPES.ALL,
    queryFn: recipeService.getRecipes
  });
};

export const useCreateRecipeMutation = () => {
  const queryClient = useQueryClient();
  const incrementTotal = useRecipesStore((state) => state.incrementTotal);
  return useMutation({
    mutationKey: QUERY_KEYS.DOCTOR.RECIPES.CREATE,
    mutationFn: recipeService.createRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: QUERY_KEYS.DOCTOR.RECIPES.ALL 
      });
      incrementTotal();
      toast({
        title: "Éxito",
        description: "Receta creada correctamente",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Error al crear la receta: " + error,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateRecipeMutation = () => {
  const queryClient = useQueryClient();
  const decrementTotal = useRecipesStore((state) => state.decrementTotal);
  return useMutation({
    mutationKey: [QUERY_KEYS.DOCTOR.RECIPES.UPDATE],
    mutationFn: async (recipe: IRecipe) => {
      if (!recipe.id_recipe) throw new Error('ID de receta es requerido');
      return recipeService.updateRecipe(recipe);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: QUERY_KEYS.DOCTOR.RECIPES.ALL 
      });
      if (variables.id_recipe) {
        queryClient.invalidateQueries({ 
          queryKey: QUERY_KEYS.DOCTOR.RECIPES.DETAIL(variables.id_recipe.toString()) 
        });
      }
      decrementTotal();
      toast({
        title: "Éxito",
        description: "Receta actualizada correctamente",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Error al actualizar la receta: " + error,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteRecipeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.DOCTOR.RECIPES.DELETE],
    mutationFn: async (id: string) => {
      return recipeService.deleteRecipe(id);
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ 
        queryKey: QUERY_KEYS.DOCTOR.RECIPES.ALL 
      });
      queryClient.invalidateQueries({ 
        queryKey: QUERY_KEYS.DOCTOR.RECIPES.DETAIL(id) 
      });
      toast({
        title: "Éxito",
        description: "Receta eliminada correctamente",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Error al eliminar la receta: " + error,
        variant: "destructive",
      });
    },
  });
};

