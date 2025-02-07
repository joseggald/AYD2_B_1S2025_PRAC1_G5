import { Request, Response } from "express";
import { ResponseHandler } from "../utils/responses";
import { PatientService } from "../services/patient.service";
import { createPatientSchema, updatePatientSchema } from "./validators/patient.validator";

const { sendSuccess, sendError } = ResponseHandler;

export class PatientController {
  private patientService: PatientService;

  constructor() {
    this.patientService = new PatientService();
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const patient = await this.patientService.getPatientById(id);
      sendSuccess(res, "Paciente encontrado", { patient });
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const patients = await this.patientService.getPatients();
      sendSuccess(res, "Listado de pacientes", { patients });
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = createPatientSchema.validate(req.body);

      if (error) {
        sendError(res, `Validation error: ${error.message}`, 400);
        return;
      }

      const patient = await this.patientService.createPatient(value);

      sendSuccess(res, "Paciente Creado correctamente.", { patient });
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = updatePatientSchema.validate(req.body);

      if (error) {
        sendError(res, `Validation error: ${error.message}`, 400);
        return;
      }

      const patient = await this.patientService.updatePatient(value);

      sendSuccess(res, "Paciente Actualizado correctamente.", { patient });
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.patientService.deletePatient(id);
      sendSuccess(res, "Paciente eliminado correctamente.");
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  public async getExpedients(req: Request, res: Response): Promise<void> {
    try {
      const { parameter } = req.params;
      const expedients = await this.patientService.getExpedients(parameter);
      sendSuccess(res, "Expedientes encontrados", { expedients });
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }
}
