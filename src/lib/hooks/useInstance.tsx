import { EInstance } from "../enums"
import { ActionEnum, useGameState } from "./GameContext"

const useInstance = () => {
  const gameState = useGameState()
  const instance = gameState.state.instance

  const changeInstance = (newInstance: EInstance) => {
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
