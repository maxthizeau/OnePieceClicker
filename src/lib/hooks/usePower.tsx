import { getUnitAttackPower } from "../clickerFunctions"
import { ECaptainEffect, EShipEffect } from "../types"
import { useGameState } from "./GameContext"
import useFleet from "./useFleet"
import useItems from "./useItems"
import useShip from "./useShip"
import useUpgrades from "./useUpgrades"

const usePower = () => {
  // const { crew, fleet } = useGameState().state
  const { fleet, crew, crewFunctions } = useFleet()
  const { getCaptainBoost } = crewFunctions
  const { getShipBoost } = useShip()
  const [upgrades] = useUpgrades()
  const { isItemActive } = useItems()

  const calculCrewPower = (): number => {
    let crewPower = 0

    if (crew.length <= 0) return 0
    for (let i = 0; i < crew.length; i++) {
      const fleetUnit = fleet.find((x) => crew[i].fleetId == x.id)
      if (!fleetUnit) break
      const unitATK = getUnitAttackPower(fleetUnit)
      if (fleetUnit.hp > 0) {
        crewPower = crewPower + unitATK
      }
    }
    // crewPower += crew.length
    const captainEffect = getCaptainBoost(ECaptainEffect.CREW_POWER)
    const shipBoost = getShipBoost(EShipEffect.CREW_POWER)
    const upgradeBoost = Math.pow(upgrades.CrewPower.valuePerLevel, upgrades.CrewPower.level)
    const itemBoost = isItemActive("demonFruit") ? 1.2 : 1
    // console.log("BOOST : ", upgradeBoost, upgrades.CrewPower)
    crewPower = crewPower * captainEffect * shipBoost * upgradeBoost * itemBoost

    return Math.round(crewPower)
  }

  const calculClickPower = (): number => {
    const captainEffect = getCaptainBoost(ECaptainEffect.CLICK_POWER)
    const shipBoost = getShipBoost(EShipEffect.CLICK_POWER)
    let clickPower = 1
    if (crew.length <= 0) return 1
    for (let i = 0; i < crew.length; i++) {
      const fleetUnit = fleet.find((x) => crew[i].fleetId == x.id)
      if (!fleetUnit) break
      const unitATK = getUnitAttackPower(fleetUnit)

      clickPower = clickPower + unitATK
    }
    clickPower = 1 + clickPower * 0.32
    const upgradeBoost = Math.pow(upgrades.ClickPower.valuePerLevel, upgrades.ClickPower.level)
    const itemBoost = isItemActive("demonFruit") ? 1.2 : 1
    clickPower = clickPower * captainEffect * shipBoost * upgradeBoost * itemBoost
    return Math.round(clickPower)
  }
  const crewPower: number = calculCrewPower()
  const clickPower: number = calculClickPower()

  return [crewPower, clickPower] as const
}

export default usePower
