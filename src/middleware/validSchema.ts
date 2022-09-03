import { Request,Response,NextFunction,} from "express";
export function validSchema(schema:any){
  
  const value = (req:Request, res:Response,next:NextFunction)=>{
    
    const toValid = req.body;
    const {error}= schema.validate(toValid)
    if (error){
    
      throw{code:'Unprocessable Entity', message: 'Dados Enviados Incorretamente'}
    }

    next()
  }
  return value
}