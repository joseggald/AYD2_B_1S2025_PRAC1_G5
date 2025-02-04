import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const controller = new UserController();

// Rutas públicas
router.post('/register', controller.create.bind(controller));
router.post('/login', controller.login.bind(controller));

// Ruta protegida de ejemplo
router.get('/protected', authMiddleware, controller.protectedRoute.bind(controller));

export { router as userRoutes };