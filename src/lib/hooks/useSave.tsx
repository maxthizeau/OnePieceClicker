import { useEffect } from "react"
import CryptoJS from "crypto-js"
import { getUnitAttackPower } from "../clickerFunctions"
import { useGameState } from "./GameContext"
import useInterval from "./useInterval"

const useSave = () => {
  const gameState = useGameState()

  useInterval(() => save(), 10000)

  const save = () => {
    console.log("AUTO-SAVE")

    const saveJson = JSON.stringify(gameState.state)
    const encrypted = CryptoJS.AES.encrypt(saveJson, "Secret Passphrase")

    sessionStorage.setItem("opsave", encrypted.toString())
  }

  const reset = () => {
    sessionStorage.removeItem("opsave")
  }

  return [save, reset] as const
}

export default useSave
