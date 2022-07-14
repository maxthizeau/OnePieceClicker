import { useEffect } from "react"
import CryptoJS from "crypto-js"
import { getUnitAttackPower } from "../clickerFunctions"
import { useGameState } from "./GameContext"
import useInterval from "./useInterval"

const useSave = () => {
  const gameState = useGameState()

  // useInterval(() => save(), 10000)

  const save = () => {
    console.log("AUTO-SAVE")

    const saveJson = JSON.stringify(gameState.state)
    const encrypted = CryptoJS.AES.encrypt(saveJson, "Secret Passphrase")

    sessionStorage.setItem("opsave", encrypted.toString())
    return encrypted.toString()
  }

  const reset = () => {
    sessionStorage.removeItem("opsave")
  }

  const downloadSave = () => {
    const savetxt = save()
    const element = document.createElement("a")
    const file = new Blob([savetxt], {
      type: "text/plain",
    })
    element.href = URL.createObjectURL(file)
    element.download = "myFile.txt"
    document.body.appendChild(element)
    element.click()
  }

  return [save, reset, downloadSave] as const
}

export default useSave
