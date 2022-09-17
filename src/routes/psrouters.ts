import express from 'express';
import controller from '../controllers/pscontroller';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

router.post('/create', ValidateJoi(Schemas.petstore.create), controller.createData);
router.get('/get/:petId', controller.readData);
router.get('/get', controller.readAll);
router.patch('/update/:petId', ValidateJoi(Schemas.petstore.update), controller.updateData);
router.delete('/delete/:petId', controller.deleteData);

export = router;
