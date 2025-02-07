import { Router } from 'express';
import { PatientController } from '../controllers/patient.controller';

const router = Router();
const controller = new PatientController();

router.get('/get/:id', controller.getOne.bind(controller));
router.get('/getAll', controller.getAll.bind(controller));
router.post('/create', controller.create.bind(controller));
router.put('/update', controller.update.bind(controller));
router.delete('/delete/:id', controller.delete.bind(controller));
router.get('/getExpedients/:parameter', controller.getExpedients.bind(controller));

export { router as patientRoutes };