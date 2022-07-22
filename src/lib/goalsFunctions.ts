import { getThumbImageSrc, idNumberToString, intWithSpaces } from "./clickerFunctions"
import { ships } from "./data/ships"
import { zones } from "./data/zones"
import { EGoalRewardCurrency, EGoalType, TGoal } from "./types"

export function goalToString(goal: TGoal): { toString: string; logo: string; goalKey: string; value: number; location: string } {
  const defaultGoal = { toString: "Error", logo: "warningIcon", goalKey: "ERROR", value: 0, location: "" }
  const zone = goal?.zoneId !== undefined ? zones.find((x) => x.id == goal.zoneId) : null

  defaultGoal.location = zone?.location ?? ""
  // defaultGoal.zoneId = zone?.location ?? ""
  defaultGoal.value = goal?.value ?? 0
  switch (goal.type) {
    case EGoalType.KILL_ENEMIES:
      if (!zone) return defaultGoal
      defaultGoal.toString = `Beat ${goal.value} enemies in ${zone.location}`
      defaultGoal.logo = "crewPowerIcon"
      defaultGoal.goalKey = "KILL_ENEMIES"

      return defaultGoal

    case EGoalType.CLEAR_DUNGEON:
      if (!zone) return defaultGoal
      defaultGoal.toString = `Finish ${goal.value} times the dungeon of ${zone.location}`
      defaultGoal.logo = "logPoseIcon"
      defaultGoal.goalKey = "CLEAR_DUNGEON"
      return defaultGoal

    case EGoalType.LOOT_VIVRECARD:
      if (!zone) return defaultGoal
      defaultGoal.toString = `Loot all vivre cards of ${zone.location}`
      defaultGoal.logo = "memberIcon"
      defaultGoal.goalKey = "LOOT_VIVRECARD"
      return defaultGoal

    case EGoalType.MINE_ENERGY:
      defaultGoal.toString = `Use ${goal.value} energy in the mine`
      defaultGoal.logo = "energyRefillcon"
      defaultGoal.goalKey = "MINE_ENERGY"
      return defaultGoal

    case EGoalType.MINE_LOOT:
      defaultGoal.toString = `Loot ${goal.value} gems in the mine`
      defaultGoal.logo = "diamondIcon"
      defaultGoal.goalKey = "MINE_LOOT"
      return defaultGoal

    default:
      defaultGoal.toString = `Unknown goal`
      defaultGoal.logo = "warningIcon"
      defaultGoal.goalKey = "UNKNOWN_GOAL"
      return defaultGoal
  }
}

export function getPrintableRewardCurrency(goal: TGoal) {
  const printableResult: { amount: any; logo: string } = { amount: intWithSpaces(goal.rewardAmount), logo: "images/icons/warningIcon.png" }
  switch (goal.rewardCurrency) {
    case EGoalRewardCurrency.Berry:
      printableResult.logo = "images/icons/berry.png"
      break
    case EGoalRewardCurrency.LogPose:
      printableResult.logo = "images/icons/logPoseIcon.png"
      break
    case EGoalRewardCurrency.Cola:
      printableResult.logo = "images/icons/colaIcon.png"
      break
    case EGoalRewardCurrency.HealFood:
      printableResult.logo = "images/icons/healFoodIcon.png"
      break
    case EGoalRewardCurrency.DemonFruit:
      printableResult.logo = "images/icons/demonFruitIcon.png"
      break
    case EGoalRewardCurrency.DendenMushi:
      printableResult.logo = "images/icons/dendenmushiIcon.png"
      break
    case EGoalRewardCurrency.VivreCard:
      printableResult.amount = "[Vivre Card]"
      printableResult.logo = getThumbImageSrc(idNumberToString(goal.rewardAmount))
      break
    case EGoalRewardCurrency.Crew:
      printableResult.amount = "[Fleet Member]"
      printableResult.logo = getThumbImageSrc(idNumberToString(goal.rewardAmount))
      break
    case EGoalRewardCurrency.Boat:
      printableResult.amount = "[New Ship]"
      const ship = ships.find((x) => x.id == goal.rewardAmount) ?? ships[0]
      printableResult.logo = `images/ships/icon/${ship.thumb}_t2.png`
      break
    default:
      break
  }
  return printableResult
}
