import { FC } from "react"
import styled from "styled-components"
import { intWithSpaces } from "../../lib/clickerFunctions"
import { useGameState } from "../../lib/hooks/GameContext"
import useCards from "../../lib/hooks/useCards"
import usePower from "../../lib/hooks/usePower"
import Currency from "../Currencies/Currency"
import Stat from "./Stat"

const StatsListStyled = styled.div`
  color: white;
  font-size: 0.9em;
  text-transform: uppercase;
  padding-left: 20px;
  font-weight: 0;
  margin-top: 10px;
`

const StatsList: FC = () => {
  const [crewPower, clickPower] = usePower()
  const [cards] = useCards()
  const gameState = useGameState()
  return (
    <>
      <StatsListStyled>
        <Stat logo="images/icons/clickPowerIcon.png" label="Click Power" value={intWithSpaces(clickPower).toString()} />
        <Stat logo="images/icons/crewPowerIcon.png" label="Crew Power" value={intWithSpaces(crewPower).toString()} />
        {/* <Stat logo="images/icons/winIcon.png" label="Islands Discovered" value="32" /> */}
        <Stat logo="images/icons/poneglyphIcon.png" label="Vivre Cards" value={`${cards.length} / 3200`} />
      </StatsListStyled>
    </>
  )
}

export default StatsList
