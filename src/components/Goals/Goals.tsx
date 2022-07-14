import { FC, useState } from "react"
import styled from "styled-components"
import { goalToString } from "../../lib/goalsFunctions"
import { ActionEnum, useGameState } from "../../lib/hooks/GameContext"
import useGoals from "../../lib/hooks/useGoals"
import Modal from "../Modals/Modal"

const GoalsBoxStyled = styled.div`
  border-radius: 3px;
  border: 3px solid #eee2ba;
  outline: 2px solid black;
  background: #b9896e;
  padding: 10px;
  font-size: 0.8em;
  margin-bottom: 20px;
  text-align: center;

  & h3 {
    color: white;
    text-transform: uppercase;
    font-weight: lighter;
    text-align: center;
    cursor: pointer;
  }
`

const CurrentGoalLabel = styled.p`
  line-height: 1.4rem;
  text-align: center;
`
const CurrentGoalStatus = styled.p`
  margin-top: 20px;
  text-align: center;
`

const GoalButton = styled.button`
  margin: auto;
  padding: 5px 10px;
`

const Goals: FC = () => {
  const { currentGoal, claimCurrentGoal } = useGoals()
  const [visibleZoneModal, setVisibleZoneModal] = useState(false)

  return (
    <>
      <GoalsBoxStyled>
        <h3 onClick={() => setVisibleZoneModal(true)}>Goals</h3>
        {currentGoal ? (
          <>
            <CurrentGoalLabel>{goalToString(currentGoal).toString}</CurrentGoalLabel>
            <CurrentGoalStatus>
              {currentGoal.progressValue < currentGoal.value ? (
                <>
                  {currentGoal.progressValue}/{currentGoal.value}
                </>
              ) : (
                <GoalButton
                  onClick={() => {
                    claimCurrentGoal()
                  }}
                >
                  Claim Reward
                </GoalButton>
              )}
            </CurrentGoalStatus>
          </>
        ) : (
          <>
            <CurrentGoalLabel>Select a new goal...</CurrentGoalLabel>
            <GoalButton onClick={() => setVisibleZoneModal(true)}>Select</GoalButton>
          </>
        )}

        {/* <GoalButton onClick={setGoal}>Search goals</GoalButton> */}
      </GoalsBoxStyled>
      <Modal type="goals" visible={visibleZoneModal} setVisible={setVisibleZoneModal} />
    </>
  )
}

export default Goals
