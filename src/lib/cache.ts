import { InMemoryCache, Reference, makeVar } from "@apollo/client"
import { EInstance } from "./enums"

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        zoneId: {
          read() {
            return zoneIdVar()
          },
        },
        instance: {
          read() {
            return instanceVar()
          },
        },
      },
    },
  },
})

function getFromSessionStorage<T extends Object>(key: string, defaultValue: T, toJson: boolean = false): string {
  const stringDefaultValue = toJson ? JSON.stringify(defaultValue) : defaultValue.toString()
  console.log(key)
  console.log(stringDefaultValue)

  if (typeof window !== "undefined") {
    if (sessionStorage) {
      if (sessionStorage.getItem(key)) {
        return sessionStorage.getItem(key) ?? stringDefaultValue
      }
    }
  }

  return stringDefaultValue
}
// console.log("FROM STORAGE : ", getFromSessionStorage("instance", EInstance.Clicker))

export const zoneIdVar = makeVar<number>(parseInt(getFromSessionStorage("zoneId", 0)))
export const instanceVar = makeVar<string>(getFromSessionStorage("instance", "Zone"))
