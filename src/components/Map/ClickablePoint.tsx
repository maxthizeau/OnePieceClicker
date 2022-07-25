import useTranslation from "next-translate/useTranslation"
import { FC, HTMLAttributes, useState } from "react"
import styled from "styled-components"
import { EStepKeys } from "../../lib/data/tutorial"
import { TZone } from "../../lib/data/zones"
import { EInstance } from "../../lib/enums"
import { ActionEnum, useGameState } from "../../lib/hooks/GameContext"
import { useTutorial } from "../../lib/hooks/TutorialContext"
import useInstance from "../../lib/hooks/useInstance"
type IPointColor = {
  border?: string
  background?: string
  text?: string
  buttonBackground?: string
  buttonText?: string
  buttonBorder?: string
}

interface IClickablePointStyledProps extends HTMLAttributes<HTMLDivElement> {
  x: number
  y: number
  colors?: IPointColor
}

const PointInfoBox = styled.div`
  position: absolute;
  padding: 5px 10px;
  font-size: 6px;
  top: 18px;
  left: 50%;
  transform: translate(-50%, -100%);
  width: 60px;
  box-shadow: 0px 1px 2px #ccc;
  text-align: center;
  font-weight: bold;

  &::after {
    content: "";
    position: absolute;
    left: 38%;
    top: 100%;
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;

    clear: both;
  }
`

const InfoBoxButton = styled.a`
  display: block;
  text-transform: uppercase;
  font-size: 0.7em;
  margin-top: 3px;
  border-radius: 3px;
  padding: 0px 3px;
`

const ClickablePointStyled = styled.div<IClickablePointStyledProps>`
  position: absolute;
  width: 22px;
  height: 24px;
  border-radius: 90px;
  border: 4px solid ${(props) => (props.colors?.border ? props.colors.border : `#ff0000`)};
  background-color: ${(props) => (props.colors?.background ? props.colors.background : `#fff`)};
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  font-family: Open Sans, Verdana, Geneva, Tahoma, sans-serif;
  cursor: pointer;
  &::after {
    content: "";
    position: absolute;
    left: -2px;
    top: 15px;
    width: 0;
    height: 0;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-top: 12px solid ${(props) => (props.colors?.border ? props.colors.border : `#ff0000`)};

    clear: both;
  }
  ${PointInfoBox} {
    color: ${(props) => (props.colors?.text ? props.colors.text : `#000`)};
    background: ${(props) => (props.colors?.border ? props.colors.border : `#ff0000`)};

    &::after {
      border-top: 10px solid ${(props) => (props.colors?.border ? props.colors.border : `#ff0000`)};
    }

    ${InfoBoxButton} {
      border: 1px solid ${(props) => (props.colors?.buttonBorder ? props.colors.buttonBorder : `#ff0000`)};
      background: ${(props) => (props.colors?.buttonBackground ? props.colors.buttonBackground : `#CCC`)};
      color: ${(props) => (props.colors?.buttonText ? props.colors.buttonText : `#000`)};
    }
  }
`

interface IClickablePointProps {
  zone: TZone
  x: number
  y: number
  isCurrent?: boolean
}

const colors: IPointColor = {
  background: "#ce9e9e",
  border: "#c80c0c",
  text: "#f0f0f0",
  buttonBackground: "#f3adad",
  buttonText: "#000000",
  buttonBorder: "#be6c6c",
}
const colorsCurrent: IPointColor = {
  background: "#cfcfcf",
  border: "#fcdf24",
  text: "#1a1a1a",
  buttonBackground: "#cfcfcf",
  buttonText: "#000000",
  buttonBorder: "#bea56c",
}
const ClickablePoint: FC<IClickablePointProps> = ({ x, y, zone, isCurrent }) => {
  const [visible, setVisible] = useState(isCurrent)
  const gameState = useGameState()
  const { instance, changeInstance } = useInstance()
  const tutorial = useTutorial()
  const isTutorialStepChangeZone = tutorial.step && tutorial.step?.stepKey == EStepKeys.CHANGE_ZONE
  const { t } = useTranslation()
  return (
    <ClickablePointStyled x={x} y={y} colors={isCurrent ? colorsCurrent : colors} onClick={() => setVisible(!visible)}>
      {visible && (
        <PointInfoBox>
          <span>{zone.location}</span>
          <InfoBoxButton
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()

              gameState.dispatch({ type: ActionEnum.ChangeZone, payload: { zoneId: zone.id } })
              changeInstance(EInstance.Zone)
              if (isTutorialStepChangeZone) {
                tutorial.dispatch.nextStep()
              }
            }}
          >
            {isCurrent ? t("common:Map.you-are-here") : t("common:Map.Navigate")}
          </InfoBoxButton>
        </PointInfoBox>
      )}
    </ClickablePointStyled>
  )
}

export default ClickablePoint
