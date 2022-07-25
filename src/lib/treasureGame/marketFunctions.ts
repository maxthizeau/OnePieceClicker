import CryptoJS from "crypto-js"

const unitCount = 3487
const currencyCount = 10
const marketItemCount = 10

function getDecimalHash(s: string): number {
  const hash = CryptoJS.SHA256(s)
  const decimalHash = parseInt(hash.toString(), 16)
  return decimalHash
}

export function getMarketList() {
  console.log("---")
  const now = new Date().getTime()
  const _6hour = Math.floor(now / (60 * 60 * 6 * 1000)) + 1
  const hash = CryptoJS.SHA256(_6hour.toString())
  const decimalHash = parseInt(hash.toString(), 16)

  const unitsList: { id: number; currency: number; price: number }[] = []
  for (let i = 1; i <= marketItemCount; i++) {
    const id = (decimalHash / Math.pow(10, i)) % unitCount
    let currency = Math.floor(decimalHash / id / Math.pow(9, 60 + i)) % currencyCount
    const price = Math.round(((getDecimalHash(id.toString()) / Math.pow(10, i * 2)) % 13) / 4) + 3
    unitsList.push({ id: id, currency: currency, price: price })
  }
  //   console.log(unitsList)

  return unitsList
  //   console.log("SHA3 hash : ", hash.toString())
  //   console.log("SHA3 hash int : ", parseInt(hash.toString(), 16))
}
