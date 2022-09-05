import {Router} from 'express';
import * as cardController from "../controller/cardController";
import { validSchema } from '../middleware/validSchema';
import { validApiKey } from '../middleware/validApiKey';
import toogleBlockSchema from '../../utils/schemas/toggleBlockSchema';
import createCardSchema from '../../utils/schemas/createCardSchema';
import activeCardSchema from '../../utils/schemas/activedCardSchema';
const cardRoute = Router();

cardRoute.post("/card/create",validApiKey,validSchema(createCardSchema),cardController.createCard);
cardRoute.post("/card/active",validSchema(activeCardSchema),cardController.activeCard);
cardRoute.get("/card/balance/:cardId",cardController.getBalanceAndTransanctions);
cardRoute.post("/card/block", validSchema(toogleBlockSchema),cardController.blockCard);
cardRoute.post("/card/unblock", validSchema(toogleBlockSchema),cardController.unblockCard);

export default cardRoute