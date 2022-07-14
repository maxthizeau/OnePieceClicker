import { createContext, useContext, useMemo, useReducer } from "react"
import { getMaximumHP, getMaximumXP, getShipEffects, idNumberToString } from "../clickerFunctions"
import { defaultItemsList, TItem } from "../data/items"
import { EInstance } from "../enums"
import { EGoalRewardCurrency, EGoalType, EShipEffect, ICurrentGoal, TUnit } from "../types"
import CryptoJS from "crypto-js"
import { ETreasureGameUpgrades, defaultTreasureGameUpgradeState, mineUpgradesList, getDefaultTreasureGameGemsState } from "../data/treasureGame"
import { hardCopy } from "../utils"
import { getMarketList } from "../treasureGame/marketFunctions"
import { ships } from "../data/ships"
import { defaultUpgrades, TUpgrade } from "../data/upgrades"
import { goalsList } from "../data/goals"
import { zones } from "../data/zones"
import save from "../data/save"
import { ELogType, useLogs } from "./useLogs"
import UnitNotification from "../../components/Global/notifications/UnitNotification"
import { defaultMenuUnlockState, IMenuUnlockState, menuUnlocksPrices, IMenuUnlockPayload, XPBoostUnlockPrices, RayleighUnlockPrices } from "../data/menuUnlocks"

const allUnits: TUnit[] = require("../../lib/data/units.json")

export enum ActionEnum {
  ChangeInstance,
  AddBerries,
  SpendBerries,
  LootCard,
  RecruitCard,
  AddToCrew,
  RemoveFromCrew,
  SetCaptain,
  GainXP,
  ChangeHP,
  Upgrade,
  AddItem,
  UseItem,
  ShipUnlock,
  ShipChange,
  TreasureGame_Upgrade,
  TreasureGame_LootGem,
  TreasureGame_UseEnergy,
  TreasureGame_BuyMarket,
  Goal_SetCurrent,
  Goal_Claim,
  Training_Unlock,
  Training_AddUnit,
  Training_RemoveUnit,
  Unlock_Menu,
  KilledEnemy,
  DungeonDone,
  Save,
  Import,
}

export interface ITrainingPayload {
  type: "xp" | "rayleigh"
  fleetUnitId?: number
}

export interface IItemPayload {
  key: string
  quantity: number
}

export interface IFleetUnit {
  id: number
  unit: TUnit
  level: number
  xp: number
  hp: number
}

export interface ICrewUnit {
  fleetId: number
  isCaptain?: boolean
}

export interface ICardUnit extends TUnit {
  lootOrder: number
}

export interface ITraining {
  XPBoost: {
    maxSlots: number
    fleetUnitIds: number[]
  }
  Rayleigh: {
    maxSlots: number
    fleetUnitIds: number[]
  }
}

interface State {
  maxZoneId: number
  instance: EInstance
  berries: number
  cards: ICardUnit[]
  fleet: IFleetUnit[]
  crew: ICrewUnit[]
  upgrades: TUpgrade
  items: TItem[]
  ship: number
  unlockedShips: number[]
  treasureGameUpgrades: { id: ETreasureGameUpgrades; level: number }[]
  treasureGameGems: { id: string; count: number }[]
  clearedGoals: number[]
  currentGoal: ICurrentGoal | null
  menuUnlocks: IMenuUnlockState
  training: ITraining
}

interface Payload {
  instance?: EInstance
  berriesChange?: number
  cards?: TUnit[]
  addFleet?: TUnit[]
  crew?: ICrewUnit
  gainXP?: number
  changeHP?: number
  upgrade?: keyof TUpgrade
  item?: IItemPayload
  treasureGameUpgrade?: ETreasureGameUpgrades
  treasureGameGem?: { id: string }
  treasureGameMarket?: {
    unit: TUnit
    id: number
    currency: number
    price: number
  }
  ships?: number[]
  goal?: number
  zoneId?: number
  treasureGameEnergyUsed?: number
  unlockMenu?: IMenuUnlockPayload
  training?: ITrainingPayload
}

type Action = { type: ActionEnum; payload?: Payload }
type Dispatch = (action: Action) => void
type GameProviderProps = { children: React.ReactNode }

const defaultState: State = {
  maxZoneId: 0,
  instance: EInstance.Zone,
  berries: 0,
  cards: [],
  fleet: [],
  crew: [],
  upgrades: defaultUpgrades,
  items: defaultItemsList,
  treasureGameUpgrades: defaultTreasureGameUpgradeState,
  treasureGameGems: getDefaultTreasureGameGemsState(),
  ship: 0,
  unlockedShips: [0],
  clearedGoals: [],
  currentGoal: null,
  menuUnlocks: defaultMenuUnlockState,
  training: {
    XPBoost: {
      maxSlots: 1,
      fleetUnitIds: [],
    },
    Rayleigh: {
      maxSlots: 1,
      fleetUnitIds: [],
    },
  },
}

