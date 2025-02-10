import { Request, Response } from "express";
import { ResponseHandler } from "../utils/responses";
import { RecipesService } from "../services/recipe.service";
import { createRecipeSchema, updateRecipeSchema } from "./validators/recipe.validator";

const { sendSuccess, sendError } = ResponseHandler;

export class recipesController {
  private recipeService: RecipesService;

  constructor() {
    this.recipeService = new RecipesService();
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const recipes = await this.recipeService.getRecipeById(id);
      sendSuccess(res, "Receta encontrada", { recipes });
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const recipes = await this.recipeService.getRecipes();
      sendSuccess(res, "Listado de recetas", { recipes });
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = createRecipeSchema.validate(req.body);

      if (error) {
        sendError(res, `Validation error: ${error.message}`, 400);
        return;
      }

      const recipes = await this.recipeService.createRecipe(value);

      sendSuccess(res, "Receta creada correctamente.", { recipes });
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = updateRecipeSchema.validate(req.body);

      if (error) {
        sendError(res, `Validation error: ${error.message}`, 400);
        return;
      }

      const patient = await this.recipeService.updateRecipe(value);

      sendSuccess(res, "Receta Actualizada correctamente.", { patient });
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.recipeService.deleteRecipe(id);
      sendSuccess(res, "Receta eliminada correctamente.");
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }
}
