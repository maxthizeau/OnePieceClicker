export type TUpgradeItem = {
  level: number
  maxLevel: number
  valuePerLevel: number
  prices: number[] // in k (1 -> 1000 berries)
}

export type TUpgrade = {
  ClickPower: TUpgradeItem
  CrewPower: TUpgradeItem
  LootChance: TUpgradeItem
  XP: TUpgradeItem
  Berry: TUpgradeItem
  Heal: TUpgradeItem
  // AutoHeal: TUpgradeItem
  // AutoRecruit: TUpgradeItem
  CrewMembers: TUpgradeItem
}
export const defaultUpgrades: TUpgrade = {
  ClickPower: {
    level: 0,
    maxLevel: 8,
    valuePerLevel: 2,
    prices: [100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000],
  },
  CrewPower: {
    level: 0,
    maxLevel: 8,
    valuePerLevel: 2,
    prices: [100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000],
  },
  LootChance: {
    level: 0,
    maxLevel: 8,
    valuePerLevel: 1.1,
    prices: [100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000],
  },
  XP: {
    level: 0,
    maxLevel: 8,
    valuePerLevel: 1.1,
    prices: [100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000],
  },
  Berry: {
    level: 0,
    maxLevel: 8,
    valuePerLevel: 1.1,
    prices: [100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000],
  },
  Heal: {
    level: 0,
    maxLevel: 8,
    valuePerLevel: 1.5,
    prices: [100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000],
  },
  //     AutoHeal: {
  //         level: 0,
  //         maxLevel:1,
  //         valuePerLevel:1,
  //         prices: [ 10000000 ]
  //   },
  //     AutoRecruit: {
  //         level: 0,
  //         maxLevel:1,
  //         valuePerLevel:1,
  //         prices: [ 10000000 ]
  //   },

  CrewMembers: {
    level: 0,
    maxLevel: 5,
    valuePerLevel: 1,
    prices: [1000, 10000, 100000, 1000000, 5000000],
  },
}
