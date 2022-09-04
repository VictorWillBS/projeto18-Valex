import { Request,Response,NextFunction,} from "express";
export  function validApiKey(req:Request, res:Response,next:NextFunction) {
  const {apikey} = req.headers
  if(!apikey){
    throw{code:'Forbidden', message: 'Chave de Acesso Requirida.'}
  }

  next()
}