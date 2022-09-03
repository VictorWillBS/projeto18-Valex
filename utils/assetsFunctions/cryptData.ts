const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

export function encryptString(data:string|undefined):string{
  console.log(data)
  const encryptedData:string = cryptr.encrypt(data);
  return encryptedData
}

export function decryptString(encriptedData:string| undefined):string{
  const decryptedData:number = cryptr.decrypt(encriptedData);
  return `${decryptedData}`
}



