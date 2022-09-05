const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');
import bcrypt from "bcrypt"
export function encryptString(data:string|undefined):string{
  console.log(data)
  const encryptedData:string = cryptr.encrypt(data);
  return encryptedData
}

export function decryptString(encriptedData:string| undefined):string{
  const decryptedData:string = cryptr.decrypt(encriptedData);
  return `${decryptedData}`
}

export function encryptStringByHash(data:string){
  const encriptedData :string=  bcrypt.hashSync(data,10)
  return encriptedData
}

export function compareEncryptData(dataEncripted:string|any,dataToCompare:string|any):boolean{
  const isSame :boolean=  bcrypt.compareSync(dataToCompare,dataEncripted)
  return isSame
}

console.log(decryptString('5cff3aa4e15c611f935f5cf75436d861b4b0b03ede9a78dba32027ad0916e29ab1154e037924ef3503dc260e7030c1fffb64d15243faac6040ccb733ff60a32a5bfe80f7de8523fb85b2f4b20223d06a52ff32d3eb0d13ab93e423500f4cac16fcf32c'))
