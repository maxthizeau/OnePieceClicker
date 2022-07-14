import { ECaptainEffect, EShipEffect, TUnit } from "../types"
import { ActionEnum, useGameState, ICardUnit, ICrewUnit, IFleetUnit } from "./GameContext"
import { Store } from "react-notifications-component"
import CardLootNotification from "../../components/Global/notifications/UnitNotification"
import { getCrewCaptain, getPriceUnit } from "../clickerFunctions"
import useShip from "./useShip"
import useItems from "./useItems"
import useUpgrades from "./useUpgrades"

type TResponse = {
  success: boolean
  title?: string
  message?: string
}

const useFleet = () => {
  const gameState = useGameState()

  const { cards, fleet, crew } = gameState.state
  const { getShipBoost } = useShip()
  const { isItemActive } = useItems()

  const gainXP = (crewUnit: ICrewUnit, xpAmount: number) => {
    // if (!crewUnit) return null
    gameState.dispatch({
      type: ActionEnum.GainXP,
      payload: {
        crew: crewUnit,
        gainXP: xpAmount,
      },
    })
  }

  const removeFromCrew = (crewUnit: ICrewUnit) => {
    gameState.dispatch({
      type: ActionEnum.RemoveFromCrew,
      payload: {
        crew: crewUnit,
      },
    })
  }

  const addToCrew = (fleetUnit: IFleetUnit): TResponse => {
    gameState.dispatch({
      type: ActionEnum.AddToCrew,
      payload: {
        crew: {
          fleetId: fleetUnit.id,
        },
      },
    })

    return {
      title: `${fleetUnit.unit.name} is now in your crew`,
      message: "Success message",
      success: true,
    }
  }

  const rngCrewMemberGainXP = (amount: number) => {
    if (crew.length <= 0) {
      return
    }
    const shipBoost = getShipBoost(EShipEffect.XP_GAIN)
    const captainBoost = getCaptainBoost(ECaptainEffect.XP)
    const itemBoost = isItemActive("cola") ? 1.2 : 1

    // const filteredCrew = crew.filter((x) => fleet.find((fleetMember) => fleetMember.id == x.fleetId && fleetMember.hp > 0))
    const rngCrew = Math.floor(Math.random() * crew.length)
    if (!memberHas0HP(crew[rngCrew])) {
      const finalAmount = amount * shipBoost * captainBoost * itemBoost
      gameState.dispatch({ type: ActionEnum.GainXP, payload: { gainXP: finalAmount, crew: crew[rngCrew] } })
      console.log(`Crew member : ${crew[rngCrew].fleetId} --> + ${finalAmount} XP`)
    }
  }

  const crewLooseHP = (amount: number) => {
    // const healingValue = 0
    const upgradeBoost = Math.pow(gameState.state.upgrades.Heal.valuePerLevel, gameState.state.upgrades.Heal.level)
    const healingValue = isItemActive("healFood") ? Math.floor(500 * upgradeBoost) : 0

    const changeHP = healingValue - amount
    for (let i = 0; i < crew.length; i++) {
      gameState.dispatch({ type: ActionEnum.ChangeHP, payload: { changeHP, crew: crew[i] } })
      console.log(`Crew member : ${crew[i].fleetId} -->  ${changeHP} HP`)
    }
  }

  const memberHas0HP = (crewUnit: ICrewUnit): boolean => {
    const fleetUnit = fleet.find((x) => x.id == crewUnit.fleetId)
    if (!fleetUnit) return true
    return fleetUnit.hp <= 0
  }

  function getCaptainBoost(effect: ECaptainEffect): number {
    const captainEffect = getCrewCaptain(crew, fleet)
    if (!captainEffect) return 1
    for (let i = 0; i < captainEffect.length; i++) {
      if (captainEffect[i].effect == effect) {
        const shipBoost = getShipBoost(EShipEffect.CAPTAIN_BOOST)
        return 1 + (captainEffect[i].value * shipBoost) / 100
      }
    }
    return 1
  }

  const fleetFunctions = {}
  const crewFunctions = { gainXP, removeFromCrew, addToCrew, getCaptainBoost, rngCrewMemberGainXP, crewLooseHP, memberHas0HP } as const

  return { fleet, crew, fleetFunctions, crewFunctions } as const
}

export default useFleet
