import { useEffect } from "react"
import { EStepKeys } from "../data/tutorial"
import { EInstance } from "../enums"
import { ActionEnum, useGameState } from "./GameContext"
import { useTutorial } from "./TutorialContext"

const useInstance = () => {
  const gameState = useGameState()
  const tutorial = useTutorial()
  const instance = gameState.state.instance

  useEffect(() => {
    // Prevent blocking in tutorial
    if (tutorial.step.stepKey == EStepKeys.VISIT_ISLAND && instance != EInstance.Zone) {
      changeInstance(EInstance.Zone)
    }
    if (tutorial.step.stepKey == EStepKeys.ENTER_DUNGEON && instance != EInstance.Zone && instance != EInstance.Dungeon) {
      changeInstance(EInstance.Zone)
    }
    if (tutorial.step.stepKey == EStepKeys.GO_BACK_ZONE && instance != EInstance.Clicker) {
      tutorial.dispatch.nextStep()
    }
  }, [tutorial.step])

  const changeInstance = (newInstance: EInstance) => {
    if (tutorial.step.stepKey == EStepKeys.VISIT_ISLAND && newInstance == EInstance.Clicker) {
      tutorial.dispatch.nextStep()
    }
    if (tutorial.step.stepKey == EStepKeys.GO_BACK_ZONE && newInstance == EInstance.Zone) {
      tutorial.dispatch.nextStep()
    }

    gameState.dispatch({
      type: ActionEnum.ChangeInstance,
      payload: {
        instance: newInstance,
      },
    })
  }

  return { instance, changeInstance } as const
}

export default useInstance
