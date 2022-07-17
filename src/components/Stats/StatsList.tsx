import { FC } from "react"
import styled from "styled-components"
import { intWithSpaces } from "../../lib/clickerFunctions"
import { useGameState } from "../../lib/hooks/GameContext"
import useCards from "../../lib/hooks/useCards"
import usePower from "../../lib/hooks/usePower"
import Currency from "../Currencies/Currency"
import Stat from "./Stat"
import useTranslation from "next-translate/useTranslation"

const StatsListStyled = styled.div`
  color: white;
  font-size: 0.9em;
  text-transform: uppercase;
  padding-left: 20px;
  font-weight: 0;
  margin-top: 10px;
`

const StatsList: FC = () => {
  const { t } = useTranslation()
  const [crewPower, clickPower] = usePower()
  const [cards] = useCards()

  return (
    <>
      <StatsListStyled>
        <Stat logo="images/icons/clickPowerIcon.png" label={t("common:click-power")} value={intWithSpaces(clickPower).toString()} />
        <Stat logo="images/icons/crewPowerIcon.png" label={t("common:crew-power")} value={intWithSpaces(crewPower).toString()} />
        <Stat logo="images/icons/poneglyphIcon.png" label={t("common:vivre-cards")} value={`${cards.length} / 3200`} />
        {/* <Stat logo="images/icons/winIcon.png" label="Islands Discovered" value="32" /> */}
      </StatsListStyled>
    </>
  )
}

export default StatsList
