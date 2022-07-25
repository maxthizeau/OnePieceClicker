import { TUpgrade } from "../data/upgrades"
import { ActionEnum, useGameState } from "./GameContext"

export type TUpgradeKey = "ClickPower" | "CrewPower" | "LootChance" | "XP" | "Berry" | "Heal" | "AutoHeal" | "AutoRecruit" | "CrewMembers"

const useUpgrades = () => {
  const gameState = useGameState()
  const { upgrades } = gameState.state

  const levelUp = (upgradeKey: TUpgradeKey) => {
    const keyName = upgradeKey as keyof TUpgrade
    gameState.dispatch({
      type: ActionEnum.Upgrade,
      payload: {
        upgrade: keyName,
      },
    })
  }

  return [upgrades, levelUp] as const
}

export default useUpgrades
