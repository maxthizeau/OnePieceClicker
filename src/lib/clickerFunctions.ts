import { zones } from "./data/zones"
import { ICrewUnit, IFleetUnit } from "./hooks/GameContext"
import { ECaptainEffect, EShipEffect, IShip, TCaptainBoost, TCurrentUnit, TUnit } from "./types"
import { hardCopy } from "./utils"

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

export function idNumberToString(n: number): string {
  return ("000" + n).slice(-4)
}

export function numberTo3DigitString(n: number): string {
  // 1515 should return "500"
  var s = "00" + n
  return s.substring(s.length - 3)
}

export function getFullImageSrc(id: string): string {
  const round3FirstDigit = id.charAt(1) + "00"
  return `images/units/full/transparent/${id.charAt(0)}/${round3FirstDigit}/${id}.png`
}
export function getThumbImageSrc(id: string): string {
  const round3FirstDigit = id.charAt(1) + "00"
  return `images/units/thumbnail/jap/${id.charAt(0)}/${round3FirstDigit}/${id}.png`
}

// export function getMaxHPOfUnit(unit: TUnit): number {
//   // console.log(JSON.stringify(unit, null, 4))
//   return unit.HPLvlMax * (unit.RCVLvlMax + 1) * (unit.slots + 1 + unit.stars)
// }

