import * as employeeRepository from "../repositories/employeeRepository"
export async function getEmployeeName(employeeCardData:{employeeId:number,type:string}) {
  const employeeData:{fullname:string,cpf:string,email:string,companyId:number}|any = await employeeRepository.findById(employeeCardData.employeeId)
  if(!employeeData){
    throw{code:'Not Found', message:'Funcionário não encontrado.'}
  }
  return employeeData.fullName
}
