import { FC } from "react"
import styled from "styled-components"
import { getHPLossFromUnit } from "../../lib/clickerFunctions"
import { EStepKeys } from "../../lib/data/tutorial"
import { useTutorial } from "../../lib/hooks/TutorialContext"
import { IDungeonState, TCurrentUnit } from "../../lib/types"
import TutorialElement from "../Global/TutorialElement"

import DungeonIndicator from "./DungeonIndicator"

interface IPosition {
  top?: boolean
  bottom?: boolean
  left?: boolean
  right?: boolean
}

export const ClickerMenuWrapper = styled.div`
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: space-between;
  padding: 10px;
`

export const ClickerButton = styled.a<IPosition>`
  /* position: absolute; */
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 3px;
  border: 2px solid #b9896e;
  outline: 1px solid black;
  background: #f4f4f4;
  font-size: 0.8em;
`

interface IClickerMenu {
  buttonLabel1: string
  buttonFunction1: () => void
  buttonLabel2: string
  buttonFunction2: () => void
  dungeon: IDungeonState | null
}

const ClickerMenu: FC<IClickerMenu> = ({ buttonLabel1, buttonFunction1, buttonLabel2, buttonFunction2, dungeon }) => {
  const tutorial = useTutorial()
  const isTutorialStepGoBack = tutorial.step && tutorial.step?.stepKey == EStepKeys.GO_BACK_ZONE
  return (
    <>
      <ClickerMenuWrapper>
        <TutorialElement stepKey={EStepKeys.GO_BACK_ZONE} vertical="bottom" horizontal="center" offset={{ x: 0, y: -150 }}>
          {tutorial.step.content}
        </TutorialElement>

        <ClickerButton top={true} left={true} onClick={buttonFunction1} className={isTutorialStepGoBack ? "isTutorial" : ""}>
          {buttonLabel1}
        </ClickerButton>

        <DungeonIndicator dungeon={dungeon} />
        {dungeon && dungeon.state === "inprogress" && (
          <ClickerButton top={true} right={true} onClick={buttonFunction2} style={{ visibility: dungeon.alreadyClearedOnce ? "visible" : "hidden" }}>
            {buttonLabel2}
          </ClickerButton>
        )}
      </ClickerMenuWrapper>
    </>
  )
}

export default ClickerMenu
