import useTranslation from "next-translate/useTranslation"
import { defaultItemsList, TItemKey } from "../data/items"
import { defaultUpgrades } from "../data/upgrades"
import { zones } from "../data/zones"
import { ActionEnum, useGameState } from "./GameContext"
import { ELogType, useLogs } from "./useLogs"

const useItems = () => {
  const gameState = useGameState()
  const { items } = gameState.state

  const { addLog } = useLogs()
  const { t } = useTranslation("notifications")

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
    // If item is heal, upgrade increases its price
    const upgradeBoostPrice = Math.pow(defaultUpgrades.Heal.valuePerLevel, gameState.state.upgrades.Heal.level)
    const priceWithQuantity = itemKey == "healFood" ? Math.round(item.price * upgradeBoostPrice * Math.floor(quantity)) : item.price * Math.floor(quantity)
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
        title: t("notifications:warning.title-not-enough-berries"),
        message: t("notifications:warning.message-not-enough-berries-to-buy-at-shop"),
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
        title: t("notifications:warning.title-cannot-enter-dungeon"),
        message: t("notifications:warning.message-cannot-enter-dungeon"),
        type: "warning",
      })
      return false
    } else {
      spendItem("logPose", zone.dungeonCost)
      callback && callback()
      return true
    }
  }

  const replaceHealDescriptionWithValue = (desc: string): string => {
    const baseHealValue = 100
    const upgradeBoost = Math.pow(defaultUpgrades.Heal.valuePerLevel, gameState.state.upgrades.Heal.level)
    const healingValue = Math.floor(baseHealValue * upgradeBoost)

    return desc.replace("$_VALUE_$", healingValue.toString())
  }

  return { items, addItem, buyItem, spendItem, isItemActive, enterDungeon, replaceHealDescriptionWithValue } as const
}

export default useItems
