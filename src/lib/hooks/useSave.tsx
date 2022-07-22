import { useEffect } from "react"
import CryptoJS from "crypto-js"
import { getUnitAttackPower } from "../clickerFunctions"
import { ActionEnum, stringToJsonState, useGameState } from "./GameContext"
import useInterval from "./useInterval"

const useSave = () => {
  const gameState = useGameState()

  useInterval(() => save(), 10000)

  const save = () => {
    console.log("AUTO-SAVE")

    const saveJson = JSON.stringify(gameState.state)
    const encrypted = CryptoJS.AES.encrypt(saveJson, "Secret Passphrase")

    localStorage.setItem("opsave", encrypted.toString())
    return encrypted.toString()
  }

  const reset = () => {
    localStorage.removeItem("opsave")
    gameState.dispatch({ type: ActionEnum.ResetState })
  }

  const downloadSave = () => {
    const savetxt = save()
    const element = document.createElement("a")
    const file = new Blob([savetxt], {
      type: "text/plain",
    })
    const now = new Date()
    element.href = URL.createObjectURL(file)
    element.download = `opc_save_${now.getMonth()}_${now.getDate()}_${now.getFullYear()}_${now.getTime()}.txt`
    document.body.appendChild(element)
    element.click()
  }

  const importSave = (saveTxt: string) => {
    const saveObj = stringToJsonState(saveTxt)
    if (saveObj !== null) {
      gameState.dispatch({ type: ActionEnum.Import, payload: { import: saveTxt } })
      return true
    }
    return false
  }

  return [save, reset, downloadSave, importSave] as const
}

export default useSave
