import { faker } from '@faker-js/faker';

export function createCreditCardNumber():string{
  const fakeCreditCardNumber:string = faker.finance.creditCardNumber()
  return fakeCreditCardNumber
}

export function createCreditCardCVV():string{
  const fakeCreditCardCVV:string = faker.finance.creditCardCVV()
  return fakeCreditCardCVV
}

