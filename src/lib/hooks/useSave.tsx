import CryptoJS from "crypto-js"
import { useContext } from "react"
import { stringToJsonState } from "../utils"
import { ActionEnum, useGameState } from "./GameContext"
import { TreasureGameContext } from "./TreasureGameContext"
import { useTutorial } from "./TutorialContext"
import useInterval from "./useInterval"

const useSave = () => {
  const gameState = useGameState()
  const tutorial = useTutorial()
  const treasureGame = useContext(TreasureGameContext)

  useInterval(() => save(), 10000)

  const getObjectSave = () => {
    const saveObject = {
      game: gameState.state,
      treasureGame: treasureGame.state,
      tutorial: tutorial.state,
    }
    return saveObject
  }
  const save = () => {
    console.log("AUTO-SAVE")

    const saveObject = getObjectSave()
    const saveJson = JSON.stringify(saveObject)
    const encrypted = CryptoJS.AES.encrypt(saveJson, process.env.SAVE_KEY)

    localStorage.setItem("opsave", encrypted.toString())
    return encrypted.toString()
  }

  const reset = () => {
    localStorage.removeItem("opsave")
    gameState.dispatch({ type: ActionEnum.ResetState })
    tutorial.dispatch.resetTutorial()
    treasureGame.dispatch.resetLevel()
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
    try {
      if (saveObj !== null) {
        if (saveObj.game && saveObj.tutorial && saveObj.treasureGame) {
          gameState.dispatch({ type: ActionEnum.Import, payload: { import: saveTxt } })
          tutorial.dispatch.importFunc(saveObj.tutorial)
          treasureGame.dispatch.importFunc(saveObj.treasureGame)
          return true
        }
      }
      return false
    } catch (e) {
      console.log("error : ", e)
      return false
    }
  }

  return [save, reset, downloadSave, importSave] as const
}

export default useSave
