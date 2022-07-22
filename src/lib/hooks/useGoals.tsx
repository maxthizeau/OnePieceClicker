import { goalsList } from "../data/goals"
import { EStepKeys } from "../data/tutorial"
import { zones } from "../data/zones"
import { EGoalType, TGoal } from "../types"
import { ActionEnum, useGameState } from "./GameContext"
import { useTutorial } from "./TutorialContext"

const useGoals = () => {
  const { state, dispatch } = useGameState()
  const tutorial = useTutorial()
  const isTutorialSelectGoal = tutorial.step && tutorial.step?.stepKey == EStepKeys.SELECT_GOAL

  const getPossibleGoals = ({ hideTypes, zone }: { hideTypes: EGoalType[]; zone?: number }) => {
    let zoneExists = zones.find((x) => x.id == zone)
    const goals: TGoal[] = goalsList.filter((goal) => {
      const goalHasBeenUnlocked = goalsList.find((x) => state.clearedGoals.includes(x.id) && x.unlockGoals.includes(goal.id))
      const notAlreadyDone = !state.clearedGoals.includes(goal.id)
      // typeCheck/zoneCheck == true --> show
      const typeCheck = !hideTypes.includes(goal.type)
      const zoneCheck = !zoneExists || zoneExists.id == goal.zoneId
      const mainCheck = (notAlreadyDone && goal.zoneId !== undefined && goal.zoneId <= state.maxZoneId) || goalHasBeenUnlocked
      return typeCheck && zoneCheck && mainCheck
    })
    return goals
  }

  const currentGoal = state.currentGoal

  const setCurrentGoal = (goalId: number) => {
    dispatch({ type: ActionEnum.Goal_SetCurrent, payload: { goal: goalId } })
  }

  const claimCurrentGoal = () => {
    // if (isTutorialSelectGoal && currentGoal.id == 29) {
    //   tutorial.dispatch.nextStep()
    // }
    dispatch({ type: ActionEnum.Goal_Claim })
  }

  return { currentGoal, getPossibleGoals, setCurrentGoal, claimCurrentGoal } as const
}

export default useGoals
