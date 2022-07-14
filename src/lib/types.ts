export type TUnit = {
  id: string
  name: string
  type: string[]
  class: string[]
  stars: number
  cost: number
  combo: number
  slots: number
  maxLvl: number
  XPMax: number
  HPLvl1: number
  ATKLvl1: number
  RCVLvl1: number
  HPLvlMax: number
  ATKLvlMax: number
  RCVLvlMax: number
  clickerMaxHP: number
  zone: number
  isBoss: boolean
}

export interface IDungeonState {
  state: "inprogress" | "lost" | "victory"
  isDungeon: boolean
  dungeonUnits: TUnit[]
  currentUnitIndex: number
  farmMode: boolean
  alreadyClearedOnce: boolean
}

export enum ECaptainEffect {
  CREW_POWER,
  CLICK_POWER,
  LOOT_CHANCE,
  BERRY,
  XP,
}

export type TCaptainBoost = {
  effect: ECaptainEffect
  value: number
  toString: string
}

export enum EShipEffect {
  CREW_POWER,
  CLICK_POWER,
  LOOT_CHANCE,
  XP_GAIN,
  BERRY,
  CAPTAIN_BOOST,
  MINE_ENERGY,
  MINE_DOUBLELOOT_CHANCE,
  TRAINING_SPEED, // TODO
  ITEM_DURATION,
}

export interface IShip {
  id: number
  name: string
  thumb: string
  effect: EShipEffect[]
  value: number
}

export type TCurrentUnit = {
  unit: TUnit
  hp: number
}

export enum EGoalRewardCurrency {
  Berry,
  LogPose,
  Cola,
  HealFood,
  DemonFruit,
  DendenMushi,
  VivreCard,
  Crew,
  Boat,
}

export enum EGoalType {
  CLEAR_DUNGEON, // value : zoneId
  KILL_ENEMIES, // value: number of enemy to kill
  LOOT_VIVRECARD, // value: none (loot every card of a zone)
  MINE_LOOT, // value : number of gems to loot
  MINE_ENERGY, // value: number of energy to use
}

export type TGoal = {
  id: number
  type: EGoalType
  value: any
  rewardAmount: number
  rewardCurrency: EGoalRewardCurrency
  zoneId?: number // Zone where GoalType takes place
  unlockGoals: number[]
}

export interface ICurrentGoal extends TGoal {
  progressValue: number
}

export type TTypeTraining = "xp" | "rayleigh"
