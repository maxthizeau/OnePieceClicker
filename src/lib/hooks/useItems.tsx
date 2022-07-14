import { useEffect } from "react"
import { defaultItemsList, TItemKey } from "../data/items"
import { TZone, zones } from "../data/zones"
import { ActionEnum, useGameState } from "./GameContext"
import { ELogType, useLogs } from "./useLogs"

const useItems = () => {
  const gameState = useGameState()
  const { items } = gameState.state
  const { addLog } = useLogs()

  const addItem = (itemKey: TItemKey, quantity: number) => {
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
  const buyItem = (itemKey: TItemKey, quantity: number): boolean => {
    const item = defaultItemsList.find((x) => x.itemKey == itemKey)
    if (!item) {
      return false
    }
    const priceWithQuantity = item.price * Math.floor(quantity)
    if (gameState.state.berries >= priceWithQuantity) {
      gameState.dispatch({
        type: ActionEnum.AddItem,
        payload: {
          item: {
            key: itemKey,
            quantity: Math.floor(quantity),
          },
          berriesChange: priceWithQuantity,
        },
      })
      return true
    } else {
      addLog({
        id: `buyItem-${itemKey}-${quantity}`,
        logTypes: [ELogType.Clicker],
        notification: true,
        title: "Not enough berries",
        message: "Reduce the quantity or come back when you have enough berries",
        type: "warning",
      })
      return false
    }
  }

  const spendItem = (itemKey: TItemKey, quantity: number) => {
    gameState.dispatch({
      type: ActionEnum.UseItem,
      payload: {
        item: { key: itemKey, quantity },
      },
    })
  }

  const isItemActive = (itemKey: TItemKey): boolean => {
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

  return { items, addItem, buyItem, spendItem, isItemActive, enterDungeon } as const
}

export default useItems
