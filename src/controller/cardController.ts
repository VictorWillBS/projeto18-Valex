import { Request, Response } from 'express';
import { Card } from '../repositories/cardRepository';
import * as cardServices from "../services/cardServices";
import * as companyServicer from "../services/companyService";
import * as employeeService from "../services/employeeService";

export async function createCard(req: Request, res: Response) {
  const {apikey} = req.headers;
  await companyServicer.validCompanyApiKey(apikey);

  const employeeCardData:{employeeId:number,type:string} = req.body;
  await cardServices.validEmployeeAbletoCard(employeeCardData);
  
  
  const employeeName:string|any = await employeeService.getEmployeeName(employeeCardData);
  const cardData:object = await cardServices.createCardData(employeeName,employeeCardData);

  await cardServices.createCard(cardData);
  res.status(201).send('Sucesso na criação do cartão!');
}

export async function activeCard(req: Request, res: Response){
  console.log('entrei no active controller')
  const {cvc, password}:{cvc:string,password:string} = req.body
  const card : Card[] = await cardServices.getCardByCvc(cvc)

  await cardServices.insertPassword(card[0].id,password)
  res.status(201).send('Cartão Ativado')
}