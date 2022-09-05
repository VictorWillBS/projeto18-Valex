import { Router } from "express";
import { validSchema } from "../middleware/validSchema";
import paymentSchema from "../../utils/schemas/paymentSchema";
import * as paymentController from "../controller/paymentController";
const paymentRoute = Router();

paymentRoute.post("/payment",validSchema(paymentSchema),paymentController.doPayment)

export default paymentRoute