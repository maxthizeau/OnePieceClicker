import useTranslation from "next-translate/useTranslation"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import tutorialSteps, { EStepKeys, ITutorialStep } from "../data/tutorial"
import { stringToJsonState } from "../utils"

type State = { step: number; showModal: boolean; hideTutorial: boolean }
type Dispatch = {
  nextStep: () => void
  openModal: () => void
  clickCloseModal: () => void
  setHideTutorial: (arg: boolean) => void
  endTutorial: () => void
  goToStep: (step: EStepKeys) => void
  resetTutorial: () => void
  importFunc: (importState: State) => void
}

const defaultState: State = { step: 0, showModal: true, hideTutorial: false }

function getDefaultState(): State {
  try {
    const save = localStorage.getItem("opsave") ?? JSON.stringify(defaultState)
    const saveJson = stringToJsonState(save).tutorial
    if (!saveJson) {
      return defaultState
    }
    return saveJson
  } catch {
    return defaultState
  }
}

const TutorialContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)

function TutorialProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<number>(0)
  const [showModal, setShowModal] = useState<boolean>(true)
  const [hideTutorial, setHideTutorial] = useState(false)

  useEffect(() => {
    const state = getDefaultState()
    setStep(state.step)
    setShowModal(state.showModal)
    setHideTutorial(state.hideTutorial)
  }, [])

  function nextStep() {
    const nextStep = step + 1
    setStep(nextStep)
    setShowModal(tutorialSteps[step].autoShowModal)
  }

  function clickCloseModal() {
    if (tutorialSteps[step].doneOnModalClose) {
      nextStep()
    } else {
      setShowModal(false)
    }
  }

  function endTutorial() {
    const lastStep = tutorialSteps.length - 1
    setStep(lastStep)
    setShowModal(tutorialSteps[lastStep].autoShowModal)
  }

  function goToStep(stepArg: EStepKeys) {
    if (step < stepArg) {
      const lastStepIndex = tutorialSteps.length - 1
      const toStep = tutorialSteps.findIndex((x) => x.stepKey == stepArg)
      setStep(toStep > -1 ? toStep : lastStepIndex)
      setShowModal(tutorialSteps[toStep].autoShowModal)
    }
  }

  function openModal() {
    setShowModal(true)
  }
  function resetTutorial() {
    setStep(0)
    setShowModal(true)
    setHideTutorial(false)
  }

  function importFunc(importState: State) {
    setStep(importState.step)
    setShowModal(importState.showModal)
    setHideTutorial(importState.hideTutorial)
  }

  const state: State = { step, showModal: hideTutorial ? false : showModal, hideTutorial: hideTutorial }

  const dispatch: Dispatch = { nextStep, clickCloseModal, openModal, setHideTutorial, endTutorial, goToStep, resetTutorial, importFunc }

  const value = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])
  return <TutorialContext.Provider value={value}>{children}</TutorialContext.Provider>
}

interface IUseTutorialReturn {
  step: ITutorialStep | null
  state: State
  dispatch: Dispatch
}

const useTutorial = () => {
  const { t } = useTranslation()
  const context = useContext(TutorialContext)
  const currentTutorialStep: ITutorialStep = useMemo(() => {
    return tutorialSteps[context.state.step]
  }, [context.state.step])

  const value: IUseTutorialReturn = { step: currentTutorialStep !== undefined ? currentTutorialStep : null, state: context.state, dispatch: context.dispatch }
  return value
}

// const TutorialModal = () => {
//   const { state, dispatch } = useTutorial()
//   return <Modal type="tutorial" visible={state.showModal} setVisible={dispatch.clickCloseModal} />
// }

export { TutorialProvider, useTutorial }
