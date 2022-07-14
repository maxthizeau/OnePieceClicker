import { FC, useState } from "react"
import styled from "styled-components"
import { BerryIcon, Column, Row } from "../../styled/Globals"
import { ModalSubtitle, SmallModalSubtitle } from "../ModalStyles"
import { getMaximumTrainingXP, getThumbImageSrc } from "../../../lib/clickerFunctions"
import SelectUnit from "./Training/SelectUnitModal"
import { ActionEnum, IFleetUnit, useGameState } from "../../../lib/hooks/GameContext"
import { RayleighUnlockPrices, XPBoostUnlockPrices } from "../../../lib/data/menuUnlocks"
import { nFormatter } from "../../../lib/utils"
import { ELogType, useLogs } from "../../../lib/hooks/useLogs"
import { TTypeTraining } from "../../../lib/types"

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

const TrainingSpot = styled.div<{ free?: boolean; locked?: boolean; selected?: boolean }>`
  display: flex;
  width: 120px;
  height: 150px;
  padding: 5px 7px;
  border-radius: 3px;
  background: ${(props) => (props.locked ? "#505050" : "#eee2ba")};
  color: ${(props) => (props.locked ? "#cacaca" : props.free ? "#363636" : "#363636")};
  border-radius: 3px;
  border: 3px solid ${(props) => (props.selected ? "#f1cc3a" : "#b9896e")};
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

const BoostButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20px;
  border-radius: 3px;
  padding: 3px 0px;
  background-color: #108d51;
  color: white;
`

interface ISlotProps {
  free?: boolean
  locked?: boolean
  price?: number
  selected?: boolean
  onClick: () => void
  unit?: IFleetUnit
  removeFunc?: () => void
  boostFunc?: () => void
}

const XPBoostSlot = ({ free, locked, price, selected, onClick, unit, removeFunc }: ISlotProps) => {
  return (
    <TrainingSpot selected={selected} free={free} locked={locked} onClick={onClick}>
      <InsideTrainingSpot>
        {free && <div>Free Slot</div>}
        {locked && price !== undefined && (
          <div>
            Unlock price: <br /> <BerryIcon /> {nFormatter(price, 3)}
          </div>
        )}
        {!locked && !free && !unit && <>Error : Unit not found</>}
        {!locked && !free && unit && (
          <>
            <img src={getThumbImageSrc(unit.unit.id)} />
            <LevelText>Lvl. {unit.level}</LevelText>
            <RemoveButton onClick={removeFunc} />
          </>
        )}
      </InsideTrainingSpot>
    </TrainingSpot>
  )
}
const RayleighSlot = ({ free, locked, price, selected, onClick, unit, boostFunc }: ISlotProps) => {
  const percentXP = unit ? (1 - unit.trainingXP / getMaximumTrainingXP(unit.unit)) * 100 : 0
  return (
    <TrainingSpot selected={selected} free={free} locked={locked} onClick={onClick}>
      <InsideTrainingSpot>
        {free && <div>Free Slot</div>}
        {locked && price !== undefined && (
          <div>
            Unlock price: <br /> <BerryIcon /> {nFormatter(price, 3)}
          </div>
        )}
        {!locked && !free && !unit && <>Error : Unit not found !</>}
        {!locked && !free && unit && (
          <>
            <img src={getThumbImageSrc(unit.unit.id)} />

            <XPBarStyled>
              <HitBarStyled percentXP={percentXP} />
              {boostFunc !== undefined && Math.floor(100 - percentXP) >= 100 ? (
                <BoostButton onClick={boostFunc}>BOOST!</BoostButton>
              ) : (
                <XPBarText>{Math.floor(100 - percentXP)}%</XPBarText>
              )}
            </XPBarStyled>
          </>
        )}
      </InsideTrainingSpot>
    </TrainingSpot>
  )
}

type TSelectedSlot = {
  type: TTypeTraining
  index: number
}

