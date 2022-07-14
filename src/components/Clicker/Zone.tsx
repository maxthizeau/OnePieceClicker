import { FC } from "react"
import styled, { css } from "styled-components"
import { TZone } from "../../lib/data/zones"
import { StyledGame } from "./ClickerStyles"
import { EInstance } from "../../lib/enums"
import useInstance from "../../lib/hooks/useInstance"
import useItems from "../../lib/hooks/useItems"
import { useLogs } from "../../lib/hooks/useLogs"
import { nFormatter } from "../../lib/utils"

const Background = styled.div<{ src: string }>`
  background-image: ${(props) => `url(${props.src})`};
`

const ZoneNameStyled = styled.div`
  text-align: center;
  color: white;

  text-shadow: 3px 2px 2px black;
`

interface IPositionButtonProps {
  bottom?: boolean
  top?: boolean
  left?: boolean
  right?: boolean
}

const ButtonTextStyled = styled.span`
  width: 200px;
  padding: 10px;
  border-radius: 3px;
  border: 3px solid #eee2ba;
  outline: 2px solid black;
  background: #b9896e;
  box-shadow: 3px 3px 4px #333333;
  position: absolute;
  bottom: -40px;
  text-align: center;
  transition: transform 0.1s;
`

const ZoneButton = styled.a<IPositionButtonProps>`
  width: 120px;
  height: 120px;
  display: flex;
  padding: 5px;
  border-radius: 3px;
  border: 6px solid #b9896e;
  box-shadow: 3px 3px 4px #333333;
  background: #f4f4f4;
  justify-content: center;
  align-items: center;
  position: absolute;
  cursor: pointer;

  ${(props) => css`
    ${props.bottom && `bottom: 70px;`}
    ${props.left && `left: 70px;`} 
  ${props.right && `right: 70px;`} 
  ${props.top && `top: 70px;`}
  `}

  & img {
    width: 60px;
    height: 60px;
    margin-top: -10px;
  }

  &:hover ${ButtonTextStyled} {
    transform: scale(1.1);
  }
`

const CostIcon = styled.div`
  position: absolute;
  display: flex;
  border: 2px solid #b9896e;
  border-radius: 3px;
  background-color: white;
  top: -20px;
  right: -20px;
  color: #333333;
  padding: 10px 5px 2px 5px;
  font-size: 14px;

  & img {
    width: 21px;
    height: 21px;
    margin-top: -6px;
  }
`

const CostText = styled.span``

interface IZoneProps {
  zone: TZone
}

const Zone: FC<IZoneProps> = ({ zone }) => {
  const { instance, changeInstance } = useInstance()
  const { items, spendItem, enterDungeon } = useItems()
  const { addLog } = useLogs()

  return (
    <StyledGame src={`images/zones/${zone.id}.jpg`}>
      <ZoneNameStyled>{zone.location}</ZoneNameStyled>
      <ZoneButton bottom={true} left={true} onClick={() => changeInstance(EInstance.Clicker)}>
        <img src="images/icons/visitIcon.png" />
        <ButtonTextStyled>Visit Island</ButtonTextStyled>
      </ZoneButton>
      <ZoneButton
        bottom={true}
        right={true}
        onClick={() =>
          enterDungeon(zone.id, () => {
            changeInstance(EInstance.Dungeon)
          })
        }
      >
        <CostIcon>
          <CostText>{nFormatter(zone.dungeonCost, 0)}</CostText> <img src="images/icons/logPoseIcon.png" />
        </CostIcon>
        <img src="images/icons/rescueIcon.png" />
        <ButtonTextStyled>Save Nakamas</ButtonTextStyled>
      </ZoneButton>
    </StyledGame>
  )
}

export default Zone
