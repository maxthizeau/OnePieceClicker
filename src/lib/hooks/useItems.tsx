import { useEffect } from "react"
import { ActionEnum, useGameState } from "./GameContext"

export type TItemKey = "logPoses" | "demonFruits" | "healFood" | "cola" | "dendenmushi"

const useItems = () => {
  const gameState = useGameState()
  const { items } = gameState.state

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

  const useItem = (itemKey: string, quantity: number) => {
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

  return { items, addItem, useItem, isItemActive } as const
}

export default useItems
