import {Router} from 'express';
import * as cardController from "../controller/cardController";
import { validSchema } from '../middleware/validSchema';
import { validApiKey } from '../middleware/validApiKey';
import toogleBlockSchema from '../../utils/schemas/toggleBlockSchema';
import createCardSchema from '../../utils/schemas/createCardSchema';
const cardRoute = Router();

cardRoute.post("/card/create",validApiKey,validSchema(createCardSchema),cardController.createCard);
cardRoute.post("/card/active",cardController.activeCard);
cardRoute.post("/card/block", validSchema(toogleBlockSchema),cardController.blockCard);
cardRoute.post("/card/unblock", validSchema(toogleBlockSchema),cardController.unblockCard);

export default cardRoute