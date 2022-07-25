import CryptoJS from "crypto-js"
export function hardCopy<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

export function nFormatter(num: number, digits: number): string {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: " k" },
    { value: 1e6, symbol: " M" },
    { value: 1e9, symbol: " G" },
    { value: 1e12, symbol: " T" },
    { value: 1e15, symbol: " P" },
    { value: 1e18, symbol: " E" },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0"
}

export function intWithSpacesOrFormatIfGreaterThan(num: number, power: number) {
  if (num % Math.pow(10, power) > 0) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  } else {
    return nFormatter(num, 3)
  }
}

export function stringToJsonState(save: string) {
  try {
    const decrypted = CryptoJS.AES.decrypt(save, "Secret Passphrase")
    const saveJsonDecrypted = decrypted.toString(CryptoJS.enc.Utf8)
    const saveJson = JSON.parse(saveJsonDecrypted)
    return saveJson
  } catch (e) {
    return null
  }
}
