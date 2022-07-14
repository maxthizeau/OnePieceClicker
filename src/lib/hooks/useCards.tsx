import { ECaptainEffect, EShipEffect, TUnit } from "../types"
import { ActionEnum, useGameState, ICardUnit } from "./GameContext"
import { Store } from "react-notifications-component"
import CardLootNotification from "../../components/Global/notifications/UnitNotification"
import { getPriceUnit, getMaximumHP } from "../clickerFunctions"
import useFleet from "./useFleet"
import useShip from "./useShip"
import useItems from "./useItems"
import { useLogs, ELogType } from "./useLogs"

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

  const cards = gameState.state.cards

  const loot = (card: TUnit): boolean => {
    const captainEffect = getCaptainBoost(ECaptainEffect.LOOT_CHANCE)
    const shipBoost = getShipBoost(EShipEffect.LOOT_CHANCE)
    const alreadyLooted = gameState.state.cards.find((x) => x.id == card.id) !== undefined
    if (alreadyLooted) {
      return false
    }
    const rand = Math.round(Math.random() * 100)

    const upgradeBoost = Math.pow(gameState.state.upgrades.LootChance.valuePerLevel, gameState.state.upgrades.LootChance.level)
    const itemBoost = isItemActive("dendenmushi") ? 1.2 : 1
    // Add captain effect here
    const lootPercent = lootChance(card.stars) * captainEffect * shipBoost * upgradeBoost * itemBoost
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
        content: <CardLootNotification label={"Vivre Card Found"} unit={card} />,
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
      response.message = "You don't have enought berries to recruit"
      return response
    }
    // User has card
    if (gameState.state.cards.find((x) => x.id == card.id) === undefined) {
      response.message = "You're trying to cheat ! You need the card to recruit it "
      return response
    }
    // Card not already in fleet
    if (gameState.state.fleet.find((x) => x.unit.id == card.id) !== undefined) {
      response.message = "This pirate is already in your fleet ! "
      return response
    }

    gameState.dispatch({
      type: ActionEnum.RecruitCard,
      payload: {
        addFleet: [card],
        berriesChange: unitPrice,
      },
    })

    return { success: true, title: "Recruit successful", message: `${card.name} is now in your fleet. It cost you ${unitPrice} Berries.` }
  }

  return [cards, loot, recruitCard] as const
}

export default useCards
