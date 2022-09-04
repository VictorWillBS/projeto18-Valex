import { Router } from "express";
import { validSchema } from "../middleware/validSchema";
import rechargeSchema from "../../utils/schemas/rechargeSchema";
import { validApiKey } from "../middleware/validApiKey";
import * as rechargeController from "../controller/rechargeController"
const rechargeRoute= Router();

rechargeRoute.use("/recharge",validSchema(rechargeSchema), validApiKey,rechargeController.rechargeCard)

export default rechargeRoute