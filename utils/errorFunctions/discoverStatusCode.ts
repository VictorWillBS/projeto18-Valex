function discoverStatusCode(errorcode:string):any{
  const codes =[
  {code:'Bad Request',statusCode:400},
  {code:'Unauthorized',statusCode:401},
  {code:'Not Found',statusCode:404},
  {code:'Conflited',statusCode:409},
  {code:'Unprocessable Entity',statusCode:422}];
  const codeDiscoverd : {code:string,statusCode:number}[]= codes.filter((element)=>element.code === errorcode );
  return codeDiscoverd[0].statusCode
}
export default discoverStatusCode
