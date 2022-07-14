import { FC, useState } from "react"
import styled from "styled-components"
import { BerryIcon, Column, Row } from "../../styled/Globals"
import { ModalSubtitle, SmallModalSubtitle } from "../ModalStyles"
import { getThumbImageSrc } from "../../../lib/clickerFunctions"
import SelectUnit from "./Training/SelectUnitModal"
import { useGameState } from "../../../lib/hooks/GameContext"
import { XPBoostUnlockPrices } from "../../../lib/data/menuUnlocks"
import { nFormatter } from "../../../lib/utils"

const ExtraModalStyles = styled.div`
  min-height: 800px;
  & h4 {
    margin-bottom: 15px;
  }
  & ${SmallModalSubtitle} {
    margin-top: 15px;
  }
  padding-bottom: 20px;
  /* width: 1200px; */
`

const XPBarText = styled.span`
  font-size: 0.8em;
  position: relative;
  z-index: 3;
  color: #efefef;
`
const XPBarStyled = styled.div`
  width: 100%;
  border-radius: 3px;
  padding: 3px 0px;
  background-color: #108d51;
  text-align: center;
  position: relative;
  z-index: 1;
`

const HitBarStyled = styled.div.attrs<{ percentXP: number }>((props) => ({
  style: {
    width: `${props.percentXP}%`,
    borderTopLeftRadius: `${props.percentXP == 100 ? "3px" : "0px"}`,
    borderBottomLeftRadius: `${props.percentXP == 100 ? "3px" : "0px"}`,
  },
}))<{ percentXP: number }>`
  width: 100%;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #a3a3a3;
  z-index: 2;
  transition: width 0.2s;
`

interface IXPBarProps {
  maxXP: number
  currentXP: number
}

const TrainingSpotList = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
`

const RemoveButton = styled.a`
  display: none;
  &::after {
    content: "X";
    position: absolute;
    top: -10px;
    right: -10px;
    padding: 3px 4px 1px 5px;
    border-radius: 99px;
    z-index: 2;
    color: white;
    background-color: #b51818;
    font-size: 10px;
  }
`

const TrainingSpot = styled.div<{ free?: boolean; locked?: boolean }>`
  display: flex;
  width: 120px;
  height: 150px;
  padding: 5px 7px;
  border-radius: 3px;
  background: ${(props) => (props.locked ? "#505050" : "#eee2ba")};
  color: ${(props) => (props.locked ? "#cacaca" : props.free ? "#363636" : "#363636")};
  border-radius: 3px;
  border: 3px solid #b9896e;
  outline: 2px solid black;
  position: relative;

  & img {
    width: 100px;
    height: 100px;
    margin-bottom: 5px;
  }

  &:hover {
    cursor: pointer;
    background: ${(props) => (props.locked ? "#717171" : "#d9d6cb")};
    & ${RemoveButton} {
      display: block;
    }
  }
`

const InsideTrainingSpot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 0.8em;
  line-height: 1.2em;
`

const LevelText = styled.div`
  color: #6e4a36;
  margin-top: 5px;
`

const Divider = styled.div`
  display: flex;
  width: 2px;
  /* margin: 40px auto; */
  margin-top: 20px;
  background-color: #0000003a;
`

const XPBoostSlot = ({ free, locked, price }: { free?: boolean; locked?: boolean; price?: number }) => {
  return (
    <TrainingSpot free={free} locked={locked}>
      <InsideTrainingSpot>
        {free && <div>Free Slot</div>}
        {locked && price !== undefined && (
          <div>
            Unlock price: <br /> <BerryIcon /> {nFormatter(price, 3)}
          </div>
        )}
        {!locked && !free && (
          <>
            <img src={getThumbImageSrc("0001")} />
            <LevelText>Lvl. 18</LevelText>
            <RemoveButton />
            {/* <XPBarStyled>
              <HitBarStyled percentXP={80} />
              <XPBarText>80%</XPBarText>
            </XPBarStyled> */}
          </>
        )}
      </InsideTrainingSpot>
    </TrainingSpot>
  )
}
const RayleighSlot = ({ free, locked }: { free?: boolean; locked?: boolean }) => {
  return (
    <TrainingSpot free={free} locked={locked}>
      <InsideTrainingSpot>
        {free && <div>Free Slot</div>}
        {locked && (
          <div>
            Unlock price:
            <br />
            <br /> <BerryIcon /> 500 K
          </div>
        )}
        {!locked && !free && (
          <>
            <img src={getThumbImageSrc("0001")} />

            <XPBarStyled>
              <HitBarStyled percentXP={20} />
              <XPBarText>80%</XPBarText>
            </XPBarStyled>
          </>
        )}
      </InsideTrainingSpot>
    </TrainingSpot>
  )
}

const TrainingModalContent: FC = () => {
  const { state, dispatch } = useGameState()
  const { XPBoost, Rayleigh } = state.training

  return (
    <ExtraModalStyles>
      <h3>Training</h3>
      <Row>
        <Column span={12}>
          <h4>XP Boost</h4>

          <TrainingSpotList>
            {[...Array(XPBoostUnlockPrices.length)].map((_, index) => {
              if (index > XPBoost.maxSlots - 1) {
                return <XPBoostSlot locked price={XPBoostUnlockPrices[index]} />
              } else if (!XPBoost.fleetUnitIds[index]) {
                return <XPBoostSlot free />
              } else {
                return <XPBoostSlot />
              }
            })}
          </TrainingSpotList>
          <SmallModalSubtitle>Units in XP Boost gains an additionnal 50% of all XP gains. You can select any unit in your fleet.</SmallModalSubtitle>
        </Column>
        <Divider />
        <Column span={12}>
          <h4>Rayleigh Training</h4>

          <TrainingSpotList>
            <RayleighSlot />
            <RayleighSlot free />
            <RayleighSlot locked />
          </TrainingSpotList>
          <SmallModalSubtitle>
            Once a fleet member is level 100, Rayleigh can teach him Haki. He will be back at lvl 1 but will earn 10% base attack.{" "}
          </SmallModalSubtitle>
        </Column>
      </Row>
      <SelectUnit />
    </ExtraModalStyles>
  )
}

export default TrainingModalContent
