import { ECaptainEffect, EShipEffect, TUnit } from "../types"
import { ActionEnum, useGameState, ICardUnit } from "./GameContext"
import { Store } from "react-notifications-component"
import CardLootNotification from "../../components/Global/notifications/UnitNotification"
import { getPriceUnit, getMaximumHP } from "../clickerFunctions"
import useFleet from "./useFleet"
import useShip from "./useShip"
import useItems from "./useItems"
import { useLogs, ELogType } from "./useLogs"
import useTranslation from "next-translate/useTranslation"

type TResponse = {
  success: boolean
  title?: string
  message?: string
}

function lootChance(stars: number): number {
  switch (stars) {
    case 1:
      return 33
    case 2:
      return 20
    case 3:
      return 10
    case 4:
      return 5
    case 5:
      return 3
    case 6:
      return 1
    default:
      return 0
  }
}

const useCards = () => {
  const gameState = useGameState()
  const { getCaptainBoost } = useFleet().crewFunctions
  const { getShipBoost } = useShip()
  const { isItemActive } = useItems()
  const { addLog } = useLogs()
  const { t } = useTranslation("notifications")

  const cards = gameState.state.cards

  const loot = (card: TUnit): boolean => {
    const captainEffect = getCaptainBoost(ECaptainEffect.LOOT_CHANCE)
    const shipBoost = getShipBoost(EShipEffect.LOOT_CHANCE)
    const alreadyLooted = gameState.state.cards.find((x) => x.id == card.id) !== undefined
    if (alreadyLooted) {
      return false
    }
    const rand = Math.round(Math.random() * 100)

    const boostTutorialZone = card.zone == 0 ? 3 : 1
    const upgradeBoost = Math.pow(gameState.state.upgrades.LootChance.valuePerLevel, gameState.state.upgrades.LootChance.level)
    const itemBoost = isItemActive("dendenmushi") ? 1.2 : 1
    const lootPercent = lootChance(card.stars) * captainEffect * shipBoost * upgradeBoost * itemBoost * boostTutorialZone
    // console.log("LOOT Log : ")
    // console.log("Unit Rarity : ", card.stars)
    // console.log("rand : ", rand)
    // console.log("lootPercent : ", lootPercent)
    // console.log("If Lootpercent >= 100 --> Loot forced")

    const lootIt = rand <= lootPercent
    if (lootIt) {
      gameState.dispatch({
        type: ActionEnum.LootCard,
        payload: {
          cards: [card],
        },
      })

      addLog({
        id: `VivreCard-${card.id}`,
        logTypes: [ELogType.VivreCard, ELogType.Clicker],
        notification: true,
        type: "success",
        content: <CardLootNotification label={t("notifications:success.title-vivre-card-found")} unit={card} />,
      })
      return true
    }

    return false
  }

  const recruitCard = (card: ICardUnit): TResponse => {
    let response: TResponse = {
      success: false,
      title: "Recruit failed",
    }
    const unitPrice = getPriceUnit(card)
    // User has berries price
    if (gameState.state.berries < unitPrice) {
      response.message = t("notifications:warning.message-not-enough-berries-to-recruit")
      // "You don't have enough berries to recruit"
      return response
    }
    // User has card
    if (gameState.state.cards.find((x) => x.id == card.id) === undefined) {
      response.message = t("notifications:warning.message-recruit-error-no-card")
      // "You're trying to cheat ! You need the card to recruit it "
      return response
    }
    // Card not already in fleet
    if (gameState.state.fleet.find((x) => x.unit.id == card.id) !== undefined) {
      response.message = t("notifications:warning.message-recruit-already-in-fleet")
      // "This pirate is already in your fleet ! "
      return response
    }

    gameState.dispatch({
      type: ActionEnum.RecruitCard,
      payload: {
        addFleet: [card],
        berriesChange: unitPrice,
      },
    })

    return {
      success: true,
      title: t("notifications:success.title-recruit-successful"),
      message: t("notifications:success.message-recruit-successful", { name: card.name, price: unitPrice }),
    }
  }

  return [cards, loot, recruitCard] as const
}

export default useCards
