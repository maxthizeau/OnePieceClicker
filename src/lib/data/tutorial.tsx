import Trans from "next-translate/Trans"

export enum EStepKeys {
  VISIT_ISLAND,
  DAMAGE_ENEMY,
  RECRUIT_MENU,
  RECRUIT_CARD,
  EXPLAIN_CREW,
  EXPLAIN_FLEET,
  OPEN_GOAL,
  SELECT_GOAL,
  UNLOCK_SHOP,
  EXPLAIN_SHOP,
  EXPLAIN_ITEM,
  GO_BACK_ZONE,
  ENTER_DUNGEON,
  EXPLAIN_SHIP,
  CHANGE_ZONE,
  END_TUTORIAL,
}

export interface ITutorialStep {
  stepKey: EStepKeys
  content: React.ReactNode
  autoShowModal: boolean
  doneOnModalClose: boolean
  isInModal?: boolean
  showCloseModalButton?: boolean
}

const tutorialSteps = [
  {
    stepKey: EStepKeys.VISIT_ISLAND,
    content: (
      <Trans
        i18nKey="tutorial:VISIT_ISLAND"
        components={[<p key="VISIT_ISLAND_1" />, <p key="VISIT_ISLAND_2" />, <p key="VISIT_ISLAND_3" className="tutorial-goal" />]}
      />
    ),
    autoShowModal: true,
    doneOnModalClose: false,
  },
  {
    stepKey: EStepKeys.DAMAGE_ENEMY,
    content: (
      <Trans i18nKey="tutorial:DAMAGE_ENEMY" components={[<p key="TUTORIAL_1" />, <p key="TUTORIAL_2" />, <p key="TUTORIAL_3" className="tutorial-goal" />]} />
    ),
    autoShowModal: true,
    doneOnModalClose: false,
  },
  {
    stepKey: EStepKeys.RECRUIT_MENU,
    content: (
      <Trans i18nKey="tutorial:RECRUIT_MENU" components={[<p key="TUTORIAL_1" />, <p key="TUTORIAL_2" />, <p key="TUTORIAL_3" className="tutorial-goal" />]} />
    ),
    autoShowModal: true,
    doneOnModalClose: false,
  },
  {
    stepKey: EStepKeys.RECRUIT_CARD,
    content: (
      <Trans
        i18nKey="tutorial:RECRUIT_CARD"
        components={[<p key="TUTORIAL_1" />, <p key="TUTORIAL_2" />, <p key="TUTORIAL_3" />, <p key="TUTORIAL_4" className="tutorial-goal" />]}
      />
    ),
    autoShowModal: true,
    doneOnModalClose: false,
    showCloseModalButton: true,
  },
  {
    stepKey: EStepKeys.EXPLAIN_CREW,
    content: (
      <Trans
        i18nKey="tutorial:EXPLAIN_CREW"
        components={[
          <p key="TUTORIAL_1" />,
          <div key="TUTORIAL_2" />,
          <h3 key="TUTORIAL_3" />,
          <ul key="TUTORIAL_4" />,
          <li key="TUTORIAL_5" />,
          <b key="TUTORIAL_6" />,
        ]}
      />
    ),
    autoShowModal: true,
    doneOnModalClose: true,
  },
  {
    stepKey: EStepKeys.EXPLAIN_FLEET,
    content: <Trans i18nKey="tutorial:EXPLAIN_FLEET" components={[<p key="TUTORIAL_1" />]} />,
    autoShowModal: true,
    doneOnModalClose: true,
  },
  {
    stepKey: EStepKeys.OPEN_GOAL,
    content: <Trans i18nKey="tutorial:OPEN_GOAL" components={[<p key="TUTORIAL_1" />, <p key="TUTORIAL_2" className="tutorial-goal" />]} />,
    autoShowModal: true,
    doneOnModalClose: false,
  },
  {
    stepKey: EStepKeys.SELECT_GOAL,
    content: <Trans i18nKey="tutorial:SELECT_GOAL" components={[<p key="TUTORIAL_1" className="tutorial-goal" />]} />,
    autoShowModal: true,
    doneOnModalClose: false,
    isInModal: true,
  },
  {
    stepKey: EStepKeys.UNLOCK_SHOP,
    content: <Trans i18nKey="tutorial:UNLOCK_SHOP" components={[<p key="TUTORIAL_1" />, <p key="TUTORIAL_2" className="tutorial-goal" />]} />,
    autoShowModal: true,
    doneOnModalClose: false,
  },
  {
    stepKey: EStepKeys.EXPLAIN_SHOP,
    content: <Trans i18nKey="tutorial:EXPLAIN_SHOP" components={[<p key="TUTORIAL_1" />, <b key="TUTORIAL_2" />]} />,
    autoShowModal: true,
    doneOnModalClose: true,
    isInModal: true,
  },
  {
    stepKey: EStepKeys.EXPLAIN_ITEM,
    content: <Trans i18nKey="tutorial:EXPLAIN_ITEM" components={[<p key="TUTORIAL_1" />]} />,
    autoShowModal: true,
    doneOnModalClose: true,
  },
  {
    stepKey: EStepKeys.GO_BACK_ZONE,
    content: <Trans i18nKey="tutorial:GO_BACK_ZONE" components={[<p key="TUTORIAL_1" />, <p key="TUTORIAL_2" className="tutorial-goal" />]} />,

    autoShowModal: true,
    doneOnModalClose: false,
  },
  {
    stepKey: EStepKeys.ENTER_DUNGEON,
    content: <Trans i18nKey="tutorial:ENTER_DUNGEON" components={[<p key="TUTORIAL_1" />, <p key="TUTORIAL_2" className="tutorial-goal" />]} />,
    autoShowModal: true,
    doneOnModalClose: false,
  },
  {
    stepKey: EStepKeys.CHANGE_ZONE,
    content: <Trans i18nKey="tutorial:CHANGE_ZONE" components={[<p key="TUTORIAL_1" />, <p key="TUTORIAL_2" className="tutorial-goal" />]} />,
    autoShowModal: true,
    doneOnModalClose: false,
  },
  {
    stepKey: EStepKeys.END_TUTORIAL,
    content: <Trans i18nKey="tutorial:END_TUTORIAL" components={[<p key="TUTORIAL_1" />, <p key="TUTORIAL_2" className="tutorial-goal" />]} />,
    autoShowModal: true,
    doneOnModalClose: false,
    showCloseModalButton: true,
  },
]

export default tutorialSteps

// ---

// 1
// Zone : 0 - Start of game
// Explain Berry

// ---
// 2
// Zone : 0 - After 1
// Click on "Visit Island" to fight

// ---
// 3
// Zone : 0 - After 2
// Click to fight

// ---
// 4
// Zone : 0 -  After loot first card
// Click on "Vivre Cards" to recruit unit in your crew

// ---
// 5
// Zone : 0 -  After recruit
// Click on "Fleet" to manage your fleet and crew, change crew member anytime

// ---
// 6
// Zone : 0 -  After 5
// Select a goal

// ---
// 7
// Zone : 0 -  After 6
// Fight, click on "Back" and do first dungeon

// ---
// 8
// Zone : 0 -  After finishing first dungeon
// Click on "Map", go to "Orange Town", the next zone you just unlocked