function getDefaultState(): State {
  // if (typeof window !== "undefined") {
  //   if (sessionStorage) {
  //     if (sessionStorage.getItem("opsave")) {
  //       try {
  //         const save = sessionStorage.getItem("opsave") ?? JSON.stringify(defaultState)
  //         const decrypted = CryptoJS.AES.decrypt(save, "Secret Passphrase")
  //         const saveJsonDecrypted = decrypted.toString(CryptoJS.enc.Utf8)
  //         const saveJson = JSON.parse(saveJsonDecrypted)
  //         return saveJson
  //       } catch {
  //         return defaultState
  //       }
  //     }
  //   }
  // }

  // try {
  //   // const save = sessionStorage.getItem("opsave") ?? JSON.stringify(defaultState)
  //   const decrypted = CryptoJS.AES.decrypt(save, "Secret Passphrase")
  //   const saveJsonDecrypted = decrypted.toString(CryptoJS.enc.Utf8)
  //   const saveJson: State = JSON.parse(saveJsonDecrypted)
  //   saveJson.maxZoneId = 25
  //   return saveJson
  // } catch {
  //   return defaultState
  // }

  return defaultState
}

const baseState = getDefaultState()

export interface IContext {
  state: State
  dispatch: Dispatch
}

export const GameStateContext = createContext<IContext | undefined>(undefined)

function addBerries(state: State, action: Action): State {
  if (!action.payload || action.payload.berriesChange === undefined) throw new Error(`Specify amount arg for : ${action.type}`)
  return { ...state, berries: state.berries + action.payload.berriesChange }
}