export function intWithSpaces(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

export function filterUnitsByZone(units: TUnit[], zoneId: number): TUnit[] {
  return units.filter((x) => x.zone == zoneId)
}

export function getNextUnitByRarity(units: TUnit[]): TUnit {
  // Build an array with x time the index of an element, x is the stars
  // units[2].stars = 4 --> Rarity = 7-4 = 3 --> array = [2,2,2]
  // units[3].stars = 5 --> Rarity = 7-5 = 2 --> array = [2,2,2,3,3]

  const arrayWithRarity = []

  for (let i = 0; i < units.length; i++) {
    const unit = units[i]
    if (!unit.isBoss) {
      const reversedRarity = 7 - unit.stars
      const arr = new Array(reversedRarity).fill(i)
      arrayWithRarity.push(...arr)
    }
  }
  // console.log(units)

  return units[arrayWithRarity[getRandomInt(arrayWithRarity.length)]]
}

export function getDungeonUnits(allUnits: TUnit[], zoneId: number): TUnit[] {
  const unitsPerDungeon = 10
  const zoneUnits = allUnits.filter((x) => x.zone == zoneId)
  // Make a hard copy, not only reference (since we modify hp)
  const zoneUnitsCopy: TUnit[] = JSON.parse(JSON.stringify(zoneUnits))
  const zone = zones[zoneId]

  const dungeonUnits: TUnit[] = []
  let totalATKLvlMax = 0
  let totalMaxLvl = 0
  for (let i = 0; i < unitsPerDungeon; i++) {
    const nextUnit = JSON.parse(JSON.stringify(getNextUnitByRarity(zoneUnitsCopy)))
    nextUnit.clickerMaxHP = Math.round(nextUnit.clickerMaxHP * 1.5)
    totalATKLvlMax += nextUnit.ATKLvlMax
    totalMaxLvl += nextUnit.maxLvl
    dungeonUnits.push(nextUnit)
  }

  const randomBoss = getRandomInt(zone.bosses.length)
  // console.log("randomBoss", zone.bosses.length, randomBoss)
  const boss = allUnits.find((u) => u.id == zone.bosses[randomBoss])
  if (boss) {
    // console.log("BOSS FOUND : ", boss.id)
    const bossCopy = hardCopy(boss)
    bossCopy.clickerMaxHP = Math.round(boss.clickerMaxHP * 3)
    bossCopy.ATKLvlMax = Math.round((totalATKLvlMax / unitsPerDungeon) * 1.5)
    bossCopy.maxLvl = Math.round((totalMaxLvl / unitsPerDungeon) * 1.5)
    dungeonUnits.push(bossCopy)
  } else {
    // console.log("BOSS NOT FOUND")
  }

  return dungeonUnits
}

export function getPriceUnit(unit: TUnit) {
  const { HPLvlMax, ATKLvl1, ATKLvlMax, cost, stars, maxLvl, zone, isBoss } = unit
  // return Math.round((ATKLvl1 * 10 + HPLvlMax) * 5 * maxLvl * (cost / 10) * stars * 20)

  const starsMultiplier = stars / 6 + 1
  let price = Math.round((ATKLvlMax + HPLvlMax + cost * 100) * (maxLvl / 100) * (zone * 2 + 1) * 100 * starsMultiplier) * 30
  price = isBoss ? price * 30 : price
  if (zone == 0) {
    return Math.round(price / 10)
  }

  return price
}
export function getBerryRewardFromUnit(unit: TUnit) {
  const { HPLvlMax, ATKLvlMax, ATKLvl1, cost, stars, maxLvl, zone } = unit
  // return Math.round(((ATKLvl1 + HPLvlMax) * (maxLvl / 100) * cost) / 10)
  const starsMultiplier = stars / 6 + 1
  return Math.round((ATKLvlMax + HPLvlMax) * (maxLvl / 100) * (zone + 1) * 100 * starsMultiplier)
}

export function getUnitAttackPower(unit: TUnit, level: number, trainingCount: number = 0) {
  const { ATKLvlMax, stars, maxLvl, ATKLvl1 } = unit

  // const atkPower = Math.round(ATKLvlMax + ((ATKLvlMax * stars) / (100 - maxLvl + 1)) * fleetUnit.level)
  // const steps = Math.round((ATKLvlMax) / (100 - maxLvl + 1))

  const steps = Math.round((ATKLvlMax * (maxLvl / 100)) / 10) + 1

  // console.log(ATKLvlMax, ATKLvl1, maxLvl)
  // (313/30)/100
  const atkPower = Math.round(steps * level) + level
  const tenPercent = atkPower / 10
  const finalAtk = Math.round(atkPower + tenPercent * trainingCount)
  return finalAtk
}

export function getMaximumXP(level: number): number {
  const baseXP = 300
  const divide = level / 120
  return level * baseXP * divide
}
export function getMaximumHP(unit: TUnit, level: number): number {
  const { HPLvlMax, maxLvl } = unit
  // const steps = Math.round(HPLvlMax / (100 - maxLvl + 1)) + 1
  const steps = Math.round((HPLvlMax * (maxLvl / 100)) / 10) + 1
  return level * steps + 100 - level
}

export function getXPGainFromUnit(currentUnit: TCurrentUnit): number {
  // const costZoneMultipler = ((1 + (currentUnit.unit.cost + 1) * (currentUnit.unit.zone + 1)) * currentUnit.unit.maxLvl) / 100
  // const calcul = costZoneMultipler * (1 + currentUnit.unit.stars / 20) + (currentUnit.unit.clickerMaxHP / 1000000) * 8
  // const multipler = 1
  // const multipler = 100 - currentUnit.unit.zone * 3

  // const calcul = (currentUnit.unit.cost + 1) * (1 + currentUnit.unit.stars / 20) + (currentUnit.unit.clickerMaxHP / 1000000) * 8
  // const multiplier = 10
  // return calcul * multiplier

  return (currentUnit.unit.zone * 1.5 + 1) * 75
}

export function getHPLossFromUnit(currentUnit: TCurrentUnit): number {
  // const divide = 30 - currentUnit.unit.zone <= 1 ? 1 : 30 - currentUnit.unit.zone
  // return Math.round(currentUnit.unit.ATKLvlMax / divide)

  const { ATKLvlMax, maxLvl, zone } = currentUnit.unit
  // Zone 0 is tutorial -> No Atk
  if (zone == 0) {
    return 0
  }
  return Math.round(ATKLvlMax * (maxLvl / 100)) + zone
}

export function toLocaleString2Digit(arg: number): string {
  return arg.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })
}

export function getMaximumTrainingXP(unit: TUnit): number {
  const { RCVLvlMax } = unit
  const maximumTrainingXP = (Math.abs(RCVLvlMax) + 500) * 100

  return maximumTrainingXP
}

