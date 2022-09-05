import * as rechargeRepository from "../repositories/rechargeRepository"
import { Card } from "../repositories/cardRepository"
import { verifyCardExpiration } from "../../utils/assetsFunctions/verifyFunctions"

export async function insertRecharge(rechargeData:{cardId:number,amount:number}) {
  await  rechargeRepository.insert(rechargeData)
}

export function verifyActiveAndExpiration(cardData:Card) {
  if(!cardData.password){
    throw {code:'Bad Request', message:'Cartão Não Ativado.'}
  }
  verifyCardExpiration(cardData.expirationDate)
}