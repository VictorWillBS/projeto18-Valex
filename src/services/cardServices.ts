import * as cryptCVV from "../../utils/assetsFunctions/cryptCVV";
import * as cardRepository from "../repositories/cardRepository";
import * as fakeCreditCard from "../../utils/fakerFunctions/fakerCreditCard";
import createDateExpiration from "../../utils/assetsFunctions/createDateExpiration";
import formatCreditCardName from "../../utils/assetsFunctions/formatCreditCardName";
import bcrypt from 'bcrypt'
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
  }  
  return cardData
}  

export async function createCard(cardData: {
  employeeId:number,
  number:string,
  cardholderName:string,
  securityCode:string,
  expirationDate:string,
  password?: string,
  isVirtual:boolean,
  originalCardId?: number,
  isBlocked:boolean,
  type:string,
}|any){
  const encryptedCVV = cryptCVV.encryptCVV(cardData.securityCode)
  await cardRepository.insert({...cardData,securityCode:encryptedCVV});
}   

export async function getCardByCvc(cvv:string) {
  console.log('entrei no getCard Service')
  verifyCvv(cvv)

  const allCards :cardRepository.Card|any= await cardRepository.find();
  
  const cardFounded : cardRepository.Card[] = allCards.filter((card:cardRepository.Card)=>{
    const cvvDecrypted :string = cryptCVV.decryptCVV(card.securityCode);
    if(cvvDecrypted===cvv) return card
  })
  
  if(!cardFounded.length){
    throw {code:'Not Found',message:'Cartão não encontrado.'};
  }
  console.log(cardFounded)
  cardVerifications(cardFounded[0])

  return cardFounded
}

export async function insertPassword(id:number,password:string){
  console.log('entrei no inser Service')
  verifyPassword(password)
  const passwordEncrypted: string= bcrypt.hashSync(password,10) 
  await cardRepository.update(id,{password:passwordEncrypted})

}


function verifyPassword(password:string){
  const regex = /[0-9]{4}/
  if(!regex.test(password)){
    throw {code:'Unprocessable Entity', message:'Formato da Senha Incorreto.'}
  }
}
function cardVerifications(card:cardRepository.Card){
  verifyCardExpiration(card.expirationDate)
  verifyCardActivation(card.password)
}

function verifyCvv(cvv:string){
  console.log('entrei no cvv')
  if(!cvv) throw{code:'Bad Request', message:'CVC não enviado.'}
}

function verifyCardActivation(password: string|undefined){
  if(password) throw{code:'Bad Request', message:'Cartão já ativado.'}
}
function verifyCardExpiration(expirationDate:string){
  console.log('entrei no expire')
  
  const expirationSplited: string[] = expirationDate.split("/")
  const expirationString: string = `30/${expirationSplited[0]}/20${expirationSplited[1]}`
  const expiration : number = Date.parse(expirationString);
  const today : number = Date.now()
  if(today>expiration){
    throw{code:'Bad Request', message:'Cartão Expirado.'}
  } 
  
}