export function timestampToString(timestamp: number): string {
  var days = Math.floor(timestamp / (1000 * 60 * 60 * 24))
  var hours = Math.floor((timestamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  var minutes = Math.floor((timestamp % (1000 * 60 * 60)) / (1000 * 60))
  var seconds = Math.floor((timestamp % (1000 * 60)) / 1000)

  if (days > 0) {
    return `${days}d`
  }
  if (hours > 0) {
    return `${toLocaleString2Digit(hours)}h`
  }
  return `${toLocaleString2Digit(minutes)}:${toLocaleString2Digit(seconds)}`
}

function captainEffectToString(value: number, effect: ECaptainEffect): string {
  let str = `+${value}% `

  switch (effect) {
    case ECaptainEffect.CREW_POWER:
      str += `Crew Power`
      break
    case ECaptainEffect.CLICK_POWER:
      str += `Click Power`
      break
    case ECaptainEffect.LOOT_CHANCE:
      str += `Vivre Card loot chance`
      break
    case ECaptainEffect.BERRY:
      str += `Berries earned`
      break
    case ECaptainEffect.XP:
      str += `XP`
      break
    default:
      str += `unknown`
      break
  }

  return str
}

export function getCaptainEffect(unit: TUnit): TCaptainBoost[] {
  const effects: TCaptainBoost[] = []

  const value = (30 * unit.cost) / 100 / (0.5 * (unit.type.length + 1))
  for (let i = 0; i < unit.type.length; i++) {
    const type = unit.type[i]
    let effect: ECaptainEffect
    switch (type) {
      case "STR":
        effect = ECaptainEffect.CREW_POWER

        break
      case "QCK":
        effect = ECaptainEffect.CLICK_POWER

        break
      case "DEX":
        effect = ECaptainEffect.LOOT_CHANCE

        break
      case "PSY":
        effect = ECaptainEffect.BERRY

        break
      case "INT":
        effect = ECaptainEffect.XP

        break

      default:
        effect = ECaptainEffect.CLICK_POWER
        break
    }
    effects.push({
      effect,
      value,
      toString: captainEffectToString(value, effect),
    })
  }

  return effects
}

export function getCrewCaptain(crew: ICrewUnit[], fleet: IFleetUnit[]): TCaptainBoost[] | null {
  for (let i = 0; i < crew.length; i++) {
    const crewUnit = crew[i]
    if (crewUnit.isCaptain) {
      const fleetUnit = fleet.find((x) => x.id == crewUnit.fleetId)
      if (!fleetUnit) continue
      return getCaptainEffect(fleetUnit.unit)
    }
  }
  return null
}

type TShipFinalEffect = { effect: EShipEffect; value: number; toString: string }

export function getShipEffects(ship: IShip) {
  const shipEffects = ship.effect

  const finalEffects: TShipFinalEffect[] = []
  // effectValue = % of efficacity of the max value
  const effectValue = ship.value / (0.5 * (ship.effect.length + 1))
  for (let i = 0; i < shipEffects.length; i++) {
    // maxValue = % increase
    let maxValue = 50
    let toString = ""
    switch (shipEffects[i]) {
      case EShipEffect.CREW_POWER:
        maxValue = 50
        toString = "crew-power"
        break
      case EShipEffect.CLICK_POWER:
        maxValue = 50
        toString = "click-power"
        break
      case EShipEffect.LOOT_CHANCE:
        maxValue = 30
        toString = "vivre-card"
        break
      case EShipEffect.XP_GAIN:
        maxValue = 30
        toString = "xp-boost"
        break
      case EShipEffect.BERRY:
        maxValue = 30
        toString = "berries"
        break
      case EShipEffect.CAPTAIN_BOOST:
        maxValue = 200
        toString = "captain-boost"
        break
      case EShipEffect.MINE_ENERGY:
        maxValue = 50
        toString = "energy-refill-speed"
        break
      case EShipEffect.MINE_DOUBLELOOT_CHANCE:
        maxValue = 50
        toString = "double-loot-mine"
        break
      case EShipEffect.TRAINING_SPEED:
        maxValue = 30
        toString = "rayleigh-training-speed"
        break
      case EShipEffect.ITEM_DURATION:
        maxValue = 50
        toString = "item-duration"
        break

      default:
        break
    }
    const finalValue = Math.round((maxValue / 100) * effectValue)
    // const finalToString = `${toString} : + ${finalValue} %`
    const effect: TShipFinalEffect = { effect: shipEffects[i], value: finalValue, toString }
    finalEffects.push(effect)
  }

  return finalEffects
}
