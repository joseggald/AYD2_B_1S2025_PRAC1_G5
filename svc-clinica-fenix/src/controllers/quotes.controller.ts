import { Request, Response } from "express";
import { ResponseHandler } from "../utils/responses";
import { QuotesService } from "../services/quotes.service";
import { createQuoteSchema, updateQuoteSchema } from "./validators/quote.validator";

const { sendSuccess, sendError } = ResponseHandler;

export class quotesController {
  private quotesService: QuotesService;

  constructor() {
    this.quotesService = new QuotesService();
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const quotes = await this.quotesService.getQuoteById(id);
      sendSuccess(res, "Cita encontrada", { quotes });
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const quotes = await this.quotesService.getQuotes();
      sendSuccess(res, "Listado de citas", { quotes });
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = createQuoteSchema.validate(req.body);

      if (error) {
        sendError(res, `Validation error: ${error.message}`, 400);
        return;
      }

      const quotes = await this.quotesService.createQuote(value);

      sendSuccess(res, "Cita creada correctamente.", { quotes });
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = updateQuoteSchema.validate(req.body);

      if (error) {
        sendError(res, `Validation error: ${error.message}`, 400);
        return;
      }

      const patient = await this.quotesService.updateQuote(value);

      sendSuccess(res, "Cita Actualizada correctamente.", { patient });
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.quotesService.deleteQuote(id);
      sendSuccess(res, "Cita eliminada correctamente.");
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }
}
