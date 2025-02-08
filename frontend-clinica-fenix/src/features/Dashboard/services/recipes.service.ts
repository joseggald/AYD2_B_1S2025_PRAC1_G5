import { serviceApi } from "@/services/auth";

export interface IRecipe {
  id_recipe?: number;
  id_record: number;
  medicine: string;
  dose: number;
  id_unit_dose: number;
  frecuency: number;
  id_unit_frecuency: number;
  indications: string;
  doctor_signature: string;
}

export interface IRecipeResponse {
  message: string;
  success: boolean;
  data: {
    recipes: IRecipe;
  };
}

export interface IRecipesResponse {
  message: string;
  success: boolean;
  data: {
    recipes: IRecipe[];
  };
}

export const recipesService = {
  getRecipes: async (): Promise<IRecipesResponse> => {
    const { data } = await serviceApi.get<IRecipesResponse>('/recipes/getAll');
    return data;
  },

  getRecipeById: async (id: string): Promise<IRecipeResponse> => {
    const { data } = await serviceApi.get<IRecipeResponse>(`/recipes/get/${id}`);
    return data;
  },

  createRecipe: async (recipe: Omit<IRecipe, 'id_recipe'>): Promise<IRecipeResponse> => {
    const { data } = await serviceApi.post<IRecipeResponse>('/recipes/create', recipe);
    return data;
  },

  updateRecipe: async (recipe: IRecipe): Promise<IRecipeResponse> => {
    const { data } = await serviceApi.put<IRecipeResponse>('/recipes/update', recipe);
    return data;
  },

  deleteRecipe: async (id: string): Promise<IRecipeResponse> => {
    const { data } = await serviceApi.delete<IRecipeResponse>(`/recipes/delete/${id}`);
    return data;
  }
};

