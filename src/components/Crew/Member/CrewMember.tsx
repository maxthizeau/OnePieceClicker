import { FC } from "react"
import styled, { css } from "styled-components"
import { getCaptainEffect, getCrewCaptain, getMaximumXP, getThumbImageSrc, getUnitAttackPower, getMaximumHP } from "../../../lib/clickerFunctions"
import { ActionEnum, ICrewUnit, useGameState } from "../../../lib/hooks/GameContext"
import useFleet from "../../../lib/hooks/useFleet"
import Hover from "../../Global/Hover"
import BasicHover from "../../Global/Hover/BasicHover"
import CrewHover from "../../Global/Hover/CrewHover"
import CrewHealthBar from "./CrewHealthBar"
import CrewXPBar from "./CrewXPBar"

const CrewMemberWrapperStyled = styled.div<{ isCaptain?: boolean }>`
  border-radius: 3px;
  border: ${(props) => (props.isCaptain ? "4px solid #dcc031" : "3px solid #b9896e")};
  outline: 2px solid ${(props) => (props.isCaptain ? "#76650d" : "black")};
  background: #f4f4f4;
  padding: 5px;
  position: relative;
  margin: 20px 0px;
  display: flex;

  & .isCaptainText {
    min-width: 140px;
    background-color: white;
    border-radius: 3px;
    border: 2px solid #dcc031;
    padding: 5px 10px;
  }
`

const ImageWrapper = styled.div`
  width: 70px;
  flex-basis: 70px;
  flex-grow: 0;
  flex-shrink: 0;

  margin-right: 15px;
  & img {
    width: 100%;
  }
  &.dead-crew {
    filter: grayscale(1) contrast(2) brightness(0.4);
  }
`

const TextWrapper = styled.div`
  margin-top: 3px;
  letter-spacing: -0.5px;
  font-size: 0.9em;
  flex-grow: 1;

  align-self: center;
`
const NameStyled = styled.div`
  margin-bottom: 7px;
`
const InformationsStyled = styled.div`
  font-family: "Open Sans", "Arial";
  font-size: 1.3em;
  margin-bottom: 7px;
  color: #d7a230;
`

const ButtonsWrapper = styled.div`
  max-width: 40px;

  display: flex;
  align-self: center;
  align-items: center;
  align-content: center;
  margin-left: 15px;
  flex-direction: column;
`

const ButtonCrew = styled.a`
  & img {
    width: 100%;
  }
`

// const CrewImage = styled.div.attrs<{dead:boolean}>((props) => ({
//   styles:{

//   }
// }))<{dead:boolean}>`
//   width: 100%;
// `

const ManageButton = styled.a<{ isCaptain?: boolean }>`
  display: flex;
  width: 30px;
  padding: 5px;
  height: 30px;
  margin: 5px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 1.2em;
  cursor: ${(props) => (props.isCaptain ? "default" : "pointer")};
  border: 1px solid ${(props) => (props.isCaptain ? "#d6a915" : "black")};
  background: ${(props) => (props.isCaptain ? "white" : "#e6e6e6")};
  &.del {
    color: #701010;
  }

  & img {
    width: 20px;
    height: 20px;
  }
`

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
`

interface ICrewMemberProps {
  crewUnit: ICrewUnit
}

const CrewMember: FC<ICrewMemberProps> = ({ crewUnit }) => {
  const gameState = useGameState()
  const { fleet, fleetFunctions, crewFunctions } = useFleet()
  const { gainXP, removeFromCrew } = crewFunctions
  const unit = fleet.find((x) => x.id == crewUnit.fleetId)
  const isCaptain = crewUnit.isCaptain
  if (!unit) return null
  const captainEffect = getCaptainEffect(unit.unit)
  // console.log(unit.unit.name, unit.hp, getMaximumHP(unit))
  return (
    <CrewMemberWrapperStyled isCaptain={isCaptain}>
      {/* {isCaptain && (
        <div className="isCaptain">
          <Hover
            hoverContent={
              <div className="isCaptainText">
                <b>Captain Effect : </b>
                <br />
                +20% XP
              </div>
            }
          >
            <div className="isCaptainLogo" />
          </Hover>
        </div>
      )} */}
      <ImageWrapper className={unit.hp <= 0 ? `dead-crew` : ``}>
        <Hover hoverContent={<CrewHover fleetUnit={unit} />} horizontal="left" vertical="bottom" offset={{ x: 10, y: -30 }}>
          <img src={getThumbImageSrc(unit.unit.id)} />
        </Hover>
      </ImageWrapper>

      <TextWrapper>
        <NameStyled>{unit.unit.name}</NameStyled>
        <InformationsStyled>
          <SpaceBetween>
            <span>Lvl. {unit.level} </span>
            <span> ATK : {getUnitAttackPower(unit)}</span>
          </SpaceBetween>
        </InformationsStyled>
        <CrewHealthBar currentHP={unit.hp} maxHP={getMaximumHP(unit)} />
        <CrewXPBar currentXP={unit.xp} maxXP={getMaximumXP(unit)} />
      </TextWrapper>
      <ButtonsWrapper>
        {/* {crewUnit.isCaptain && (
          <ButtonCrew>
            <img src="images/icons/crownIcon.png" />
          </ButtonCrew>
        )} */}
        <ManageButton
          className="del"
          onClick={() => {
            removeFromCrew(crewUnit)
          }}
        >
          x
        </ManageButton>
        <Hover
          vertical="middle"
          hoverContent={
            <div className="isCaptainText">
              <b>Captain Effect : </b>
              <br />
              {captainEffect.map((x, index) => (
                <div key={`captaineffect-${index}`}>{x.toString}</div>
              ))}
            </div>
          }
        >
          <ManageButton
            onClick={() => {
              gameState.dispatch({ type: ActionEnum.SetCaptain, payload: { crew: crewUnit } })
              getCaptainEffect(unit.unit)
              // console.log(getCrewCaptain(gameState.state.crew, gameState.state.fleet))

              // gainXP(crewUnit, 100000)
            }}
            isCaptain={isCaptain}
          >
            <img src="images/icons/crownIcon.png" />
          </ManageButton>
        </Hover>
      </ButtonsWrapper>
    </CrewMemberWrapperStyled>
  )
}

export default CrewMember
