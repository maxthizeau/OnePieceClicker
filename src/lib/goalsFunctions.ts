import { getThumbImageSrc, idNumberToString, intWithSpaces } from "./clickerFunctions"
import { zones } from "./data/zones"
import { EGoalRewardCurrency, EGoalType, TGoal } from "./types"

export function goalToString(goal: TGoal): { toString: string; logo: string } {
  const zone = zones.find((x) => x.id == goal.zoneId)
  const defaultGoal = { toString: "Error", logo: "warningIcon" }
  switch (goal.type) {
    case EGoalType.KILL_ENEMIES:
      if (!zone) return defaultGoal
      defaultGoal.toString = `Beat ${goal.value} enemies in ${zone.location}`
      defaultGoal.logo = "crewPowerIcon"
      return defaultGoal

    case EGoalType.CLEAR_DUNGEON:
      if (!zone) return defaultGoal
      defaultGoal.toString = `Finish ${goal.value} times the dungeon of ${zone.location}`
      defaultGoal.logo = "logPoseIcon"
      return defaultGoal

    case EGoalType.LOOT_VIVRECARD:
      if (!zone) return defaultGoal
      defaultGoal.toString = `Loot all vivre cards of ${zone.location}`
      defaultGoal.logo = "memberIcon"
      return defaultGoal

    case EGoalType.MINE_ENERGY:
      defaultGoal.toString = `Use ${goal.value} energy in the mine`
      defaultGoal.logo = "energyRefillcon"
      return defaultGoal

    case EGoalType.MINE_LOOT:
      defaultGoal.toString = `Loot ${goal.value} gems in the mine`
      defaultGoal.logo = "diamondIcon"
      return defaultGoal

    default:
      defaultGoal.toString = `Unknown goal`
      defaultGoal.logo = "warningIcon"
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
      printableResult.logo = "images/icons/dendenmushi.png"
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
      printableResult.logo = `images/ships/icon/ship_${idNumberToString(goal.rewardAmount)}_t2.png`
      break
    default:
      break
  }
  return printableResult
}
