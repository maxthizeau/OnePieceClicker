import Image from "next/image"
import { CSSProperties, FC, useEffect, useState } from "react"
import styled, { css } from "styled-components"
import BerryIcon from "../../../public/images/icons/berry.png"
import { ActionEnum, useGameState } from "../../lib/hooks/GameContext"
import useCards from "../../lib/hooks/useCards"
import { intWithSpaces, timestampToString } from "../../lib/clickerFunctions"
import useItems from "../../lib/hooks/useItems"
import { TItem } from "../../lib/data/items"
import useInterval from "../../lib/hooks/useInterval"
import Hover from "../Global/Hover"
import BasicHover from "../Global/Hover/BasicHover"
import { nFormatter } from "../../lib/utils"
import useTranslation from "next-translate/useTranslation"

const GainTextStyled = styled.div<{ showGain: boolean; negative?: boolean; x?: number }>`
  @keyframes slideOutToTop {
    0% {
      transform: translateY(0);
      visibility: visible;
      opacity: 1;
    }
    99% {
      transform: translateY(-100px);
      opacity: 0;
    }
    100% {
      opacity: 0;
      visibility: hidden;
    }
  }

  color: ${(props) => (props.negative ? "red" : "white")};
  text-shadow: 2px 2px 0px black;
  position: absolute;
  font-size: 0.9em;
  right: ${(props) => (props.x ? props.x : 20)}px;
  top: -20px;
  visibility: hidden;
  opacity: 0;

  /* transition: all 0.5s; */
  animation: 1s ease-out 0s 1 slideOutToTop;
`

export const CurrencyStyled = styled.div<{ clickable: boolean; classicFont?: boolean; isMainCurrency?: boolean }>`
  @keyframes anime {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    90% {
      opacity: 0.1;
    }
    to {
      transform: scale(1.2, 1.5);
      opacity: 0;
    }
  }

  border-radius: 3px;
  background-color: #b9896e;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  border: 3px solid #eee2ba;
  outline: 2px solid black;
  margin-left: 30px;
  position: relative;

  ${(props) => props.classicFont && `font-family: 'Press Start 2P'!important;`}
  ${(props) => props.clickable && `cursor: pointer !important;`}

  &.animate:before,
  &.animate:after {
    content: "";
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    top: -1px;
    left: -1px;
    border-radius: 3px;
    background: rgba(0, 0, 0, 0);
    border: 1px solid #fff38a;
    transform: translate3d(0, 0, 0);
  }
  &.animate:before {
    animation: anime 2s ease-out infinite;
  }
  &.animate:after {
    animation: anime 2s ease-out 1s infinite;
  }

  ${({ isMainCurrency }) => (isMainCurrency ? "  width:340px!important;margin:10px auto;" : "")}
  @media only screen and (min-width: 1550px) {
    ${({ isMainCurrency }) => isMainCurrency && "  width:340px!important;"}
  }
  @media only screen and (min-width: 992px) {
    ${({ isMainCurrency }) => isMainCurrency && "margin:auto; margin-left:0px; width: 340px; height:74px; justify-content: center; margin-top: 10px;"}
  }
`

const CurrencyWrapper = styled.div<{ isMainCurrency?: boolean }>`
  display: flex;
  ${({ isMainCurrency }) => (isMainCurrency ? "flex-direction: row;" : "flex-direction: column;")}/* @media only screen and (min-width: 1550px) {
  } */
`

export const SigStyled = styled.div`
  display: flex;

  padding: 10px;

  & img {
    width: 25px;
    height: 25px;
  }
`

export const TextStyled = styled.div<{ isMainCurrency?: boolean }>`
  color: white;
  text-shadow: 2px 2px 0px black;
  display: flex;
  align-self: center;
  font-size: 1em;

  /* @media only screen and (max-width: 1200px) and (max-width: 1550px) { */
  ${({ isMainCurrency }) => (isMainCurrency ? "padding-top:5px;justify-content: center;flex-grow: 1;text-align: center;" : "padding-bottom:5px;")}/* } */
  /* @media only screen and (min-width: 1550px) {
    padding-left: 8px;
  } */
`

const Timer = styled.div`
  font-family: "Courier New", Courier, monospace;
  display: flex;
  align-self: center;
  color: white;
  margin-top: 8px;
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
`

// export const GainText: FC<{ value: string }> = ({ value }) => {
//   const [showGain, setShowGain] = useState<boolean>(false)
//   useEffect(() => {
//     setShowGain(true)
//   }, [])

