import { FC } from "react"
import styled from "styled-components"
import { getFullImageSrc } from "../../../lib/clickerFunctions"
import { IFleetUnit, ICrewUnit } from "../../../lib/hooks/GameContext"

const BoxStyled = styled.div`
  border-radius: 3px;
  border: 3px solid #b9896e;
  outline: 2px solid black;
  background: #f4f4f4;
  padding: 5px;

  width: 260px;
`

const UnitName = styled.div`
  text-align: center;
  font-weight: bold;
`

const StatsTable = styled.div`
  margin: 10px 0px;
`

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
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
}

const CrewHover: FC<ICrewHoverProps> = ({ fleetUnit, crewUnit }) => {
  return (
    <BoxStyled>
      <UnitName>{fleetUnit.unit.name}</UnitName>

      <StatsTable>
        <UnitName>Level 12</UnitName>
        <SpaceBetween>
          <span>ATK : 2 120</span> <span>HP : 29 000 </span>
        </SpaceBetween>
        <SpaceBetween>
          <span>XP : 210</span> <span>Max XP : 8 880 </span>
        </SpaceBetween>
        <SpaceBetween>
          <span>Rarity : ⭐⭐⭐⭐⭐</span>
        </SpaceBetween>
        <SpaceBetween>
          <span>Captain Effect : +10 % Click Damage</span>
        </SpaceBetween>
      </StatsTable>
      <UnitImageWrapper>
        <img src={getFullImageSrc(fleetUnit.unit.id)} />
      </UnitImageWrapper>
      {/* <UnitName>Base Stats</UnitName> */}
    </BoxStyled>
  )
}

export default CrewHover
