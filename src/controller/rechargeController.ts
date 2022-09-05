import { Request,Response } from "express";
import { Card } from "../repositories/cardRepository";
import * as cardServices from "../services/cardServices"
import * as companyService from "../services/companyService"
import * as rechargeService from "../services/rechargeService"
export async function rechargeCard(req:Request,res:Response){
  const {apikey} = req.headers
  await companyService.validCompanyApiKey(apikey)

  const body:{cardId:number, amount:number}= req.body
  const card:Card = await cardServices.getCardById(body.cardId)
  
  rechargeService.verifyActiveAndExpiration(card)
  await rechargeService.insertRecharge(body)
  res.status(200).send('Recarga concluída')
}