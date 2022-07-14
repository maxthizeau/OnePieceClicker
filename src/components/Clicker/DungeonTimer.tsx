import { FC } from "react"
import styled from "styled-components"

const DungeonTimerStyled = styled.div`
  position: absolute;
  top: 40px;
  right: 10px;
  padding: 10px 20px;
  border-radius: 3px;
  border: 2px solid #b9896e;
  outline: 1px solid black;
  background: #f4f4f4;
  font-family: "Orbitron", "Courier New";
  width: 71px;
  display: flex;
  justify-content: center;
`

interface IDungeonTimerProps {
  timer: number
}

const DungeonTimer: FC<IDungeonTimerProps> = ({ timer }) => {
  return (
    <DungeonTimerStyled>
      {timer.toLocaleString("fr-FR", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}
    </DungeonTimerStyled>
  )
}

export default DungeonTimer
