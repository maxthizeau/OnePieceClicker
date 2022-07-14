import { useState } from "react"
import { TUnit } from "../types"
import { useGameState } from "./GameContext"
import useInterval from "./useInterval"

const baseData: TUnit[] = require("../../lib/data/units.json")

const useUnitData = () => {
  const gameState = useGameState()
  const [data, _] = useState(baseData)

  const orderByStars = (): { stars: number; units: TUnit[] }[] => {
    const newData: { stars: number; units: TUnit[] }[] = []
    for (let i = 1; i <= 6; i++) {
      const rariryFilteredData = data.filter((x) => x.stars == i)
      newData.push({ stars: i, units: rariryFilteredData })
    }
    return newData
  }

  const dataByRarity = orderByStars()

  return [data, dataByRarity] as const
}

export default useUnitData
