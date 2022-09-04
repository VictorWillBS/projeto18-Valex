import * as cardRepository from "../../src/repositories/cardRepository"
import * as cryptData from "./cryptData"

export function verifyPasswordFormat(password:string){
  const regex = /^[0-9]{4}$/
  if(!regex.test(password)){
    throw {code:'Unprocessable Entity', message:'Formato da Senha Incorreto.'}
  }
}
export function cardVerifications(card:cardRepository.Card){
  verifyCardExpiration(card.expirationDate)
  verifyCardActivation(card.password)
}
export function verifyCvv(cvv:string){
  console.log('entrei no cvv')
  if(!cvv) throw{code:'Bad Request', message:'CVC não enviado.'}
}
export function verifyCardActivation(password: string|undefined){
  if(password) throw{code:'Bad Request', message:'Cartão já ativado.'}
}
export function verifyCardExpiration(expirationDate:string){
  
  const expirationSplited: string[] = expirationDate.split("/")
  const expirationString: string = `20${expirationSplited[1]}-${expirationSplited[0]}-30`
  const newExpirationDate:Date = new Date(expirationString)
  const expiration : number = Date.parse(`${newExpirationDate}`);
  const today : number = Date.now()
  console.log(expirationString)
  console.log(today)
  if(today>expiration){
    throw{code:'Bad Request', message:'Cartão Expirado.'}
  } 
  
}
export function compareData(data1:any,data2:any,erroCode?:string,message?:string){
  if(data1===data2){
    return true
  }
  if(erroCode){
    throw { code: erroCode, message:message?message:undefined}
  }
}
export function verifyPassword(cardPassword:string,insertedPassword:string|undefined){
  const decryptedPassword = cryptData.decryptString(cardPassword)
  compareData(decryptedPassword,insertedPassword,'Unauthorized','Senha inválida');
  
}