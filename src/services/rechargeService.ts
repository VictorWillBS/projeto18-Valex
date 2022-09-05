import * as rechargeRepository from "../repositories/rechargeRepository"
import { Card } from "../repositories/cardRepository"
import * as verifyFunctions from "../../utils/assetsFunctions/verifyFunctions"

export async function insertRecharge(rechargeData:{cardId:number,amount:number}) {
  await  rechargeRepository.insert(rechargeData)
}

export function verifyActiveAndExpiration(cardData:Card) {
  const isActive = verifyFunctions.verifyCardActivation(cardData.password)
  if(!isActive){
    throw {code:'Bad Request', message:'Cartão Não Ativado.'}
  }
  verifyFunctions.verifyCardExpiration(cardData.expirationDate)
}