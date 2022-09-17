"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const pscontroller_1 = __importDefault(require("../controllers/pscontroller"));
const Joi_1 = require("../middleware/Joi");
const router = express_1.default.Router();
router.post('/create', (0, Joi_1.ValidateJoi)(Joi_1.Schemas.petstore.create), pscontroller_1.default.createData);
router.get('/get/:petId', pscontroller_1.default.readData);
router.get('/get', pscontroller_1.default.readAll);
router.patch('/update/:petId', (0, Joi_1.ValidateJoi)(Joi_1.Schemas.petstore.update), pscontroller_1.default.updateData);
router.delete('/delete/:petId', pscontroller_1.default.deleteData);
module.exports = router;
