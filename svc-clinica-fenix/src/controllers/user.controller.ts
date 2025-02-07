import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { ResponseHandler } from '../utils/responses';
import { loginSchema, createUserSchema } from './validators/user.validator';
import { generateAuthToken } from '../utils/jwt';

const { sendSuccess, sendError } = ResponseHandler;

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = createUserSchema.validate(req.body);
      
      if (error) {
        sendError(res, `Validation error: ${error.message}`, 400);
        return;
      }

      const user = await this.userService.createUser(value);

      sendSuccess(res, "Usuario Creado correctamente.",{ user });
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = loginSchema.validate(req.body);
      
      if (error) {
        sendError(res, `Validation error: ${error.message}`, 400);
        return;
      }

      const { correo_electronico, contrasena } = value;
      const user = await this.userService.validateUser(correo_electronico, contrasena);
      
      if (!user) {
        sendError(res, 'Invalid credentials', 401);
        return;
      }

      const token = generateAuthToken(user);
      sendSuccess(res, "¡Login exitoso!", { user, token });
    } catch (error: any) {
      sendError(res, error.message, 401);
    }
  }

  // Ruta protegida de ejemplo
  public async protectedRoute(req: Request, res: Response): Promise<void> {
    sendSuccess(res,  
      'Protected route accessed successfully',{
      user: req.user
    });
  }
}