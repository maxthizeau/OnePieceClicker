import useTranslation from "next-translate/useTranslation"
import { FC } from "react"
import styled from "styled-components"
import { intWithSpaces } from "../../lib/clickerFunctions"
import useCards from "../../lib/hooks/useCards"
import usePower from "../../lib/hooks/usePower"
import Stat from "./Stat"

const StatsListStyled = styled.div`
  color: white;
  font-size: 0.9em;
  text-transform: uppercase;
  padding-left: 20px;
  font-weight: 0;
  margin-top: -20px;
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
        <Stat logo="images/icons/poneglyphIcon.png" label={t("common:vivre-cards")} value={`${cards.length} / 3487`} />
        {/* <Stat logo="images/icons/winIcon.png" label="Islands Discovered" value="32" /> */}
      </StatsListStyled>
    </>
  )
}

export default StatsList
