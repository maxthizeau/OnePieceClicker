import { FC } from "react"
import styled from "styled-components"
import { EStepKeys } from "../../lib/data/tutorial"
import { useGameState } from "../../lib/hooks/GameContext"
import { useTutorial } from "../../lib/hooks/TutorialContext"
import TutorialElement from "../Global/TutorialElement"
import CrewMember from "./Member/CrewMember"
import EmptyCrewMember from "./Member/EmptyCrewMember"

const CrewWrapperStyled = styled.div`
  border-radius: 3px;
  border: 3px solid #b9896e;
  outline: 2px solid black;
  background: #f4f4f4;
  padding: 10px;
  font-size: 0.8em;
  position: relative;
`

const CrewName = styled.h3`
  text-align: center;
`

const Crew: FC = () => {
  const gameState = useGameState()
  const tutorial = useTutorial()
  const isTutorialStep = tutorial.step && tutorial.step?.stepKey == EStepKeys.EXPLAIN_CREW

  return (
    <CrewWrapperStyled className={isTutorialStep ? "isTutorial" : ""}>
      <TutorialElement stepKey={EStepKeys.EXPLAIN_CREW} vertical="middle" horizontal="left" width={300} offset={{ x: -330, y: 0 }}>
        {tutorial.step.content}
      </TutorialElement>

      <CrewName>Crew</CrewName>

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
