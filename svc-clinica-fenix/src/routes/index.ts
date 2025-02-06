import { Application, Router } from 'express';
import { healthRoutes } from './health.routes';
import { userRoutes } from './user.routes';
import { patientRoutes } from './patient.routes';
import { ResponseHandler } from '../utils/responses';
const { sendError } = ResponseHandler;

export const initializeRoutes = (app: Application): void => {
  const apiRouter = Router();
  
  // Rutas de API
  apiRouter.use('/', healthRoutes);
  apiRouter.use('/users', userRoutes);
  apiRouter.use('/patients', patientRoutes);
  // Agrega aquí otras rutas cuando las crees
  
  // Prefijo global para todas las rutas de API
  app.use('', apiRouter);
  
  // Manejador de rutas no encontradas
  app.use('*', (req, res) => {
    sendError(res, `Route ${req.originalUrl} not found`, 404);
  });
};