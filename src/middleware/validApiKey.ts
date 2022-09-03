import { Request,Response,NextFunction,} from "express";
export  function validApiKey(req:Request, res:Response,next:NextFunction) {
  const {apikey} = req.headers
  if(!apikey){
    throw{code:'Bad Request', message: 'Api Key não enviada'}
  }

  next()
}