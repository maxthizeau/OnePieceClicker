import { FC, useState } from "react"
import styled from "styled-components"
import { zones } from "../../../lib/data/zones"
import useGoals from "../../../lib/hooks/useGoals"
import { EGoalRewardCurrency, EGoalType, TGoal } from "../../../lib/types"
import { getThumbImageSrc, idNumberToString, intWithSpaces } from "../../../lib/clickerFunctions"
import { useGameState } from "../../../lib/hooks/GameContext"
import { getPrintableRewardCurrency, goalToString } from "../../../lib/goalsFunctions"
import useTranslation from "next-translate/useTranslation"

const ExtraModalStyles = styled.div`
  width: 800px;
  height: 800px;
  & h3 {
    text-align: center;
    margin: 10px 0px;
  }
`

const GoalBoxStyled = styled.div`
  padding: 20px;

  border-radius: 3px;
  border: 3px solid #b9896e;
  outline: 2px solid black;
  background: #eee2ba;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  column-gap: 70px;

  /* flex: 1; */
  margin-bottom: 20px;

  & img {
    width: 50px;
    height: 50px;
  }
`

const GoalText = styled.div`
  flex-grow: 1;
`
const GoalRewardText = styled.div`
  font-family: Open Sans, Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1.1em;
  margin-top: 10px;
`

const RewardLogo = styled.span<{ src: string }>`
  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 24px;
    height: 24px;
    background-image: url(${(props) => props.src});
    background-size: contain;
    background-repeat: no-repeat;
    margin-left: 10px;
  }
`

const Filters = styled.div`
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  display: flex;
  & img {
    width: 25px;
    height: 25px;
  }
`

const SelectZone = styled.select`
  /* display: flex; */
`

const GoalButton = styled.button`
  padding: 10px;
  cursor: pointer;

  &.filtered {
    background-color: #787777;
  }
`

interface IGoalBoxProps {
  goal: TGoal
  select: () => void
}

interface IGoalFilters {
  killEnemies: boolean
  clearDungeon: boolean
  vivreCard: boolean
  mineEnergy: boolean
  mineLoot: boolean
  zone: number
}

const defaultFilters: IGoalFilters = {
  killEnemies: false,
  clearDungeon: false,
  vivreCard: false,
  mineEnergy: false,
  mineLoot: false,
  zone: -1,
}

const GoalBox: FC<IGoalBoxProps> = ({ goal, select }) => {
  const { t } = useTranslation()
  const { logo, goalKey, location, value } = goalToString(goal)
  const { amount, logo: rewardLogo } = getPrintableRewardCurrency(goal)
  return (
    <GoalBoxStyled>
      <img src={`images/icons/${logo}.png`} />
      <GoalText>
        <div>{t(`game:Goals.${goalKey}-label`, { value: value, location: t(`zones:${goal.zoneId}-${location}`) })}</div>
        <GoalRewardText>
          {t("game:Modals.Goals.goal-reward")} {amount} <RewardLogo src={rewardLogo} />
        </GoalRewardText>
      </GoalText>
      <GoalButton onClick={select}>{t("common:select")}</GoalButton>
    </GoalBoxStyled>
  )
}

function formatFilters(filters: IGoalFilters): EGoalType[] {
  const result = []
  if (filters.clearDungeon) {
    result.push(EGoalType.CLEAR_DUNGEON)
  }
  if (filters.killEnemies) {
    result.push(EGoalType.KILL_ENEMIES)
  }
  if (filters.vivreCard) {
    result.push(EGoalType.LOOT_VIVRECARD)
  }
  if (filters.mineEnergy) {
    result.push(EGoalType.MINE_ENERGY)
  }
  if (filters.mineLoot) {
    result.push(EGoalType.MINE_LOOT)
  }
  return result
}

const GoalsModalContent: FC = () => {
  const { t } = useTranslation()
  const { maxZoneId } = useGameState().state
  const { getPossibleGoals, setCurrentGoal } = useGoals()
  const [filters, setFilters] = useState(defaultFilters)
  return (
    <ExtraModalStyles>
      <h3>{t("game:Modals.Goals.goal-label")}</h3>
      <Filters>
        <GoalButton
          className={filters.killEnemies ? `filtered` : ``}
          onClick={() => {
            setFilters({ ...filters, killEnemies: !filters.killEnemies })
          }}
        >
          <img src={`images/icons/crewPowerIcon.png`} />
        </GoalButton>
        <GoalButton
          className={filters.clearDungeon ? `filtered` : ``}
          onClick={() => {
            setFilters({ ...filters, clearDungeon: !filters.clearDungeon })
          }}
        >
          <img src={`images/icons/logPoseIcon.png`} />
        </GoalButton>
        <GoalButton
          className={filters.vivreCard ? `filtered` : ``}
          onClick={() => {
            setFilters({ ...filters, vivreCard: !filters.vivreCard })
          }}
        >
          <img src={`images/icons/memberIcon.png`} />
        </GoalButton>
        <GoalButton
          className={filters.mineEnergy ? `filtered` : ``}
          onClick={() => {
            setFilters({ ...filters, mineEnergy: !filters.mineEnergy })
          }}
        >
          <img src={`images/icons/energyRefillcon.png`} />
        </GoalButton>
        <GoalButton
          className={filters.mineLoot ? `filtered` : ``}
          onClick={() => {
            setFilters({ ...filters, mineLoot: !filters.mineLoot })
          }}
        >
          <img src={`images/icons/diamondIcon.png`} />
        </GoalButton>
        <SelectZone onChange={(e) => setFilters({ ...filters, zone: parseInt(e.target.value) })}>
          <option value={-1}>{t("game:Modals.Goals.filter-by-zone")}</option>
          {zones.map((x) => {
            if (x.id > maxZoneId) {
              return
            }
            return (
              <option value={x.id} key={`option-${x.id}`}>
                {t(`zones:${x.id}-${x.location}`)}
              </option>
            )
          })}
        </SelectZone>
        <GoalButton onClick={() => setFilters(defaultFilters)}>{t("common:reset")}</GoalButton>
      </Filters>
      {getPossibleGoals({ hideTypes: formatFilters(filters), zone: filters.zone }).map((x) => {
        return <GoalBox key={x.id} goal={x} select={() => setCurrentGoal(x.id)} />
      })}
    </ExtraModalStyles>
  )
}

export default GoalsModalContent
