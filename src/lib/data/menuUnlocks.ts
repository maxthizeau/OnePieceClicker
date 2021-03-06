export interface IMenuUnlockState {
  Shop: boolean
  Upgrades: boolean
  Mine: boolean
  Training: boolean
}
export interface IMenuUnlockPayload {
  Shop?: boolean
  Upgrades?: boolean
  Mine?: boolean
  Training?: boolean
}

export const menuUnlocksPrices = {
  Shop: 2500,
  Upgrades: 7500000,
  Mine: 15000000,
  Training: 200000000,
}

export const defaultMenuUnlockState: IMenuUnlockState = {
  Shop: false,
  Upgrades: false,
  Mine: false,
  Training: false,
}

export const XPBoostUnlockPrices = [0, 2000000000, 50000000000]
export const RayleighUnlockPrices = [0, 10000000000, 200000000000]
