import { FC } from "react"
import styled from "styled-components"
import { useGameState } from "../../lib/hooks/GameContext"
import CrewMember from "./Member/CrewMember"

const CrewWrapperStyled = styled.div`
  border-radius: 3px;
  border: 3px solid #b9896e;
  outline: 2px solid black;
  background: #f4f4f4;
  padding: 10px;
  font-size: 0.8em;
`

const CrewName = styled.h3`
  text-align: center;
`

const Crew: FC = () => {
  const gameState = useGameState()
  return (
    <CrewWrapperStyled>
      <CrewName>Straw Hat Pirates</CrewName>
      {gameState.state.crew.map((crewMember) => {
        return <CrewMember key={crewMember.fleetId} crewUnit={crewMember} />
      })}
    </CrewWrapperStyled>
  )
}

export default Crew
