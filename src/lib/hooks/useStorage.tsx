import { useState } from "react"

interface IStorage {
  clearedZones: number[]
  currentZone: number
}

type keyNames = "clearedZones" | "currentZone"

const defaultStorage: IStorage = {
  clearedZones: [],
  currentZone: 1,
}

const useStorage = (keyName: keyNames) => {
  const storageName = "save"
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.sessionStorage.getItem(keyName)

      if (value) {
        return JSON.parse(value)
      } else {
        window.sessionStorage.setItem(storageName, JSON.stringify(defaultStorage[keyName]))
        return defaultStorage
      }
    } catch (err) {
      return defaultStorage
    }
  })

  const setFullStorage = (newValue: IStorage) => {
    try {
      window.sessionStorage.setItem(storageName, JSON.stringify(newValue))
    } catch (err) {
      console.error("Error setFullStorage")
    }
    setStoredValue(newValue)
  }

  const setValueForKey = (key: keyNames, newValue: any) => {
    try {
      let merge: any = {}
      merge[key] = newValue
      const newStorage: IStorage = { ...storedValue, ...merge }
      window.sessionStorage.setItem(storageName, JSON.stringify(newStorage))
    } catch (err) {
      console.error("Error setValueForKey")
    }
    setStoredValue(newValue)
  }

  return [storedValue, setFullStorage, setValueForKey]
}

export default useStorage
