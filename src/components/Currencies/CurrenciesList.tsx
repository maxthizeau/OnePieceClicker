import { FC, useState } from "react"
import Currency from "./Currency"
import styled from "styled-components"
import { useGameState } from "../../lib/hooks/GameContext"
import useItems from "../../lib/hooks/useItems"
import Hover from "../Global/Hover"
import BasicHover from "../Global/Hover/BasicHover"

const CurrenciesListStyled = styled.div`
  display: flex;
  margin-top: 10px;
  height: 70px;
  justify-content: right;
  font-family: "Open Sans";
`

const QuantityButton = styled.button`
  background-color: #f0e4e4;
  border-radius: 3px;
  font-weight: bold;
  text-align: center;
  border: 3px solid #eee2ba;
  outline: 2px solid black;
  cursor: pointer;
`

const selectQuantity: { label: string; quantity: number }[] = [
  { label: "x 1", quantity: 1 },
  { label: "x 10", quantity: 10 },
  { label: "x 100", quantity: 100 },
  { label: "x 1000", quantity: 1000 },
  { label: "All", quantity: 9999999 },
]

type TItemToShowAsCurrency = {
  key: string
  canUseIt: boolean
}

const CurrenciesList: FC = () => {
  const gameState = useGameState()
  const { items, useItem: spendItem } = useItems()
  const [qtySelected, setQtySelected] = useState(0)
  const itemsToShow: TItemToShowAsCurrency[] = [
    {
      key: "logPose",
      canUseIt: false,
    },
    {
      key: "cola",
      canUseIt: true,
    },
    {
      key: "healFood",
      canUseIt: true,
    },
    {
      key: "demonFruit",
      canUseIt: true,
    },
    {
      key: "dendenmushi",
      canUseIt: true,
    },
  ]
  return (
    <>
      <CurrenciesListStyled>
        <Hover
          hoverContent={<BasicHover content={"Select the amount of item to use"} />}
          horizontal="center"
          vertical="bottom"
          delayOpen={200}
          offset={{ y: 10 }}
        >
          <QuantityButton
            onClick={() => {
              setQtySelected(qtySelected + 1 >= selectQuantity.length ? 0 : qtySelected + 1)
            }}
          >
            {selectQuantity[qtySelected].label}
          </QuantityButton>
        </Hover>
        {itemsToShow.map((item, index) => {
          const stateItem = items.find((x) => x.itemKey == item.key)
          return (
            <Currency
              key={`currency-item-${item.key}-${index}`}
              valueMonitored={stateItem?.quantity ?? 0}
              icon={`images/icons/${item.key}Icon.png`}
              canUseIt={item.canUseIt}
              itemKey={item.key}
              stateItem={stateItem}
              spendItemFunc={
                item.canUseIt
                  ? () => {
                      spendItem(item.key, selectQuantity[qtySelected].quantity)
                    }
                  : undefined
              }
            />
          )
        })}
        {/* <Currency valueMonitored={items.find((x) => x.itemKey == "cola")?.quantity ?? 0} icon="images/icons/colaIcon.png" />
        <Currency valueMonitored={items.find((x) => x.itemKey == "healFood")?.quantity ?? 0} icon="images/icons/foodIcon.png" />
        <Currency valueMonitored={items.find((x) => x.itemKey == "demonFruit")?.quantity ?? 0} icon="images/icons/demonFruitIcon.png" />
      <Currency valueMonitored={items.find((x) => x.itemKey == "dendenmushi")?.quantity ?? 0} icon="images/icons/dendenmushiIcon.png" /> */}
      </CurrenciesListStyled>
      <Currency valueMonitored={gameState.state.berries} icon="images/icons/berry.png" style={{ width: "300px", justifyContent: "center", marginTop: "5px" }} />
    </>
  )
}

export default CurrenciesList
