const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

export function encryptCVV(cvv:string):string{
  console.log(cvv)
  const encryptedCVV:string = cryptr.encrypt(cvv);
  return encryptedCVV
}

export function decryptCVV(encryptedCVV:string):string{
  const decryptedCVV:number = cryptr.decrypt(encryptedCVV);
  return `${decryptedCVV}`
}

console.log(decryptCVV('0c06507b0508d78272efee214657e81dc2a5c9d7aa3d25aa963fa8495a5a96d126c8378b5e7c8e6512c76eea8a3008a64304bfd3688c86eac143fc9c0a8be780eb0111291868824179b764f45ca2dfe20571bd3b8cf91abe240c7312c70fb204a8d32e'))
