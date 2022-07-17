import { FC } from "react"
import styled, { css } from "styled-components"
import { getCaptainEffect, getCrewCaptain, getMaximumXP, getThumbImageSrc, getUnitAttackPower, getMaximumHP } from "../../../lib/clickerFunctions"
import { ActionEnum, ICrewUnit, useGameState } from "../../../lib/hooks/GameContext"
import useFleet from "../../../lib/hooks/useFleet"
import Hover from "../../Global/Hover"
import BasicHover from "../../Global/Hover/BasicHover"
import CrewHover from "../../Global/Hover/CrewHover"
import CrewHealthBar from "./CrewHealthBar"
import CrewXPBar from "./CrewXPBar"
import useTranslation from "next-translate/useTranslation"

const CrewMemberWrapperStyled = styled.div<{ isCaptain?: boolean }>`
  width: 100%;
  height: 86px;
  border-radius: 3px;
  border: ${(props) => (props.isCaptain ? "4px solid #dcc031" : "3px solid #b9896e")};
  outline: 2px solid ${(props) => (props.isCaptain ? "#76650d" : "black")};
  background: #e0e0e0;
  color: #969696;
  padding: 5px;
  position: relative;
  margin: 20px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const EmptyCrewMember: FC = () => {
  const { t } = useTranslation()
  return <CrewMemberWrapperStyled>{t("game:Crew.empty-slot")}</CrewMemberWrapperStyled>
}

export default EmptyCrewMember
