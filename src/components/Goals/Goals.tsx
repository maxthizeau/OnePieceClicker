import { FC, useState } from "react"
import styled from "styled-components"
import { goalToString } from "../../lib/goalsFunctions"
import { ActionEnum, useGameState } from "../../lib/hooks/GameContext"
import useGoals from "../../lib/hooks/useGoals"
import Modal from "../Modals/Modal"
import useTranslation from "next-translate/useTranslation"
import { useTutorial } from "../../lib/hooks/TutorialContext"
import { EStepKeys } from "../../lib/data/tutorial"
import TutorialElement from "../Global/TutorialElement"

const GoalsBoxStyled = styled.div`
  border-radius: 3px;
  border: 3px solid #eee2ba;
  outline: 2px solid black;
  background: #b9896e;
  padding: 10px;
  font-size: 0.8em;
  /* margin-bottom: 20px; */
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  position: relative;
  & h3 {
    color: white;
    text-transform: uppercase;
    font-weight: lighter;
    text-align: center;
    cursor: pointer;
    margin: 10px 0px;
  }

  @media only screen and (min-width: 1550px) {
    height: auto;
  }
`

const CurrentGoalLabel = styled.p`
  line-height: 1.4rem;
  text-align: center;
  margin: 10px 0px;
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
  const { t } = useTranslation()
  const [visibleZoneModal, setVisibleZoneModal] = useState(false)
  const tutorial = useTutorial()
  const isTutorialOpenModal = tutorial.step && tutorial.step?.stepKey == EStepKeys.OPEN_GOAL
  const isTutorialSelectGoal = tutorial.step && tutorial.step?.stepKey == EStepKeys.SELECT_GOAL
  const goalLocation = currentGoal && currentGoal?.zoneId !== undefined ? t(`zones:${currentGoal.zoneId}-${goalToString(currentGoal).location}`) : ""

  return (
    <>
      <GoalsBoxStyled className={isTutorialOpenModal && "isTutorial"}>
        <TutorialElement stepKey={EStepKeys.OPEN_GOAL} vertical="middle" horizontal="right" width={300} offset={{ x: -320, y: 0 }}>
          {tutorial.step.content}
        </TutorialElement>

        <h3 onClick={() => setVisibleZoneModal(true)}>{t("game:Modals.Goals.goal-label")}</h3>
        {currentGoal ? (
          <>
            <CurrentGoalLabel>
              {t(`game:Goals.${goalToString(currentGoal).goalKey}-label`, { value: currentGoal.value, location: goalLocation })}
            </CurrentGoalLabel>
            <CurrentGoalStatus>
              {currentGoal.progressValue < currentGoal.value ? (
                <>
                  {currentGoal.progressValue}/{currentGoal.value}
                </>
              ) : (
                <GoalButton
                  onClick={() => {
                    if (isTutorialSelectGoal) {
                      tutorial.dispatch.nextStep()
                    }
                    claimCurrentGoal()
                  }}
                >
                  {t("game:Goals.claim-reward")}
                </GoalButton>
              )}
            </CurrentGoalStatus>
          </>
        ) : (
          <>
            <CurrentGoalLabel>{t("game:Goals.select-new-goal")}</CurrentGoalLabel>
            <GoalButton
              onClick={() => {
                setVisibleZoneModal(true)
                if (isTutorialOpenModal) {
                  tutorial.dispatch.nextStep()
                }
              }}
            >
              {t("common:select")}
            </GoalButton>
          </>
        )}

        {/* <GoalButton onClick={setGoal}>Search goals</GoalButton> */}
      </GoalsBoxStyled>
      <Modal type="goals" visible={visibleZoneModal} setVisible={setVisibleZoneModal} />
    </>
  )
}

export default Goals
