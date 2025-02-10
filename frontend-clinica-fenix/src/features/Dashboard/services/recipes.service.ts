import { serviceApi } from "@/services/auth";


export interface IRecipe {
  id_recipe?: number;
  id_patient: number;
  medicine: string;
  dose: string;
  frequency: string;
  indications: string;
  doctor_signature: string;
  // Additional fields from join
  name?: string;
  lastname?: string;
  cui?: string;
}

export interface IRecipeResponse {
  message: string;
  success: boolean;
  data: {
    recipe: IRecipe;
  };
}

export interface IRecipesResponse {
  message: string;
  success: boolean;
  data: {
    recipes: IRecipe[];
  };
}

export const recipeService = {
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