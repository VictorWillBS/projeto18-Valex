import { Request, Response } from "express";
import { Card } from "../repositories/cardRepository";
import * as paymentService from "../services/paymentService";
import * as cardServices from "../services/cardServices";
export async function doPayment(req: Request, res: Response) {
  const body : {cardId:number, amount:number,password:string,businessId:number,businessType:string} = req.body
  const card :Card = await cardServices.getCardById(body.cardId)
  await paymentService.verifySecuritData(card,body.password)
  await paymentService.verifyTransation(card,body.businessId,body.businessType)
  await paymentService.verifyBalance(body)
  await paymentService.insertPayment(body.cardId,body.businessId,body.amount)
  res.status(200).send('Pagamento Concluído Com Sucesso.')
}