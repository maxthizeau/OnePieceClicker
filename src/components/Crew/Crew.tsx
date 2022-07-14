import { FC, useCallback, useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { useGameState, ICrewUnit } from "../../lib/hooks/GameContext"
import CrewMember from "./Member/CrewMember"
import EmptyCrewMember from "./Member/EmptyCrewMember"

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

  const [crew, setCrew] = useState<(ICrewUnit | null)[]>([])

  // const updateCrewRender = useMemo(() => {
  //   const crewToAdd: (ICrewUnit | null)[] = []
  //   for (let i = 0; i < 3 + gameState.state.upgrades.CrewMembers.level; i++) {
  //     if (gameState.state.crew[i]) {
  //       crewToAdd.push(gameState.state.crew[i])
  //     } else {
  //       crewToAdd.push(null)
  //     }
  //   }
  //   return crewToAdd
  // }, [gameState.state])

  // useEffect(() => {
  //   console.log("Render")
  //   setCrew(updateCrewRender)
  // }, [gameState])

  return (
    <CrewWrapperStyled>
      <CrewName>Straw Hat Pirates</CrewName>

      {[...Array(2 + gameState.state.upgrades.CrewMembers.level)].map((_, index) => {
        const crewMember = gameState.state.crew[index]
        if (!crewMember) {
          return <EmptyCrewMember key={`crewMember-${index}`} />
        }
        return <CrewMember key={`crewMember-${index}`} crewUnit={crewMember} />
      })}
    </CrewWrapperStyled>
  )
}

export default Crew
