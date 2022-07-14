import { FC } from "react"
import styled, { css } from "styled-components"
import { IDungeonState } from "../../lib/types"

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

  /* z-index: 100; */
`
// ${(props) => css`
//   ${props.top && `top: 20px;`}
//   ${props.bottom && `bottom: 20px;`}
// ${props.left && `left: 20px;`}
// ${props.right && `right: 20px;`}
// `}

interface IClickerMenu {
  buttonLabel1: string
  buttonFunction1: () => void
  buttonLabel2: string
  buttonFunction2: () => void
  dungeon: IDungeonState | null
}

const ClickerMenu: FC<IClickerMenu> = ({ buttonLabel1, buttonFunction1, buttonLabel2, buttonFunction2, dungeon }) => {
  return (
    <>
      <ClickerMenuWrapper>
        <ClickerButton top={true} left={true} onClick={buttonFunction1}>
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