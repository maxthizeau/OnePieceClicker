export interface IMineUpgrade {
  id: ETreasureGameUpgrades
  title: string
  subtitle: string
  icon: string
  maximumLevel: number
  prices: number[]
}

export enum ETreasureGameUpgrades {
  VISION,
  BOMB_RADIUS,
  SCAN_RADIUS,
  SCAN_PRECISION,
  MOVE_COST,
  PICKAXE_COST,
  BOMB_COST,
  SCAN_COST,
  GEMS,
  ENERGY_REFILL,
  ENERGY_MAX,
}

export const defaultTreasureGameUpgradeState = [
  { id: ETreasureGameUpgrades.VISION, level: 1 },
  { id: ETreasureGameUpgrades.BOMB_RADIUS, level: 1 },
  { id: ETreasureGameUpgrades.SCAN_RADIUS, level: 1 },
  { id: ETreasureGameUpgrades.SCAN_PRECISION, level: 1 },
  { id: ETreasureGameUpgrades.MOVE_COST, level: 1 },
  { id: ETreasureGameUpgrades.PICKAXE_COST, level: 1 },
  { id: ETreasureGameUpgrades.BOMB_COST, level: 1 },
  { id: ETreasureGameUpgrades.SCAN_COST, level: 1 },
  { id: ETreasureGameUpgrades.GEMS, level: 1 },
  { id: ETreasureGameUpgrades.ENERGY_REFILL, level: 1 },
  { id: ETreasureGameUpgrades.ENERGY_MAX, level: 1 },
]

export const possibleGems = ["bronze-ingot", "gold-ingot", "silver-ingot", "pink-crystal", "granit", "crystal", "amethyst", "amber", "emerald", "diamond"]

export const getDefaultTreasureGameGemsState = () => {
  const gemsState: { id: string; count: number }[] = []
  for (let i = 0; i < possibleGems.length; i++) {
    const gem = possibleGems[i]
    gemsState.push({ id: gem, count: 0 })
  }
  return gemsState
}

export const mineUpgradesList: IMineUpgrade[] = [
  {
    id: ETreasureGameUpgrades.VISION,
    title: "Vision",
    subtitle: "Increase your field of vue.",
    icon: "images/icons/binocularIcon.png",
    maximumLevel: 3,
    prices: [2000000000, 50000000000],
  },
  {
    id: ETreasureGameUpgrades.BOMB_RADIUS,
    title: "Bomb Radius",
    subtitle: "Increases bomb explosion size",
    icon: "images/icons/bombIcon.png",
    maximumLevel: 3,
    prices: [500000000, 10000000000],
  },
  {
    id: ETreasureGameUpgrades.SCAN_RADIUS,
    title: "Scan Radius",
    subtitle: "Increases scan size",
    icon: "images/icons/sonarIcon.png",
    maximumLevel: 3,
    prices: [250000000, 2500000000],
  },
  {
    id: ETreasureGameUpgrades.SCAN_PRECISION,
    title: "Scan Precision",
    subtitle: "Makes the scanner more accurate and reduces the number of false positives    ",
    icon: "images/icons/sonarPrecisionIcon.png",
    maximumLevel: 10,
    prices: [1000000, 10000000, 100000000, 1000000000, 2000000000, 5000000000, 10000000000, 2000000000, 5000000000],
  },

  {
    id: ETreasureGameUpgrades.MOVE_COST,
    title: "Move Cost",
    subtitle: "Reduce the energy cost of moving your character by 1",
    icon: "images/icons/moveMinusEnergyIcon.png",
    maximumLevel: 4,
    prices: [10000000, 1000000000, 1000000000000],
  },
  {
    id: ETreasureGameUpgrades.PICKAXE_COST,
    title: "Pickaxe Cost",
    subtitle: "Reduce the energy cost of using the pickaxe by 1",
    icon: "images/icons/pickaxeMinusEnergyIcon.png",
    maximumLevel: 5,
    prices: [50000000, 200000000, 1000000000, 100000000000],
  },

  {
    id: ETreasureGameUpgrades.BOMB_COST,
    title: "Bomb Cost",
    subtitle: "Reduce the energy cost of using the bomb by 2",
    icon: "images/icons/bombMinusEnergyIcon.png",
    maximumLevel: 10,
    prices: [10000000, 100000000, 500000000, 1000000000, 5000000000, 15000000000, 100000000000, 500000000000, 1500000000000],
  },

  {
    id: ETreasureGameUpgrades.SCAN_COST,
    title: "Scan Cost",
    subtitle: "Reduce the energy cost of using the scan by 2",
    icon: "images/icons/sonarMinusEnergyIcon.png",
    maximumLevel: 10,
    prices: [10000000, 100000000, 500000000, 1000000000, 5000000000, 15000000000, 100000000000, 500000000000, 1500000000000],
  },

  {
    id: ETreasureGameUpgrades.GEMS,
    title: "Gems",
    subtitle: "Increase the number of gems in every level",
    icon: "images/treasure-game/gems/diamond.png",
    maximumLevel: 10,
    prices: [10000000, 100000000, 500000000, 1000000000, 5000000000, 15000000000, 100000000000, 500000000000, 1500000000000],
  },

  {
    id: ETreasureGameUpgrades.ENERGY_REFILL,
    title: "Energy Refill",
    subtitle: "Increase the amount of energy you refill every 30 seconds",
    icon: "images/icons/energyRefillcon.png",
    maximumLevel: 10,
    prices: [10000000, 100000000, 500000000, 1000000000, 5000000000, 15000000000, 100000000000, 500000000000, 1500000000000],
  },
  {
    id: ETreasureGameUpgrades.ENERGY_MAX,
    title: "Maximum energy",
    subtitle: "Increase the maximum energy",
    icon: "images/icons/energyMaxIcon.png",
    maximumLevel: 10,
    prices: [10000000, 100000000, 500000000, 1000000000, 5000000000, 15000000000, 100000000000, 500000000000, 1500000000000],
  },
]
