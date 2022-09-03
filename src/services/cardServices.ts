import * as cryptData from "../../utils/assetsFunctions/cryptData";
import * as cardRepository from "../repositories/cardRepository";
import * as fakeCreditCard from "../../utils/fakerFunctions/fakerCreditCard";
import * as verifyFunctions from "../../utils/assetsFunctions/verifyFunctions";
import createDateExpiration from "../../utils/assetsFunctions/createDateExpiration";
import formatCreditCardName from "../../utils/assetsFunctions/formatCreditCardName";
import { number } from "joi";


export async function validEmployeeAbletoCard(employeeCardData:{employeeId:number,type:string}) {
  const {employeeId,type}=employeeCardData
  const card = await cardRepository.findByTypeAndEmployeeId (type,employeeId)
  if(card){
    throw{code:'Conflited', message: 'Tipo de Cartão já existente.'}
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
    isBlocked:false,
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
  console.log(cardFounded)
  verifyFunctions.cardVerifications(cardFounded[0])

  return cardFounded
}

export async function insertPassword(id:number,password:string){
 
  verifyFunctions.verifyPasswordFormat(password);
  const passwordEncrypted: string= cryptData.encryptString(password) ;
  await cardRepository.update(id,{password:passwordEncrypted});

}

export async function blockValidations(cardData: cardRepository.Card,password:string ,toBlock:boolean) {
  console.log('entrei na valid')
  if(cardData.password){
    verifyFunctions.verifyPassword(cardData.password,password)
  }
  verifyFunctions.verifyCardExpiration(cardData.expirationDate)
  if(cardData.isBlocked===toBlock){
    const state = toBlock?'bloqueado':'desbloqueado'
    throw{code:'Bad Request', message:`Cartão já ${state}.`}
  }
}


export async function getCardById(id:number){
  console.log('busquei o cartao')
  const card:cardRepository.Card = await cardRepository.findById(id)
  if(!card){
    throw{code:'Not Found', message:'Cartão Inexistente.'}
  }
  return card
}

export async function updateBlockCard(cardId:number,toBlock:boolean) {
  console.log('atualizei o banco')
  await cardRepository.update(cardId,{isBlocked:toBlock})
}