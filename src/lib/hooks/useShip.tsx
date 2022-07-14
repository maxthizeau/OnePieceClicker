import { getShipEffects } from "../clickerFunctions"
import { ships } from "../data/ships"
import { EShipEffect } from "../types"
import { ActionEnum, useGameState } from "./GameContext"

const useShip = () => {
  const gameState = useGameState()
  const { ship, unlockedShips } = gameState.state

  const currentShip = ships.find((x) => x.id == ship) ?? ships[0]

  function changeShip(id: number) {
    gameState.dispatch({ type: ActionEnum.ShipChange, payload: { ships: [id] } })
  }

  function unlockShips(ids: number[]) {
    gameState.dispatch({ type: ActionEnum.ShipUnlock, payload: { ships: ids } })
  }

  function getShipFromId(id: number) {
    const shipFound = ships.find((x) => x.id == id)
    return shipFound
  }

  function getShipBoost(effect: EShipEffect): number {
    const shipEffects = getShipEffects(currentShip)

    for (let i = 0; i < shipEffects.length; i++) {
      const shipEffect = shipEffects[i]
      if (shipEffect.effect == effect) {
        return 1 + shipEffect.value / 100
      }
    }

    return 1
  }

  return { currentShip, unlockedShips, changeShip, unlockShips, getShipFromId, getShipBoost } as const
}

export default useShip
