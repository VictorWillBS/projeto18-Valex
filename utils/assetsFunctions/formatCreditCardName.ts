export default function formatCreditCardName(name:string):string{
  const nameSplited = name.split(" ").filter((word:string)=> word.length>2)
  
  const result =nameSplited.map((word:string,index:number)=>{
    if(index===0||index===(nameSplited.length-1)){
      return word
    }else{
      return word[0]
    }
  })
  return result.join(" ")
}