//   return <GainTextStyled showGain={showGain}>{value}</GainTextStyled>
// }

interface ICurrencyProps {
  valueMonitored: number
  icon?: string
  canUseIt?: boolean
  itemKey?: string
  spendItemFunc?: () => void
  stateItem?: TItem
  moveX?: boolean
  style?: CSSProperties
  formatNumber?: boolean
  isMainCurrency?: boolean
}

const animationDuration = 1500 // milliseconds

const Currency: FC<ICurrencyProps> = ({
  valueMonitored,
  icon,
  canUseIt,
  itemKey,
  spendItemFunc,
  stateItem,
  moveX = false,
  style,
  formatNumber,
  isMainCurrency,
}) => {
  const [gains, setGains] = useState<{ id: number; value: number; timeEnd: number; x: number }[]>([])
  const [nextGainIndex, setNextGainIndex] = useState(0)
  const [timer, setTimer] = useState<number>(0)
  const [previousValue, setPreviousValue] = useState(0)
  const currentDateTime = new Date().getTime()
  const { t } = useTranslation()
  const { replaceHealDescriptionWithValue } = useItems()
  // useEffect(() => {

  //   // setShowGain(<GainTextStyled showGain={true}>+ 400</GainTextStyled>)
  // }, [valueMonitored, stateItem])

  useInterval(() => {
    if (valueMonitored !== previousValue) {
      const newValue = valueMonitored - previousValue
      const newGain = { id: nextGainIndex, value: newValue, timeEnd: currentDateTime + animationDuration, x: currentDateTime % 100 }
      const newGains = [...gains, newGain]
      // Keep the array with a length of 10, so we dont use too much memory with a big array
      if (newGains.length > 10) newGains.shift()
      setNextGainIndex(nextGainIndex + 1)
      setGains(newGains)
      setPreviousValue(valueMonitored)
    }

    // Timer for items
    if (stateItem?.end !== undefined) {
      const newTimer = stateItem.end - currentDateTime

      if (newTimer > 0) {
        setTimer(newTimer)
      } else {
        setTimer(0)
      }
    }
  }, 10)

  return (
    <CurrencyStyled
      className={canUseIt && stateItem?.end !== undefined && stateItem.end >= currentDateTime ? "animate" : ""}
      onClick={() => {
        canUseIt && itemKey && spendItemFunc !== undefined && spendItemFunc()
      }}
      clickable={canUseIt ?? false}
      style={style}
      isMainCurrency={isMainCurrency}
    >
      <CurrencyWrapper isMainCurrency={isMainCurrency}>
        {stateItem ? (
          <Hover
            wrapperStyles={{ zIndex: 10 }}
            hoverContent={
              <BasicHover
                content={
                  stateItem
                    ? stateItem.itemKey == "healFood"
                      ? replaceHealDescriptionWithValue(t(`game:Currencies.${stateItem.itemKey}-description`))
                      : t(`game:Currencies.${stateItem.itemKey}-description`)
                    : ""
                }
              />
            }
            horizontal="center"
            vertical="bottom"
            delayOpen={200}
            offset={{ y: 10 }}
          >
            <SigStyled>{icon && <img className="outline-white" src={icon} />}</SigStyled>
          </Hover>
        ) : (
          <SigStyled>{icon && <img className="outline-white" src={icon} />}</SigStyled>
        )}

        <TextStyled isMainCurrency={isMainCurrency}>{formatNumber ? nFormatter(valueMonitored, 1) : intWithSpaces(valueMonitored)}</TextStyled>
      </CurrencyWrapper>
      {/* <GainText value="+400" /> */}

      {gains.map((gain, index) => {
        const { id, value, timeEnd, x } = gain
        const show = timeEnd - currentDateTime > 0
        if (!show) return null

        return (
          <GainTextStyled key={id} x={moveX ? x : undefined} showGain={true} negative={value < 0}>
            {value < 0 ? `- ${intWithSpaces(value * -1)}` : `+ ${intWithSpaces(value)}`}
          </GainTextStyled>
        )
      })}

      {/* <GainTextStyled showGain={showGain} negative={value < 0}>
        {value < 0 ? `- ${intWithSpaces(value * -1)}` : `+ ${intWithSpaces(value)}`}
      </GainTextStyled> */}
      {canUseIt && stateItem?.end !== undefined && stateItem.end >= currentDateTime && <Timer>{timestampToString(timer)}</Timer>}
    </CurrencyStyled>
  )
}

export default Currency
