import { FC, useEffect, useState } from "react"
import styled from "styled-components"
import LostMenu from "./LostMenu"
import VictoryMenu from "./VictoryMenu"

const PopupStyled = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #ffffffae;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
`

const TitleStyled = styled.h1`
  text-align: center;
`
const SubTitleStyled = styled.h3`
  text-align: center;
`

interface IEndDungeonMessageProps {
  type: "inprogress" | "lost" | "victory"
  setFarmMode: () => void
  resetDungeon: () => void
  back: () => void
}

const EndDungeonMessage: FC<IEndDungeonMessageProps> = ({ type, setFarmMode, resetDungeon, back }) => {
  const [buttonDisabled, setButtonDisabled] = useState(true)

  // Disable buttons for short time to prevent missclicks due to spam click
  useEffect(() => {
    setInterval(() => setButtonDisabled(false), 500)
  }, [])

  const label = type == "victory" ? "VICTORY" : type == "lost" ? "DEFEAT" : "Title : UNDEFINED STATE"
  const subtitle =
    type == "victory"
      ? "You saved your nakamas !"
      : type == "lost"
      ? "The boss had time to flee, strengthen your crew and try again."
      : "SubTitle : UNDEFINED STATE"

  return (
    <PopupStyled>
      <TitleStyled>{label}</TitleStyled>
      <SubTitleStyled>{subtitle}</SubTitleStyled>
      {type == "victory" && <VictoryMenu buttonDisabled={buttonDisabled} back={back} setFarmMode={setFarmMode} resetDungeon={resetDungeon} />}
      {type == "lost" && <LostMenu buttonDisabled={buttonDisabled} back={back} resetDungeon={resetDungeon} />}
    </PopupStyled>
  )
}

export default EndDungeonMessage
