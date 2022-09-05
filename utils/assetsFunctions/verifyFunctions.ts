import * as cardRepository from "../../src/repositories/cardRepository"
import * as cryptData from "./cryptData"

export function verifyPasswordFormat(password:string){
  const regex = /^[0-9]{4}$/
  if(!regex.test(password)|| typeof(password)!= 'string'){
    throw {code:'Unprocessable Entity', message:'Formato da Senha Incorreto.'}
  }
}
export function cardVerifications(card:cardRepository.Card){
  verifyCardExpiration(card.expirationDate)
  const isActive = verifyCardActivation(card.password)
  if(isActive){
    throw {code:'Bad Request', message:'Cartão Já Ativado.'}
  }
}
export function verifyCvv(cvv:string){
  console.log('entrei no cvv')
  if(!cvv) throw{code:'Bad Request', message:'CVC não enviado.'}
}
export function verifyCardActivation(password: string|undefined){
  if(password) {
    return true
  }
  return false
}
export function verifyCardExpiration(expirationDate:string){
  const expirationSplited: string[] = expirationDate.split("/")
  const expirationString: string = `20${expirationSplited[1]}-${expirationSplited[0]}-30`
  const newExpirationDate:Date = new Date(expirationString)
  const expiration : number = Date.parse(`${newExpirationDate}`);
  const today : number = Date.now()
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
export function verifyPassword(cardPassword:string|undefined,insertedPassword:string|undefined){
  const isSame:boolean = cryptData.compareEncryptData(cardPassword,insertedPassword)
  if(!isSame){
    throw{code:'Unauthorized', message:"Senha Inválida."}
  }
}

export function verifyIsBlocked(cardIsBlocked:boolean){
  if(cardIsBlocked){
    throw {code:'Bad Request', message: 'Cartão Bloqueado'}
  }
  return false
}