import * as cryptData from "../../utils/assetsFunctions/cryptData";
import * as cardRepository from "../repositories/cardRepository";
import * as paymentRepository from "../repositories/paymentRepository"
import * as rechargesRepository from "../repositories/rechargeRepository"
import * as fakeCreditCard from "../../utils/fakerFunctions/fakerCreditCard";
import * as verifyFunctions from "../../utils/assetsFunctions/verifyFunctions";
import createDateExpiration from "../../utils/assetsFunctions/createDateExpiration";
import formatCreditCardName from "../../utils/assetsFunctions/formatCreditCardName";
import { number } from "joi";


export async function validEmployeeAbletoCard(employeeCardData:{employeeId:number,type:string}) {
  const {employeeId,type}=employeeCardData
  const card = await cardRepository.findByTypeAndEmployeeId (type,employeeId)
  if(card){
    throw{code:'Conflict', message: 'Tipo de Cartão já existente.'}
  }
}

export async function createCardData(cardholderName:string,employeeCardData:{employeeId:number,type:string}) {
  const employeeName : string = formatCreditCardName(cardholderName);
  const creditCardNumber : string  = fakeCreditCard.createCreditCardNumber();
  const creditCardCVV : string = fakeCreditCard.createCreditCardCVV();
  const expirationDate: string = createDateExpiration();

  const cardData = {
    employeeId:employeeCardData.employeeId,
    number:creditCardNumber,
    cardholderName:employeeName,
    securityCode:creditCardCVV,
    expirationDate,
    password: null,
    isVirtual:false,
    originalCardId: null,
    isBlocked:true,
    type:employeeCardData.type,
  }  ;
  return cardData
}  

export async function createCard(cardData: cardRepository.Card|any){
  const encryptedCVV = cryptData.encryptString(cardData.securityCode);
  await cardRepository.insert({...cardData,securityCode:encryptedCVV});
}   

export async function getCardByCvc(cvv:string) {
  verifyFunctions.verifyCvv(cvv);

  const allCards :cardRepository.Card|any= await cardRepository.find();
  
  const cardFounded : cardRepository.Card[] = allCards.filter((card:cardRepository.Card)=>{
    const cvvDecrypted :string = cryptData.decryptString(card.securityCode);
    const matchCvv = verifyFunctions.compareData(cvvDecrypted,cvv);
    if(matchCvv) return card
  })
  
  if(!cardFounded.length){
    throw {code:'Not Found',message:'Cartão não encontrado.'};
  }
  verifyFunctions.cardVerifications(cardFounded[0])

  return cardFounded
}

export async function insertPassword(id:number,password:string){
 
  verifyFunctions.verifyPasswordFormat(password);
  const passwordEncrypted: string= cryptData.encryptString(password) ;
  await cardRepository.update(id,{password:passwordEncrypted});
  await cardRepository.update(id,{isBlocked:false})

}

export async function toBlockValidations(cardData: cardRepository.Card,password:string ,toBlock:boolean) {  
  if(cardData.isBlocked===toBlock){
    const state = toBlock?'bloqueado':'desbloqueado'
    throw{code:'Bad Request', message:`Cartão já ${state}.`}
  }
}

export async function getCardById(id:number){
  const card:cardRepository.Card = await cardRepository.findById(id)
  if(!card){
    throw{code:'Not Found', message:'Cartão Inexistente.'}
  }
  return card
}

export async function updateBlockCard(cardId:number,toBlock:boolean) {
  await cardRepository.update(cardId,{isBlocked:toBlock})
}

export async function getBalance(payments : paymentRepository.SumPayment[],recharges : rechargesRepository.SumRecharge[]) {

  const totalPayments :number=  calcTotalAmount(payments)
  const totalRecharges:number = calcTotalAmount(recharges)
  const balance :number = totalRecharges-totalPayments
  return balance
}

function calcTotalAmount( list : any):number{
  let totalAmount:number = 0
  list.map((element:any)=> totalAmount+=element.amount)
  return totalAmount
}

export async function getBalanceAndTransanctions(id:number) {
  const payments : paymentRepository.SumPayment[] = await paymentRepository.findByCardId(id)
  const recharges : rechargesRepository.SumRecharge[]= await rechargesRepository.findByCardId(id)
  const balance = await getBalance(payments,recharges)
  const result = {
    balance,
    transactions:payments,
    recharges
  }
  return result
}