function gameReducer(state: State, action: Action): State {
  const maximumCrewMember = 2 + state.upgrades.CrewMembers.level
  switch (action.type) {
    case ActionEnum.ChangeInstance: {
      if (!action.payload || action.payload.instance === undefined) throw new Error(`Specify arg for : ${action.type}`)
      return { ...state, instance: action.payload.instance }
    }
    case ActionEnum.AddBerries: {
      if (!action.payload || action.payload.berriesChange === undefined) throw new Error(`Specify amount arg for : ${action.type}`)
      return addBerries(state, action)
    }
    case ActionEnum.SpendBerries: {
      if (!action.payload || action.payload.berriesChange === undefined) throw new Error(`Specify amount arg for : ${action.type}`)
      if (state.berries - action.payload.berriesChange < 0) {
        return state
      }
      return { ...state, berries: state.berries - action.payload.berriesChange }
    }
    case ActionEnum.LootCard: {
      if (!action.payload?.cards) throw new Error(`Specify arg for : ${action.type}`)
      if (action.payload.cards.length < 1) return state

      const newCard = action.payload.cards[0]

      // Check if user already own this card
      const owned = state.cards.find((x) => x.id == newCard.id)
      // If he does, return the same state
      if (owned !== undefined) return state
      // If he doesn't, add the card to the state
      // And before that, add progress to the current goal if it is set as "Loot vivre card" in that zone
      let currentGoal = state.currentGoal
      if (state.currentGoal && state.currentGoal.type == EGoalType.LOOT_VIVRECARD && newCard.zone == state.currentGoal.zoneId) {
        currentGoal = hardCopy(state.currentGoal)
        currentGoal.progressValue = state.currentGoal.progressValue + 1
      }

      return { ...state, cards: [...state.cards, { ...newCard, lootOrder: state.cards.length }], currentGoal }
    }
    case ActionEnum.RecruitCard: {
      if (!action.payload?.addFleet) throw new Error(`Specify arg for : ${action.type}`)
      if (action.payload.addFleet.length < 1) return state
      const newFleetMember = action.payload.addFleet[0]
      const berryChange = action.payload.berriesChange ?? 0
      const newBerriesAmount = state.berries - berryChange
      if (newBerriesAmount < 0) return state

      // Check if user own this card && is not already in fleet
      const ownCard = state.cards.find((x) => x.id === newFleetMember.id)
      const ownFleetMember = state.fleet.find((x) => x.unit === newFleetMember)
      // If he doesn't, return the same state

      if (ownCard === undefined || ownFleetMember !== undefined) return state
      // If he does, add the card to the state
      else {
        const newCrewMember: ICrewUnit = {
          fleetId: state.fleet.length,
          isCaptain: false,
        }
        const finalFleetMember: IFleetUnit = {
          id: state.fleet.length,
          unit: newFleetMember,
          hp: getMaximumHP({ id: state.fleet.length, unit: newFleetMember, hp: 0, xp: 0, level: 1 }),
          xp: 0,
          level: 1,
        }
        const newCrew = state.crew.length < maximumCrewMember ? [...state.crew, newCrewMember] : state.crew

        return { ...state, fleet: [...state.fleet, finalFleetMember], berries: newBerriesAmount, crew: newCrew }
      }
    }
    case ActionEnum.AddToCrew: {
      if (!action.payload?.crew) throw new Error(`Specify arg for : ${action.type}`)
      const newCrewMemberId = action.payload.crew

      // Check if user has this id in fleet, is not in crew already, and check captain state (so there is no 2 captains in one crew)
      const ownCrewMember = state.fleet.find((x) => x.id === newCrewMemberId.fleetId)
      const isInCrew = state.crew.find((x) => x.fleetId === newCrewMemberId.fleetId)
      const lessThanMaximumCrewMemberCount = state.crew.length < maximumCrewMember
      const crewHasCaptain = state.crew.find((x) => x.isCaptain === true)
      const newCrewMember: ICrewUnit = {
        fleetId: newCrewMemberId.fleetId,
        isCaptain: !crewHasCaptain ? action.payload.crew.isCaptain : false,
      }
      // If he doesn't, return the same state
      if (!ownCrewMember || isInCrew || !lessThanMaximumCrewMemberCount) return state
      // If he does, add it to the crew
      else return { ...state, crew: [...state.crew, newCrewMember] }
    }
    case ActionEnum.RemoveFromCrew: {
      if (!action.payload?.crew) throw new Error(`Specify arg for : ${action.type}`)
      const crewMember = action.payload.crew

      // Check if specified crewMember is in crew
      // const ownCrewMember = state.fleet.find((x) => x.id === crewMember.fleetId)
      const indexInCrew = state.crew.findIndex((x) => x.fleetId === crewMember.fleetId)

      // If he doesn't, return the same state
      if (indexInCrew === -1) return state
      // If he does, splice the array and return the updated state
      const newCrew: ICrewUnit[] = state.crew.splice(indexInCrew, 1)
      return { ...state, crew: newCrew }
    }
    case ActionEnum.SetCaptain: {
      if (!action.payload?.crew) throw new Error(`Specify arg for : ${action.type}`)
      const crewMember = action.payload.crew

      // Check if specified crewMember is in crew
      const indexInCrew = state.crew.findIndex((x) => x.fleetId === crewMember.fleetId)

      // If he doesn't, return the same state
      if (indexInCrew === -1) return state
      // If he does, splice the array and return the updated state
      const newCrew: ICrewUnit[] = hardCopy(state.crew)
      for (let i = 0; i < newCrew.length; i++) {
        const crewUnit = newCrew[i]
        if (crewUnit.isCaptain) {
          newCrew[i].isCaptain = false
        }
      }
      newCrew[indexInCrew].isCaptain = true

      return { ...state, crew: newCrew }
    }
    case ActionEnum.GainXP: {
      if (!action.payload?.crew) throw new Error(`Specify arg for : ${action.type}`)

      const gainXP = action.payload.gainXP ?? 0
      const crewMember = action.payload.crew
      console.log("Gain XP", gainXP, crewMember)

      // Get fleet Member from crewUnit arg
      const fleetMemberIndex = state.fleet.findIndex((x) => x.id === crewMember.fleetId)
      // If doesn't exist, do nothing
      if (fleetMemberIndex === -1) return state

      const newFleet = JSON.parse(JSON.stringify(state.fleet))

      // If XP Full, next lvl
      if (state.fleet[fleetMemberIndex].xp + gainXP >= getMaximumXP(state.fleet[fleetMemberIndex])) {
        newFleet[fleetMemberIndex].level = state.fleet[fleetMemberIndex].level + 1 <= 100 ? state.fleet[fleetMemberIndex].level + 1 : 100
        // Heal to full hp
        newFleet[fleetMemberIndex].hp = getMaximumHP(newFleet[fleetMemberIndex])
        // Could save the delta, but prefer to reset xp to 0
        newFleet[fleetMemberIndex].xp = 0
      } else {
        newFleet[fleetMemberIndex].xp = state.fleet[fleetMemberIndex].xp + gainXP
      }

      return { ...state, fleet: newFleet }
    }
    case ActionEnum.ChangeHP: {
      if (!action.payload?.crew) throw new Error(`Specify arg for : ${action.type}`)

      const changeHP = action.payload.changeHP ?? 0
      const crewMember = action.payload.crew

      // Get fleet Member from crewUnit arg
      const fleetMemberIndex = state.fleet.findIndex((x) => x.id === crewMember.fleetId)
      // If doesn't exist, do nothing
      if (fleetMemberIndex === -1) return state

      const newFleet = JSON.parse(JSON.stringify(state.fleet))

      const maxHP = getMaximumHP(state.fleet[fleetMemberIndex])

      // If XP Full, next lvl
      if (state.fleet[fleetMemberIndex].hp + changeHP >= maxHP) {
        // Could save the delta, but prefer to reset xp to 0
        newFleet[fleetMemberIndex].hp = maxHP
      } else if (state.fleet[fleetMemberIndex].hp + changeHP <= 0) {
        newFleet[fleetMemberIndex].hp = 0
      } else {
        newFleet[fleetMemberIndex].hp = state.fleet[fleetMemberIndex].hp + changeHP
      }

      return { ...state, fleet: newFleet }
    }
    case ActionEnum.AddItem: {
      if (action.payload?.item === undefined) throw new Error(`Specify arg for : ${action.type}`)
      const payloadItem = action.payload?.item
      const berriesChange = action.payload?.berriesChange && action.payload?.berriesChange >= 0 ? action.payload?.berriesChange : 0

      // Copy the object to make update
      const newItems = hardCopy(state.items)

      const itemIndex = newItems.findIndex((x) => x.itemKey == payloadItem.key)
      if (itemIndex == -1) return state

      newItems[itemIndex].quantity = newItems[itemIndex].quantity + payloadItem.quantity

      return { ...state, items: newItems, berries: state.berries - berriesChange }
    }
    case ActionEnum.UseItem: {
      if (action.payload?.item === undefined) throw new Error(`Specify arg for : ${action.type}`)
      const payloadItem = action.payload?.item

      // Copy the object to make update
      const newItems = hardCopy(state.items)
      const itemIndex = newItems.findIndex((x) => x.itemKey == payloadItem.key)
      if (itemIndex == -1) return state
      const quantityUsed = newItems[itemIndex].quantity <= payloadItem.quantity ? newItems[itemIndex].quantity : payloadItem.quantity

      newItems[itemIndex].quantity -= quantityUsed

      const currentShip = ships.find((x) => x.id == state.ship) ?? ships[0]
      const shipEffects = getShipEffects(currentShip)
      let itemDuration = 30000
      for (let i = 0; i < shipEffects.length; i++) {
        const shipEffect = shipEffects[i]
        if (shipEffect.effect == EShipEffect.ITEM_DURATION) {
          itemDuration = Math.round(30000 * (1 + shipEffect.value / 100))
          break
        }
      }
      // If this item is already in use (if item.end is bigger timestamp than now) add the 30seconds * quantity to the previous planned end.
      // Otherwise, add it to the current time
      const timestampToAdd = itemDuration * quantityUsed
      const previousEnd = newItems[itemIndex].end ?? 0
      const now = new Date().getTime()
      const endTime = previousEnd && now < previousEnd ? previousEnd + timestampToAdd : now + timestampToAdd
      newItems[itemIndex].end = endTime

      return { ...state, items: newItems }
    }
    case ActionEnum.ShipUnlock: {
      if (action.payload?.ships === undefined) throw new Error(`Specify arg for : ${action.type}`)
      const payloadShips = action.payload?.ships

      const unlockedShips = state.unlockedShips

      // For every ship id in payload
      for (let i = 0; i < payloadShips.length; i++) {
        const ship = payloadShips[i]
        const owned = state.unlockedShips.find((x) => x == ship)
        // If not already unlocked ship, add it
        if (!owned) {
          unlockedShips.push(payloadShips[i])
        }
      }
      return { ...state, unlockedShips: unlockedShips }
    }
    case ActionEnum.ShipChange: {
      if (action.payload?.ships === undefined) throw new Error(`Specify arg for : ${action.type}`)
      const payloadShips = action.payload?.ships

      // If no payloadShip specified, do nothing
      if (!payloadShips[0]) {
        return state
      }

      const owned = state.unlockedShips.find((x) => x == payloadShips[0])
      // If not already unlocked ship, do nothing
      if (!owned) {
        return state
      }

      return { ...state, ship: payloadShips[0] }
    }
    case ActionEnum.Upgrade: {
      if (action.payload?.upgrade === undefined) throw new Error(`Specify arg for : ${action.type}`)
      const payloadUpgrade = action.payload?.upgrade

      // Copy the object to make update
      const newUpgrades = hardCopy(state.upgrades)
      const defaultUpgrade = defaultUpgrades[payloadUpgrade]
      if (newUpgrades[payloadUpgrade] === undefined || !defaultUpgrade) {
        return state
      }

      const upgrade = newUpgrades[payloadUpgrade]

      // if already max level, return state, do nothing
      if (upgrade.level + 1 > defaultUpgrade.maxLevel) {
        return state
      }
      const price = defaultUpgrade.prices[upgrade.level] * 1000
      // if user doesn't have enought berries, do nothing
      if (state.berries < price) {
        return state
      }
      upgrade.level += 1
      return { ...state, berries: state.berries - price, upgrades: newUpgrades }
    }
    case ActionEnum.TreasureGame_Upgrade: {
      if (action.payload?.treasureGameUpgrade === undefined) throw new Error(`Specify arg for : ${action.type}`)

      const currentUpgradeIndex = state.treasureGameUpgrades.findIndex((x) => x.id == action.payload?.treasureGameUpgrade)
      const dataUpgradeIndex = mineUpgradesList.findIndex((x) => x.id == action.payload?.treasureGameUpgrade)
      // If upgrade not found, return the current state - Do nothing
      if (currentUpgradeIndex == -1 || dataUpgradeIndex == -1) {
        return state
      }

      const currentUpgrade = state.treasureGameUpgrades[currentUpgradeIndex]
      const dataUpgrade = mineUpgradesList[dataUpgradeIndex]

      if (currentUpgrade.level + 1 > dataUpgrade.maximumLevel) {
        // Impossible - Maximum level already reached
        return state
      }
      if (state.berries < dataUpgrade.prices[currentUpgrade.level - 1]) {
        // Impossible - Not enought berries to pay the upgrade
        return state
      }
      const newUpgradeState = hardCopy(state.treasureGameUpgrades)
      newUpgradeState[currentUpgradeIndex].level = currentUpgrade.level + 1
      const newBerries = state.berries - dataUpgrade.prices[currentUpgrade.level - 1]
      return { ...state, berries: newBerries, treasureGameUpgrades: newUpgradeState }
    }
    case ActionEnum.TreasureGame_LootGem: {
      if (action.payload?.treasureGameGem === undefined) throw new Error(`Specify arg for : ${action.type}`)

      const currentGemIndex = state.treasureGameGems.findIndex((x) => x.id == action.payload?.treasureGameGem?.id)
      // If gem not found, return the current state - Do nothing
      if (currentGemIndex == -1) {
        return state
      }
      const currentGem = state.treasureGameGems[currentGemIndex]
      const newGemsState = hardCopy(state.treasureGameGems)
      newGemsState[currentGemIndex].count = currentGem.count + 1

      let currentGoal = state.currentGoal
      if (state.currentGoal && state.currentGoal.type == EGoalType.MINE_LOOT) {
        currentGoal = hardCopy(state.currentGoal)
        currentGoal.progressValue = state.currentGoal.progressValue + 1
      }
      return { ...state, treasureGameGems: newGemsState, currentGoal }
    }
    case ActionEnum.TreasureGame_BuyMarket: {
      if (action.payload?.treasureGameMarket === undefined) throw new Error(`Specify arg for : ${action.type}`)
      const marketList = getMarketList()
      const { id, currency, price, unit } = action.payload.treasureGameMarket
      const marketItemIndex = marketList.findIndex((x) => x.id == id && x.currency == currency && x.price == price)
      if (marketItemIndex == -1 || marketList[marketItemIndex].id != parseInt(unit.id)) {
        console.log("Impossible : Market item does not match ")
        return state
      }
      const finalPrice = price * (unit.stars + 1)
      if (state.treasureGameGems[currency].count < finalPrice) {
        console.log("Impossible : Not enought gems ")
        return state
      }

      console.log("BUYING FOR", finalPrice)
      // Check if user already own this card
      const owned = state.cards.find((x) => x.id == unit.id)
      // If he does, return the same state
      if (owned !== undefined) return state

      const newGemsState = hardCopy(state.treasureGameGems)
      newGemsState[currency].count -= finalPrice

      // If he doesn't, add the card to the state
      return { ...state, cards: [...state.cards, { ...unit, lootOrder: state.cards.length }], treasureGameGems: newGemsState }
      // return { ...state, treasureGameGems: newGemsState }
    }
    case ActionEnum.TreasureGame_UseEnergy: {
      if (action.payload?.treasureGameEnergyUsed === undefined) throw new Error(`Specify arg for : ${action.type}`)
      if (action.payload.treasureGameEnergyUsed && state.currentGoal && state.currentGoal.type == EGoalType.MINE_ENERGY) {
        let currentGoal = state.currentGoal
        currentGoal = hardCopy(state.currentGoal)
        currentGoal.progressValue = state.currentGoal.progressValue + action.payload.treasureGameEnergyUsed
        return { ...state, currentGoal }
      }
      break
    }
    case ActionEnum.Goal_SetCurrent: {
      if (action.payload?.goal === undefined) throw new Error(`Specify arg for : ${action.type}`)

      const { goal } = action.payload
      const found = goalsList.find((x) => x.id == goal)
      // If goal passed as argument is not a valid goal ID, do nothing
      if (!found) {
        return state
      }
      const goalHasBeenUnlocked = goalsList.find((x) => state.clearedGoals.includes(x.id) && x.unlockGoals.includes(goal))
      const notAlreadyDone = !state.clearedGoals.includes(goal)
      if ((notAlreadyDone && found.zoneId !== undefined && found.zoneId <= state.maxZoneId) || goalHasBeenUnlocked) {
        console.log("Goal is ok, set it as current")
        const progressValue = found.type == EGoalType.LOOT_VIVRECARD ? state.cards.filter((x) => x.zone == found.zoneId).length : 0
        const fillValue = found.type == EGoalType.LOOT_VIVRECARD ? allUnits.filter((x) => x.zone == found.zoneId).length : found.value
        return { ...state, currentGoal: { ...found, progressValue, value: fillValue } }
      } else {
        // console.log("ERROR : Goal cannot be set as current")
        // console.log("notAlreadyDone", notAlreadyDone)
        // console.log("found.zoneId !== undefined", found.zoneId !== undefined)
        // console.log("found.zoneId", found.zoneId, "state.maxZoneId", state.maxZoneId)
        // console.log("goalHasBeenUnlocked", goalHasBeenUnlocked)
        return state
      }
    }
    case ActionEnum.Goal_Claim: {
      const { currentGoal, cards } = state
      // If there is not current Goal, there is nothing to claim : Do nothing
      if (!currentGoal) {
        return state
      }
      // If currentGoal doesn't match with one goal of the goalList, there is a problem, do nothing
      const goal = goalsList.find((x) => state.currentGoal?.id == x.id)
      if (!goal) {
        return state
      }

      const progressValue = goal.type == EGoalType.LOOT_VIVRECARD ? cards.filter((x) => x.zone == goal.zoneId).length : currentGoal.progressValue
      const fillValue = goal.type == EGoalType.LOOT_VIVRECARD ? allUnits.filter((x) => x.zone == goal.zoneId).length : currentGoal.value

      if (progressValue >= fillValue) {
        switch (goal.rewardCurrency) {
          case EGoalRewardCurrency.Berry:
            return { ...state, berries: state.berries + goal.rewardAmount, currentGoal: null, clearedGoals: [...state.clearedGoals, goal.id] }

          case EGoalRewardCurrency.Cola:
            var index = state.items.findIndex((x) => x.itemKey == "cola")
            if (index == -1) {
              break
            }
            var newItems = hardCopy(state.items)
            newItems[index].quantity += goal.rewardAmount
            return { ...state, currentGoal: null, clearedGoals: [...state.clearedGoals, goal.id], items: newItems }

          case EGoalRewardCurrency.DemonFruit:
            var index = state.items.findIndex((x) => x.itemKey == "demonFruit")
            if (index == -1) {
              break
            }
            var newItems = hardCopy(state.items)
            newItems[index].quantity += goal.rewardAmount
            return { ...state, currentGoal: null, clearedGoals: [...state.clearedGoals, goal.id], items: newItems }

          case EGoalRewardCurrency.DendenMushi:
            var index = state.items.findIndex((x) => x.itemKey == "dendenmushi")
            if (index == -1) {
              break
            }
            var newItems = hardCopy(state.items)
            newItems[index].quantity += goal.rewardAmount
            return { ...state, currentGoal: null, clearedGoals: [...state.clearedGoals, goal.id], items: newItems }

          case EGoalRewardCurrency.HealFood:
            var index = state.items.findIndex((x) => x.itemKey == "healFood")
            if (index == -1) {
              break
            }
            var newItems = hardCopy(state.items)
            newItems[index].quantity += goal.rewardAmount
            return { ...state, currentGoal: null, clearedGoals: [...state.clearedGoals, goal.id], items: newItems }

          case EGoalRewardCurrency.LogPose:
            var index = state.items.findIndex((x) => x.itemKey == "logPose")
            if (index == -1) {
              break
            }
            var newItems = hardCopy(state.items)
            newItems[index].quantity += goal.rewardAmount
            return { ...state, currentGoal: null, clearedGoals: [...state.clearedGoals, goal.id], items: newItems }

          case EGoalRewardCurrency.Boat:
            var ship = goal.rewardAmount
            var owned = state.unlockedShips.find((x) => x == ship)
            // If not already unlocked ship, add it
            if (!owned) {
              return { ...state, unlockedShips: [...state.unlockedShips, ship], currentGoal: null, clearedGoals: [...state.clearedGoals, goal.id] }
            }
            break
          case EGoalRewardCurrency.VivreCard:
            const newCard = allUnits.find((x) => x.id == idNumberToString(goal.rewardAmount))
            if (newCard) {
              const owned = state.cards.find((x) => x.id == newCard.id)
              if (owned !== undefined) return state
              return {
                ...state,
                cards: [...state.cards, { ...newCard, lootOrder: state.cards.length }],
                currentGoal: null,
                clearedGoals: [...state.clearedGoals, goal.id],
              }
            }
            break
          case EGoalRewardCurrency.Crew:
            // To do
            break

          default:
            break
        }
      }
      return state
    }
    case ActionEnum.Unlock_Menu: {
      if (action.payload?.unlockMenu === undefined) throw new Error(`Specify arg for : ${action.type}`)
      const { unlockMenu } = action.payload

      let berryCost = 0
      const unlockStateCopy = hardCopy(state.menuUnlocks)

      if (unlockMenu.Shop && !state.menuUnlocks.Shop) {
        unlockStateCopy.Shop = true
        berryCost += menuUnlocksPrices.Shop
      }

      if (unlockMenu.Upgrades && !state.menuUnlocks.Upgrades) {
        unlockStateCopy.Upgrades = true
        berryCost += menuUnlocksPrices.Upgrades
      }

      if (unlockMenu.Mine && !state.menuUnlocks.Mine) {
        unlockStateCopy.Mine = true
        berryCost += menuUnlocksPrices.Mine
      }

      if (unlockMenu.Training && !state.menuUnlocks.Training) {
        unlockStateCopy.Training = true
        berryCost += menuUnlocksPrices.Training
      }

      if (state.berries >= berryCost) {
        return { ...state, menuUnlocks: unlockStateCopy, berries: state.berries - berryCost }
      }
      return state
    }
    case ActionEnum.Training_Unlock: {
      if (action.payload?.training === undefined) throw new Error(`Specify arg for : ${action.type}`)

      const { type, fleetUnitId } = action.payload.training

      // If xp boost
      if (type == "xp") {
        // If not already at maximum slots number
        if (state.training.XPBoost.maxSlots < XPBoostUnlockPrices.length) {
          // If player has enought berries to pay the upgrade
          if (XPBoostUnlockPrices[state.training.XPBoost.maxSlots - 1] && state.berries >= XPBoostUnlockPrices[state.training.XPBoost.maxSlots - 1]) {
            return {
              ...state,
              berries: state.berries - XPBoostUnlockPrices[state.training.XPBoost.maxSlots - 1],
              training: { ...state.training, XPBoost: { ...state.training.XPBoost, maxSlots: state.training.XPBoost.maxSlots + 1 } },
            }
          }
        }
      }

      // If Rayleigh
      if (type == "rayleigh") {
        // If not already at maximum slots number
        if (state.training.Rayleigh.maxSlots < RayleighUnlockPrices.length) {
          // If player has enought berries to pay the upgrade
          if (RayleighUnlockPrices[state.training.Rayleigh.maxSlots - 1] && state.berries >= RayleighUnlockPrices[state.training.Rayleigh.maxSlots - 1]) {
            return {
              ...state,
              berries: state.berries - RayleighUnlockPrices[state.training.Rayleigh.maxSlots - 1],
              training: { ...state.training, Rayleigh: { ...state.training.Rayleigh, maxSlots: state.training.Rayleigh.maxSlots + 1 } },
            }
          }
        }
      }
      // Just in case, return the actual state without update
      return state
    }
    case ActionEnum.Training_AddUnit: {
      if (action.payload?.training === undefined) throw new Error(`Specify arg for : ${action.type}`)

      const { type, fleetUnitId } = action.payload.training

      // If undefined fleetUnitId, do nothing
      if (!fleetUnitId) {
        return state
      }

      // If xp boost
      if (type == "xp") {
        const { maxSlots, fleetUnitIds } = state.training.XPBoost
        // if there is a free slot
        if (fleetUnitIds.length < maxSlots && maxSlots <= XPBoostUnlockPrices.length) {
          return {
            ...state,
            training: { ...state.training, XPBoost: { ...state.training.XPBoost, fleetUnitIds: [...state.training.XPBoost.fleetUnitIds, fleetUnitId] } },
          }
        }
      }

      // If Rayleigh
      if (type == "rayleigh") {
        const { maxSlots, fleetUnitIds } = state.training.Rayleigh
        // if there is a free slot
        if (fleetUnitIds.length < maxSlots && maxSlots <= RayleighUnlockPrices.length) {
          return {
            ...state,
            training: { ...state.training, Rayleigh: { ...state.training.Rayleigh, fleetUnitIds: [...state.training.Rayleigh.fleetUnitIds, fleetUnitId] } },
          }
        }
      }

      // Just in case, return the actual state without update
      return state
    }
    case ActionEnum.DungeonDone: {
      if (action.payload?.zoneId === undefined) throw new Error(`Specify arg for : ${action.type}`)

      const { zoneId } = action.payload

      let currentGoal = state.currentGoal
      if (state.currentGoal && state.currentGoal.type == EGoalType.CLEAR_DUNGEON && zoneId == state.currentGoal.zoneId) {
        currentGoal = hardCopy(state.currentGoal)
        currentGoal.progressValue = state.currentGoal.progressValue + 1
      }

      // If you cleared the dundeon of the last zone you can access to
      if (zoneId == state.maxZoneId) {
        const maxZone = zones[zones.length - 1].id
        const newMaxZone = zoneId < maxZone ? zoneId + 1 : maxZone

        const zone = zones.find((x) => x.id == zoneId)
        const cardsToAdd: ICardUnit[] = []
        const fleetToAdd: IFleetUnit[] = []
        const boatToAdd: number[] = []
        const crewToAdd: ICrewUnit[] = []
        let cardAddedCount = 0
        if (zone) {
          // Loot free Fleet members
          for (let i = 0; i < zone.freeMembers.length; i++) {
            const freeUnit = zone.freeMembers[i]
            const newCard = allUnits.find((x) => x.id == freeUnit)
            if (newCard) {
              const owned = state.cards.find((x) => x.id == newCard.id)
              if (!owned) {
                cardsToAdd.push({ ...newCard, lootOrder: state.cards.length + cardAddedCount })
                fleetToAdd.push({
                  id: state.fleet.length + cardAddedCount,
                  unit: newCard,
                  level: 1,
                  xp: 0,
                  hp: getMaximumHP({ id: state.fleet.length, unit: newCard, hp: 0, xp: 0, level: 1 }),
                })
                // Add to crew if possible
                if (state.crew.length + cardAddedCount < maximumCrewMember) {
                  crewToAdd.push({ fleetId: state.fleet.length + cardAddedCount, isCaptain: false })
                }
                // Increment goal progress value if goal is Loot vivre card and zone is the unit looted
                if (state.currentGoal && state.currentGoal.type == EGoalType.LOOT_VIVRECARD && newCard.zone == state.currentGoal.zoneId) {
                  currentGoal = hardCopy(state.currentGoal)
                  currentGoal.progressValue = state.currentGoal.progressValue + 1
                }
                cardAddedCount += 1
              }
            }
          } // End for

          // Loot free Boat
          for (let i = 0; i < zone.freeBoat.length; i++) {
            const boatId = zone.freeBoat[i]
            const owned = state.unlockedShips.find((x) => x == boatId)
            // If not already unlocked ship, add it
            if (!owned) {
              boatToAdd.push(boatId)
            }
          } // End for
        } // End if zone
        console.log(cardsToAdd, fleetToAdd, crewToAdd, boatToAdd)
        return {
          ...state,
          maxZoneId: newMaxZone,
          currentGoal,
          cards: [...state.cards, ...cardsToAdd],
          fleet: [...state.fleet, ...fleetToAdd],
          crew: [...state.crew, ...crewToAdd],
          unlockedShips: [...state.unlockedShips, ...boatToAdd],
        }
      }

      return { ...state, currentGoal }
    }
    case ActionEnum.KilledEnemy: {
      if (action.payload?.zoneId === undefined) throw new Error(`Specify arg for : ${action.type}`)

      const { zoneId } = action.payload

      let currentGoal = state.currentGoal
      if (state.currentGoal && state.currentGoal.type == EGoalType.KILL_ENEMIES && zoneId == state.currentGoal.zoneId) {
        currentGoal = hardCopy(state.currentGoal)
        currentGoal.progressValue = state.currentGoal.progressValue + 1
      }
      return { ...state, currentGoal }
    }
    case ActionEnum.Import: {
      if (!action.payload) throw new Error(`Need valid state : ${action.type}`)

      // const newState: State = {
      //   instance: EInstance.Zone,
      //   berries: action.payload.berriesChange ?? 0,
      //   cards: [],
      //   fleet: [],
      //   crew: [],
      // }
      return state
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
  return state
}

function GameProvider({ children }: GameProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, baseState)
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch }

  return <GameStateContext.Provider value={value}>{children}</GameStateContext.Provider>
}

function useGameState() {
  const context = useContext(GameStateContext)
  if (context === undefined) {
    throw new Error("useGameState must be used within a GameProvider")
  }
  return context
}

export { GameProvider, useGameState }
