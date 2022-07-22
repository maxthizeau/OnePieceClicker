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
      <>
        Start the game by visiting the island. <br />
        You will encounter enemies in order to earn Berries and loot Vivre Cards. <br />
        <p className="tutorial-goal">Click on &quot;Visit Island&quot;</p>
      </>
    ),
    autoShowModal: true,
    doneOnModalClose: false,
  },
  {
    stepKey: EStepKeys.DAMAGE_ENEMY,
    content: (
      <>
        Click on the unit to deal &quot;Click Power&quot; damage. <br />
        Defeating an enemy will give you Berries and a chance to loot its Vivre Card.
        <p className="tutorial-goal">Defeat enemies until you collect your first Vivre Card</p>
      </>
    ),
    autoShowModal: true,
    doneOnModalClose: false,
  },
  {
    stepKey: EStepKeys.RECRUIT_MENU,
    content: (
      <>
        Congratulation, you just found your first Vivre Card. <br />
        Vivre Cards are used to recruit member into your fleet.
        <p className="tutorial-goal">Click on &quot;Vivre Cards&quot; menu</p>
      </>
    ),
    autoShowModal: true,
    doneOnModalClose: false,
  },
  {
    stepKey: EStepKeys.RECRUIT_CARD,
    content: (
      <>
        All your Vivre Cards are here.
        <br />
        To recruit a new member to your fleet, you need to pay its price. <br />
        If you do not have enough Berries to recruit it yet, go back to the Island to fight more enemies.
        <p className="tutorial-goal">Recruit your first fleet member</p>
      </>
    ),
    autoShowModal: true,
    doneOnModalClose: false,
    showCloseModalButton: true,
  },
  {
    stepKey: EStepKeys.EXPLAIN_CREW,
    content: (
      <>
        Here is your crew providing you &quot;Crew Power&quot;. (Dealing damage automatically)
        <br />
        If you have a free slot in your crew, new fleet members are automatically placed in your crew. <br />
        <div>
          <h3>Important informations :</h3>
          <ul>
            <li>
              <b>Level : </b> A new crew member arrives at Lvl. 1. Levels give more HP and ATK power.{" "}
            </li>
            <li>
              <b>HP : </b>If a crew member reaches 0 HP, it will not give Crew Power, and will not gain XP. Heal it with &quot;Heal Food&quot; (We will come
              back to this later)
            </li>
            <li>
              <b>XP : </b>Defeating unit gives XP to one of your crew member. After reaching maximum, he will level up and heal himself.{" "}
            </li>
          </ul>
        </div>
      </>
    ),
    autoShowModal: true,
    doneOnModalClose: true,
  },
  {
    stepKey: EStepKeys.EXPLAIN_FLEET,
    content: <>Manage your fleet and crew members here</>,
    autoShowModal: true,
    doneOnModalClose: true,
  },
  {
    stepKey: EStepKeys.OPEN_GOAL,
    content: (
      <>
        Earn special rewards by completing specific goals. <br />
        <p className="tutorial-goal">Watch available goals with &quot;Select&quot; button</p>
      </>
    ),
    autoShowModal: true,
    doneOnModalClose: false,
  },
  {
    stepKey: EStepKeys.SELECT_GOAL,
    content: (
      <>
        <p className="tutorial-goal">Select &quot;Beat 25 enemies in Shells Town&quot; goal, do the task and claim reward</p>
      </>
    ),
    autoShowModal: true,
    doneOnModalClose: false,
    isInModal: true,
  },
  {
    stepKey: EStepKeys.UNLOCK_SHOP,
    content: (
      <>
        Some features are not yet available. You have to unlock them by paying the indicated price.
        <p className="tutorial-goal">Gather enough Berries to unlock the shop then open it</p>
      </>
    ),
    autoShowModal: true,
    doneOnModalClose: false,
  },
  {
    stepKey: EStepKeys.EXPLAIN_SHOP,
    content: (
      <>
        <p>Here is the store. You can buy different items that will be essential for your progress in the game.</p>

        <p>
          The most important of them is the <b>Log Pose</b>, it will allow you to enter a dungeon.
        </p>

        <p>No need to buy any right now, you have already collected some by completing the previous objective.</p>
      </>
    ),
    autoShowModal: true,
    doneOnModalClose: true,
    isInModal: true,
  },
  {
    stepKey: EStepKeys.EXPLAIN_ITEM,
    content: (
      <>
        <p>All your items are here. They are all consumables except the Log Poses.</p>

        <p>To consume an item, click on it. Its effect will last for 30 seconds.</p>

        <p>To consume several at once, click on the &quot;x1&quot; button and choose the amount you want.</p>

        <p>Hover over objects to see their effects.</p>
      </>
    ),
    autoShowModal: true,
    doneOnModalClose: true,
  },
  {
    stepKey: EStepKeys.GO_BACK_ZONE,
    content: (
      <>
        <p>Let&apos;s go fight in a dungeon!</p>
        <p className="tutorial-goal">First, go back to the seaport</p>
      </>
    ),
    autoShowModal: true,
    doneOnModalClose: false,
  },
  {
    stepKey: EStepKeys.ENTER_DUNGEON,
    content: (
      <>
        <p>Click on &quot;Save Nakamas&quot; to enter dungeon.</p>
        <p>You will have 30 seconds to defeat 10 units and one boss of the zone.</p>
        <p>It will cost you some Log Poses</p>
        <p className="tutorial-goal">Enter in the dungeon and finish it</p>
      </>
    ),
    autoShowModal: true,
    doneOnModalClose: false,
  },
  {
    stepKey: EStepKeys.CHANGE_ZONE,
    content: (
      <>
        <p>You unlocked a new zone !</p>
        <p className="tutorial-goal">Click on [Map] to navigate to the next island.</p>
      </>
    ),
    autoShowModal: true,
    doneOnModalClose: false,
  },
  {
    stepKey: EStepKeys.END_TUTORIAL,
    content: (
      <>
        <p>This is the end of the tutorial. If you need any help, click on [Guide] in the menu (Top/Left corner).</p>
        <p>Tip : If you feel stuck at some point, try to unlock [Upgrades].</p>
      </>
    ),
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