const TrainingModalContent: FC = () => {
  const { state, dispatch } = useGameState()
  const { addLog } = useLogs()
  const { XPBoost, Rayleigh } = state.training
  const [selectedSlot, setSelectedSlot] = useState<TSelectedSlot | null>(null)

  function clickUnlock(type: TTypeTraining, price: number) {
    if (state.berries >= price) {
      dispatch({ type: ActionEnum.Training_Unlock, payload: { training: { type } } })
      addLog({
        id: `unlockTraining-${price}-${type}`,
        logTypes: [ELogType.Clicker],
        notification: true,
        title: "Slot unlocked",
        type: "success", // 'default', 'success', 'info', 'warning'
      })
    } else {
      addLog({
        id: `unlockTraining-${price}-${type}`,
        logTypes: [ELogType.Clicker],
        notification: true,
        title: "Not enough berries",
        message: `You don't have enough berries to unlock this slot`,
        type: "warning", // 'default', 'success', 'info', 'warning'
      })
    }
  }

  function clickSelect(type: TTypeTraining, index: number) {
    setSelectedSlot({ type, index })
  }

  function removeFromSlot(type: TTypeTraining, index: number) {
    dispatch({ type: ActionEnum.Training_RemoveUnit, payload: { training: { type: type, index: index } } })
  }

  function boostFunc(index: number) {
    dispatch({ type: ActionEnum.Training_RayleighUpgrade, payload: { training: { type: "rayleigh", index: index } } })
  }

  return (
    <ExtraModalStyles>
      <h3>Training</h3>
      <Row>
        <Column span={12}>
          <h4>XP Boost</h4>

          <TrainingSpotList>
            {[...Array(XPBoostUnlockPrices.length)].map((_, index) => {
              const selected = selectedSlot !== null && selectedSlot.type == "xp" && selectedSlot.index == index
              if (index > XPBoost.maxSlots - 1) {
                const price = XPBoostUnlockPrices[index]
                return <XPBoostSlot locked price={price} onClick={() => clickUnlock("xp", price)} />
              } else if (XPBoost.fleetUnitIds[index] === null || XPBoost.fleetUnitIds[index] === undefined) {
                return (
                  <XPBoostSlot
                    selected={selected}
                    free
                    onClick={() => {
                      clickSelect("xp", index)
                    }}
                  />
                )
              } else {
                return (
                  <XPBoostSlot
                    selected={selected}
                    onClick={() => {
                      clickSelect("xp", index)
                    }}
                    unit={state.fleet.find((x) => x.id == XPBoost.fleetUnitIds[index])}
                    removeFunc={() => removeFromSlot("xp", index)}
                  />
                )
              }
            })}
          </TrainingSpotList>
          <SmallModalSubtitle>Units in XP Boost gains an additionnal 50% of all XP gains. You can select any unit in your fleet.</SmallModalSubtitle>
        </Column>
        <Divider />
        <Column span={12}>
          <h4>Rayleigh Training</h4>

          <TrainingSpotList>
            {[...Array(RayleighUnlockPrices.length)].map((_, index) => {
              const selected = selectedSlot !== null && selectedSlot.type == "rayleigh" && selectedSlot.index == index
              if (index > Rayleigh.maxSlots - 1) {
                const price = RayleighUnlockPrices[index]
                return <RayleighSlot locked price={price} onClick={() => clickUnlock("rayleigh", price)} />
              } else if (Rayleigh.fleetUnitIds[index] === null || Rayleigh.fleetUnitIds[index] === undefined) {
                return (
                  <RayleighSlot
                    selected={selected}
                    free
                    onClick={() => {
                      clickSelect("rayleigh", index)
                    }}
                  />
                )
              } else {
                console.log(state.fleet.find((x) => x.id == Rayleigh.fleetUnitIds[index]))
                return (
                  <RayleighSlot
                    selected={selected}
                    onClick={() => {
                      clickSelect("rayleigh", index)
                    }}
                    unit={state.fleet.find((x) => x.id == Rayleigh.fleetUnitIds[index])}
                    boostFunc={() => boostFunc(index)}
                  />
                )
              }
            })}
          </TrainingSpotList>
          <SmallModalSubtitle>
            Once a fleet member is level 100, Rayleigh can teach him Haki. He will be back at lvl 1 but will earn 10% base attack.{" "}
          </SmallModalSubtitle>
        </Column>
      </Row>
      <SelectUnit selected={selectedSlot} />
    </ExtraModalStyles>
  )
}

export default TrainingModalContent
