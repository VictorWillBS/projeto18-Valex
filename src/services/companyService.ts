import { Request,Response,NextFunction,} from "express";
import { findByApiKey } from "../repositories/companyRepository";
export async function validCompanyApiKey(apikey:string|any) {
  const companie = await findByApiKey(`${apikey}`)
  if(!companie){
    throw{code:'Unauthorized', message: 'Acesso não autorizado'}
  }
}