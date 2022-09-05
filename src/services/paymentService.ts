import { Card } from "../repositories/cardRepository";
import * as paymentRepository from "../repositories/paymentRepository";
import * as rechargeRepository from "../repositories/rechargeRepository";
import * as businessRepository from "../repositories/businessRepository";
import * as verifyFunctions from "../../utils/assetsFunctions/verifyFunctions";
export async function verifyBalance(paymentData:{cardId:number, amount:number}){
  const totalPayment : paymentRepository.SumPayment = await paymentRepository.getSumPayments(paymentData.cardId)
  const totalRecharges:rechargeRepository.SumRecharge = await rechargeRepository.getSumRecharges(paymentData.cardId)

  if(!totalRecharges){
    throw {code:'Bad Request', message:'Saldo Insuficiente.'}
  }

  const balance = totalRecharges.amount-totalPayment.amount
  
  if(balance<=0||balance<paymentData.amount){
    throw {code:'Bad Request', message:'Saldo Insuficiente.'}
  }
}
export async function verifyTransation(cardData:Card,businessId:number,businessType:string){
  const business : businessRepository.Business= await businessRepository.findById(businessId) 
  verifyBusinessTransition(business,cardData,businessType)

}
export async function verifySecuritData(cardData:Card,password:string) {
  verifyFunctions.verifyCardExpiration(cardData.expirationDate)
  const isActive = verifyFunctions.verifyCardActivation(cardData.password)
  if(!isActive){
    throw {code:'Bad Request', message: 'Cartão nNão Ativado'}
  }
  verifyFunctions.verifyIsBlocked(cardData.isBlocked)
  verifyFunctions.verifyPassword(cardData.password,password)
}
export async function insertPayment( cardId:number, businessId:number, amount:number) {
  const paymentTransition = {cardId,businessId,amount}
  await paymentRepository.insert(paymentTransition)
}
export function verifyBusinessTransition(business : businessRepository.Business,cardData:Card,businessType:string){
  if(!business){
    
    throw {code:'Not Found', message:'Estabelecimento Não Encontrado'}
  }else 
  if(business.type !=businessType){
    throw {code:'Conflict', message:'Tipo de Estabelicimento Conflitante Com o Enviado na Requisão.'}
  }else 
  if(business.type!=cardData.type){
    throw {code:'Unauthorized', message:'Tipo de Cartão Não Aceito Neste Estabelecimento'}
  }
}