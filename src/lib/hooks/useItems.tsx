import { useEffect } from "react"
import { TZone, zones } from "../data/zones"
import { ActionEnum, useGameState } from "./GameContext"
import { ELogType, useLogs } from "./useLogs"

export type TItemKey = "logPoses" | "demonFruits" | "healFood" | "cola" | "dendenmushi"

const useItems = () => {
  const gameState = useGameState()
  const { items } = gameState.state
  const { addLog } = useLogs()
  // const [itemsWithQty]
  // items.find((x) => x.itemKey ==)

  // useEffect(() => {

  // }, [])

  const addItem = (itemKey: string, quantity: number) => {
    gameState.dispatch({
      type: ActionEnum.AddItem,
      payload: {
        item: {
          key: itemKey,
          quantity,
        },
      },
    })
  }

  const spendItem = (itemKey: string, quantity: number) => {
    gameState.dispatch({
      type: ActionEnum.UseItem,
      payload: {
        item: { key: itemKey, quantity },
      },
    })
  }

  const isItemActive = (itemKey: string): boolean => {
    const itemFound = items.find((x) => x.itemKey == itemKey)
    const now = new Date().getTime()
    if (!itemFound?.end) return false
    return itemFound.end >= now
  }

  const enterDungeon = (zoneId: number, callback?: () => void): boolean => {
    const zone = zones.find((x) => x.id == zoneId)
    if (!zone) {
      return false
    }
    const now = new Date().getTime()
    const logPose = items.find((x) => x.itemKey == "logPose")
    console.log("Enter dungeon")
    console.log("Spend : ", zone.dungeonCost)
    console.log("Zone Loc : ", zone.location)
    console.log("Zone  ID: ", zone.id)
    if (!logPose || logPose.quantity < zone.dungeonCost) {
      addLog({
        id: `enterDungeon-${zone.id}-${now}`,
        logTypes: [ELogType.Clicker],
        notification: true,
        title: "Unable to enter the dungeon",
        message: "You need more Log Poses to enter, you can buy some in the shop.",
        type: "warning",
      })
      return false
    } else {
      spendItem("logPose", zone.dungeonCost)
      callback && callback()
      return true
    }
  }

  return { items, addItem, spendItem, isItemActive, enterDungeon } as const
}

export default useItems
