import { Router } from 'express';
import { recipesController } from '../controllers/recipe.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const controller = new recipesController();

router.get('/get/:id', authMiddleware,controller.getOne.bind(controller));
router.get('/getAll', authMiddleware, controller.getAll.bind(controller));
router.post('/create', authMiddleware,controller.create.bind(controller));
router.put('/update', authMiddleware, controller.update.bind(controller));
router.delete('/delete/:id', authMiddleware, controller.delete.bind(controller));

export { router as recipesRoutes };