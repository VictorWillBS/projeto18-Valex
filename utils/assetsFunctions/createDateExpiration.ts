import dayjs from "dayjs";
export default function createDateExpiration(){
  const dateExpiration = dayjs().add(5,'years')
  const month = `${dateExpiration.month() + 1 <10?"0"+(dateExpiration.month() + 1):dateExpiration.month() + 1}`
  const year = `${dateExpiration.year()}`
  const resultString = `${month}/${year.substring(2)}`
  return resultString
}
