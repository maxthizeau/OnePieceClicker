import { FC } from "react"
import { Store } from "react-notifications-component"
import styled from "styled-components"
import { getThumbImageSrc, idNumberToString, intWithSpaces, numberTo3DigitString } from "../../../../lib/clickerFunctions"
import { possibleGems } from "../../../../lib/data/treasureGame"
import { ActionEnum, useGameState } from "../../../../lib/hooks/GameContext"
import useUnitData from "../../../../lib/hooks/useUnitData"
import CardLootNotification from "../../../../components/Global/notifications/UnitNotification"
import { getMarketList } from "../../../../lib/treasureGame/marketFunctions"
import { TUnit } from "../../../../lib/types"
import { useLogs, ELogType } from "../../../../lib/hooks/useLogs"
const MarketBoxStyled = styled.div<{ owned?: boolean }>`
  padding: 5px 10px;
  border-radius: 3px;
  border: 3px solid #b9896e;
  outline: 2px solid black;
  background: ${(props) => (props.owned ? "#d5d0c2" : "#eee2ba")};
  display: flex;
  align-items: center;
  column-gap: 20px;
  flex-wrap: wrap;
  flex: 1;
  margin-bottom: 20px;
`

const MarketIcon = styled.div`
  & img {
    width: 100px;
    height: 100px;
  }
`

const MarketText = styled.div`
  flex: 1;
  text-align: left;
  line-height: 1.4em;
  font-family: Open Sans;
  font-size: 1.2em;
  & .main-title {
  }
  & .sub-title {
    font-size: 0.7em;
  }
`
const MarketCurrency = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 10px;
`

const MarketButtonStyled = styled.a<{ disabled?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid #eee2ba;
  outline: 2px solid black;
  border-radius: 3px;
  padding: 5px;
  text-align: center;
  font-size: 0.8em;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  background-color: ${(props) => (props.disabled ? "#a6a5a5" : "white")};
`

const InventoryItem = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid white;
  padding: 10px;
  font-size: 0.8em;
  line-height: 1.5em;
`

const Inventory = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
  & img {
    width: 30px;
    height: 30px;
  }
`

interface IMarketBoxProps {
  icon: string
  title: string
  owned: boolean
  price: number
  currency: string
  onClick: () => void
}

const MarketBox: FC<IMarketBoxProps> = ({ icon, title, price, currency, onClick, owned }) => {
  return (
    <MarketBoxStyled owned={owned}>
      <MarketIcon>
        <img src={icon} />
      </MarketIcon>
      <MarketText>
        <p className="main-title">{title}</p>
        <p className="sub-title">[Vivre Card]</p>
      </MarketText>

      <MarketButtonStyled disabled={owned} onClick={!owned ? onClick : undefined}>
        {owned ? (
          "Owned"
        ) : (
          <>
            {price} <MarketCurrency src={`images/treasure-game/gems/${currency}.png`} />
          </>
        )}
      </MarketButtonStyled>
    </MarketBoxStyled>
  )
}

const MineMarket: FC = () => {
  const gameState = useGameState()
  const marketList = getMarketList()
  const [units] = useUnitData()
  const { addLog } = useLogs()
  // console.log(marketList)

  const buyItem = (id: number, currency: number, price: number, unit: TUnit) => {
    const finalPrice = price * (unit.stars + 1)
    if (gameState.state.treasureGameGems[currency].count < finalPrice) {
      addLog({
        id: `buyMineMarket-error-${unit.id}`,
        logTypes: [ELogType.Mine],
        notification: true,
        title: "Not enought gems",
        message: "You don't have enought gems to buy this item",
        type: "warning",
      })
    } else {
      gameState.dispatch({
        type: ActionEnum.TreasureGame_BuyMarket,
        payload: {
          treasureGameMarket: {
            id,
            currency,
            price,
            unit,
          },
        },
      })

      addLog({
        id: `buyMineMarket-${unit.id}`,
        logTypes: [ELogType.Mine, ELogType.VivreCard],
        notification: true,
        content: <CardLootNotification label={"You bought a Vivre Card"} unit={unit} />,
      })
    }
  }

  return (
    <>
      <h5>
        Market : Buy and sell your loot. <br />
        There is a new market every 6 hours
      </h5>
      <Inventory>
        {gameState.state.treasureGameGems.map((gem, index) => {
          return (
            <InventoryItem key={`gem-${index}`}>
              <div>
                <img src={`images/treasure-game/gems/${gem.id}.png`} />
              </div>
              <div>{gem.count}</div>
            </InventoryItem>
          )
        })}
      </Inventory>
      {marketList.map((item, index) => {
        // console.log(idNumberToString(item.id))
        const unit = units.find((x) => x.id == idNumberToString(item.id))
        if (!unit) return null
        const owned = gameState.state.cards.find((x) => x.id == unit.id) !== undefined

        return (
          <MarketBox
            key={`market-item-${index}`}
            icon={getThumbImageSrc(unit.id)}
            title={unit.name}
            price={item.price * (unit.stars + 1)}
            currency={possibleGems[item.currency]}
            owned={owned}
            onClick={() => buyItem(item.id, item.currency, item.price, unit)}
          />
        )
      })}
      {/* <MarketBox
        icon={getThumbImageSrc("0310")}
        title="[Vivre Card] Monkey D. Luffy - Gear 2nd"
        price={10}
        currency={"diamond"}
        onClick={() => console.log("buy")}
      />
      <MarketBox
        icon={getThumbImageSrc("0310")}
        title="[Vivre Card] Monkey D. Luffy - Gear 2nd"
        price={10}
        currency={"diamond"}
        onClick={() => console.log("buy")}
      />
      <MarketBox
        icon={getThumbImageSrc("0310")}
        title="[Vivre Card] Monkey D. Luffy - Gear 2nd"
        price={10}
        currency={"diamond"}
        onClick={() => console.log("buy")}
      />
      <MarketBox
        icon={getThumbImageSrc("0310")}
        title="[Vivre Card] Monkey D. Luffy - Gear 2nd"
        price={10}
        currency={"diamond"}
        onClick={() => console.log("buy")}
      /> */}
    </>
  )
}

export default MineMarket
