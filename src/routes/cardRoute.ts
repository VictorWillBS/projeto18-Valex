import {Router} from 'express';
import * as cardController from "../controller/cardController";
import { validSchema } from '../middleware/validSchema';
import { validApiKey } from '../middleware/validApiKey';
import createCardSchema from '../../utils/schemas/createCardSchema';
const cardRoute = Router();

cardRoute.post("/card/create",validApiKey,validSchema(createCardSchema),cardController.createCard);
cardRoute.post("/card/active",cardController.activeCard)
export default cardRoute