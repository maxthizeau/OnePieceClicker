import { FC, CSSProperties } from "react"
import styled from "styled-components"
import { getFullImageSrc, getUnitAttackPower, getMaximumHP, getMaximumXP, getCaptainEffect } from "../../../lib/clickerFunctions"
import { IFleetUnit, ICrewUnit } from "../../../lib/hooks/GameContext"
import { nFormatter } from "../../../lib/utils"

const BoxStyled = styled.div<{ small?: boolean }>`
  border-radius: 3px;
  border: 3px solid #b9896e;
  outline: 2px solid black;
  background: #f4f4f4;
  padding: 5px;

  width: ${(props) => (props.small ? "120" : "260")}px;
  text-align: ${(props) => (props.small ? "left" : "center")};
`

const UnitName = styled.div`
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
`

const StatsTable = styled.div`
  margin: 10px 0px;
`

const SpaceBetween = styled.div<{ disable?: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.disable ? "baseline" : "space-between")};
  flex-direction: ${(props) => (props.disable ? "column" : "row")};
`

const UnitImageWrapper = styled.div`
  width: 100%;
  margin: 10px;
  text-align: center;
  & img {
    width: 50%;
  }
`

interface ICrewHoverProps {
  fleetUnit: IFleetUnit
  crewUnit?: ICrewUnit
  hideImg?: boolean
  hideXP?: boolean
  hideCaptain?: boolean
  small?: boolean
  style?: CSSProperties
}

const CrewHover: FC<ICrewHoverProps> = ({ fleetUnit, crewUnit, small, hideXP, hideCaptain, hideImg, style }) => {
  return (
    <BoxStyled style={style} small={small}>
      <UnitName>{fleetUnit.unit.name}</UnitName>

      <StatsTable>
        <UnitName>Level {fleetUnit.level}</UnitName>

        <SpaceBetween disable={small}>
          <span>ATK : {nFormatter(getUnitAttackPower(fleetUnit), 2)} </span>{" "}
          <span>Base ATK : {nFormatter(getUnitAttackPower({ ...fleetUnit, level: 1 }), 2)}</span>
        </SpaceBetween>
        <hr />
        <SpaceBetween disable={small}>
          <span>HP : {nFormatter(fleetUnit.hp, 2)} </span> <span>Max HP : {nFormatter(getMaximumHP(fleetUnit), 2)} </span>
        </SpaceBetween>
        {!hideXP && (
          <>
            <hr />
            <SpaceBetween disable={small}>
              <span>XP : {nFormatter(fleetUnit.xp, 2)} </span> <span>Max XP : {nFormatter(getMaximumXP(fleetUnit), 2)} </span>
            </SpaceBetween>
          </>
        )}
        <hr />
        <SpaceBetween disable={small}>
          <span>Rarity : {[...Array(fleetUnit.unit.stars)].map((x) => `⭐`)} </span>
        </SpaceBetween>
        {!hideCaptain && (
          <div>
            <hr />
            <span>Captain Effect :</span>
            {getCaptainEffect(fleetUnit.unit).map((x, index) => (
              <div key={`captaineffect-${index}`}>{x.toString}</div>
            ))}
          </div>
        )}
      </StatsTable>
      {!hideImg && (
        <UnitImageWrapper>
          <img src={getFullImageSrc(fleetUnit.unit.id)} />
        </UnitImageWrapper>
      )}
      {/* <UnitName>Base Stats</UnitName> */}
    </BoxStyled>
  )
}

export default CrewHover
