import { useCallback, useEffect, useState, createContext, useContext, useMemo } from "react"
import useTranslation from "next-translate/useTranslation"
import { useGameState } from "./GameContext"
import Modal from "../../components/Modals/Modal"
import tutorialSteps, { ITutorialStep } from "../data/tutorial"

type State = { step: number; showModal: boolean; done: boolean }
type Dispatch = { nextStep: () => void; openModal: () => void; clickCloseModal: () => void; setHideTutorial: (arg: boolean) => void }

const TutorialContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)

function TutorialProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<number>(0)
  const [showModal, setShowModal] = useState<boolean>(true)
  const [hideTutorial, setHideTutorial] = useState(false)
  //   const [setDone, setDone] = useState<boolean>(false)

  function nextStep() {
    console.log("Next step")
    const nextStep = step + 1
    setStep(nextStep)
    setShowModal(tutorialSteps[step].autoShowModal)
  }

  function clickCloseModal() {
    console.log("Click Close")
    if (tutorialSteps[step].doneOnModalClose) {
      console.log("MODAL CLOSED TRIGGER NEXT STEP")
      nextStep()
    } else {
      console.log("MODAL CLOSED")
      setShowModal(false)
    }
  }
  function openModal() {
    setShowModal(true)
  }

  const state: State = { step, showModal: hideTutorial ? false : showModal, done: false }

  const dispatch: Dispatch = { nextStep, clickCloseModal, openModal, setHideTutorial }

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
  console.log(currentTutorialStep)
  const value: IUseTutorialReturn = { step: currentTutorialStep !== undefined ? currentTutorialStep : null, state: context.state, dispatch: context.dispatch }
  return value
}

// const TutorialModal = () => {
//   const { state, dispatch } = useTutorial()
//   return <Modal type="tutorial" visible={state.showModal} setVisible={dispatch.clickCloseModal} />
// }

export { TutorialProvider, useTutorial }
