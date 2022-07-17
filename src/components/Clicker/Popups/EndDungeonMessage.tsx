import { FC, useEffect, useState } from "react"
import styled from "styled-components"
import LostMenu from "./LostMenu"
import VictoryMenu from "./VictoryMenu"
import useTranslation from "next-translate/useTranslation"

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
  const { t } = useTranslation()
  // Disable buttons for short time to prevent missclicks due to spam click
  useEffect(() => {
    setInterval(() => setButtonDisabled(false), 500)
  }, [])

  const label = type == "victory" ? t("game:Clicker.Popups.victory") : type == "lost" ? t("game:Clicker.Popups.defeat") : "Title : UNDEFINED STATE"
  const subtitle =
    type == "victory" ? t("game:Clicker.Popups.victory-message") : type == "lost" ? t("game:Clicker.Popups.defeat-message") : "SubTitle : UNDEFINED STATE"

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
