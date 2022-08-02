import Cookies from "js-cookie"
import { useState } from "react"

export default function useStatePersistInCookie<T>(key: string, value: T): [T, (arg: T) => void] {
  const getCookieValue = () => {
    try {
      const val = Cookies.get(`OPC_${key}`) !== undefined ? JSON.parse(Cookies.get(`OPC_${key}`)) : value
      return val
    } catch {
      return value
    }
  }
  const [data, setData] = useState<T>(getCookieValue())
  //   useEffect(() => {
  //     const cookieValue = Cookies.get(`OPC_${key}`)
  //     if (cookieValue === undefined) {
  //       // console.log("Cookie is undefined, set to default value", cookieValue)
  //       setData(value)
  //     } else {
  //       //   console.log("Cookie is defined. Get its value", cookieValue)
  //       //   console.log(JSON.parse(cookieValue))
  //       setData(JSON.parse(cookieValue))
  //     }
  //   }, [])

  const changeData = (newValue: T) => {
    Cookies.set(`OPC_${key}`, JSON.stringify(newValue), { expires: 100, sameSite: "strict" })
    setData(newValue)
  }
  return [data, changeData]
}
