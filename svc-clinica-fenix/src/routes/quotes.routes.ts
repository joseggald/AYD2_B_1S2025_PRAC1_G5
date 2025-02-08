import { Router } from 'express';
import { quotesController } from '../controllers/quotes.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const controller = new quotesController();

router.get('/get/:id',controller.getOne.bind(controller));
router.get('/getAll', controller.getAll.bind(controller));
router.post('/create',controller.create.bind(controller));
router.put('/update', controller.update.bind(controller));
router.delete('/delete/:id', controller.delete.bind(controller));

export { router as quotesRoutes };