import useTranslation from "next-translate/useTranslation"
import { FC, useState } from "react"
import styled from "styled-components"
import { TItemKey } from "../../lib/data/items"
import { EStepKeys } from "../../lib/data/tutorial"
import { useGameState } from "../../lib/hooks/GameContext"
import { useTutorial } from "../../lib/hooks/TutorialContext"
import useItems from "../../lib/hooks/useItems"
import Hover from "../Global/Hover"
import BasicHover from "../Global/Hover/BasicHover"
import TutorialElement from "../Global/TutorialElement"
import Currency from "./Currency"

const CurrenciesWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  /* margin-bottom: 50px; */
  align-self: center;
  position: relative;
  @media only screen and (min-width: 992px) {
    margin-bottom: 0px;
  }
`

const CurrenciesListStyled = styled.div`
  display: flex;
  margin-top: 20px;
  /* margin-bottom: 40px; */
  /* height: 70px; */
  font-family: "Open Sans";
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px auto 0px auto;

  @media only screen and (min-width: 1550px) {
    justify-content: right;
  }
  @media only screen and (min-width: 992px) {
    margin-right: -10px;
  }
  @media only screen and (min-width: 768px) {
    margin-top: 10px;
    margin-bottom: 0px;
  }
`

const QuantityButton = styled.button`
  background-color: #f0e4e4;
  border-radius: 3px;
  font-weight: bold;
  text-align: center;
  border: 3px solid #eee2ba;
  outline: 2px solid black;
  cursor: pointer;
  margin-bottom: 20px;
  margin-left: 20px;
  width: 50px;
`

const selectQuantity: { label: string; quantity: number }[] = [
  { label: "x 1", quantity: 1 },
  { label: "x 10", quantity: 10 },
  { label: "x 100", quantity: 100 },
  { label: "x 1000", quantity: 1000 },
  { label: "All", quantity: 9999999 },
]

type TItemToShowAsCurrency = {
  key: TItemKey
  canUseIt: boolean
}

const CurrenciesList: FC = () => {
  const gameState = useGameState()
  const { items, spendItem } = useItems()
  const [qtySelected, setQtySelected] = useState(0)
  const { t } = useTranslation()

  const tutorial = useTutorial()
  const isTutorialStep = tutorial.step && tutorial.step?.stepKey == EStepKeys.EXPLAIN_ITEM

  const itemsToShow: TItemToShowAsCurrency[] = [
    {
      key: "logPose",
      canUseIt: false,
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
      key: "cola",
      canUseIt: true,
    },
    {
      key: "dendenmushi",
      canUseIt: true,
    },
    {
      key: "berryboost",
      canUseIt: true,
    },
  ]
  return (
    <CurrenciesWrapper>
      <Currency valueMonitored={gameState.state.berries} icon="images/icons/berry.png" isMainCurrency={true} />
      <CurrenciesListStyled className={isTutorialStep ? "isTutorial noOutline" : ""}>
        <TutorialElement stepKey={EStepKeys.EXPLAIN_ITEM} vertical="bottom" horizontal="right" offset={{ x: -20, y: -180 }}>
          {tutorial.step.content}
        </TutorialElement>
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
              formatNumber={true}
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
        <QuantityButton
          onClick={() => {
            setQtySelected(qtySelected + 1 >= selectQuantity.length ? 0 : qtySelected + 1)
          }}
        >
          <Hover
            hoverContent={<BasicHover content={t("game:Currencies.select-amount")} />}
            horizontal="center"
            vertical="bottom"
            delayOpen={200}
            offset={{ y: 10 }}
          >
            {selectQuantity[qtySelected].label}
          </Hover>
        </QuantityButton>
        {/* <Currency valueMonitored={items.find((x) => x.itemKey == "cola")?.quantity ?? 0} icon="images/icons/colaIcon.png" />
        <Currency valueMonitored={items.find((x) => x.itemKey == "healFood")?.quantity ?? 0} icon="images/icons/foodIcon.png" />
        <Currency valueMonitored={items.find((x) => x.itemKey == "demonFruit")?.quantity ?? 0} icon="images/icons/demonFruitIcon.png" />
      <Currency valueMonitored={items.find((x) => x.itemKey == "dendenmushi")?.quantity ?? 0} icon="images/icons/dendenmushiIcon.png" /> */}
      </CurrenciesListStyled>
    </CurrenciesWrapper>
  )
}

export default CurrenciesList
