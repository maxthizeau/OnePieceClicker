import useTranslation from "next-translate/useTranslation"
import { FC, useEffect, useMemo } from "react"
import styled from "styled-components"
import { getThumbImageSrc, getUnitAttackPower } from "../../../../lib/clickerFunctions"
import { ActionEnum, IFleetUnit, useGameState } from "../../../../lib/hooks/GameContext"
import useStatePersistInCookie from "../../../../lib/hooks/useStatePersistsInCookie"
import { TTypeTraining } from "../../../../lib/types"
import Hover from "../../../Global/Hover"
import CrewHover from "../../../Global/Hover/CrewHover"

const ImageWrapper = styled.div`
  /* width: 100%;
  height: 100%; */
  border: 2px solid transparent;
  display: flex;
  height: 84px;
  width: 84px;
  &:hover {
    border: 2px solid yellow;
    cursor: pointer;
  }

  & img {
    width: 80px;
    height: 80px;
  }
  &.dead-crew {
    filter: grayscale(1) contrast(2) brightness(0.4);
  }
`

const SelectUnitStyled = styled.div`
  width: 100%;
  /* max-height: 300px; */
  margin: 20px 10px;
  /* overflow: scroll; */
  padding: 0px 40px;
  /* position: relative; */
`

const UnitList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px 10px;
  flex-wrap: wrap;

  /* overflow: scroll; */
`

// const UnitWrapper = styled.div``

const ErrorMessage = styled.div`
  height: 25px;
  width: 100%;
  text-align: center;
  font-size: 0.7em;
  color: #2e2e2e;
  font-weight: 0;
  line-height: 1.3em;
`

const Filters = styled.div`
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  display: flex;
  font-family: Open Sans, Verdana, Geneva, Tahoma, sans-serif;
  & img {
    width: 25px;
    height: 25px;
  }
`

const SelectFilter = styled.select`
  /* display: flex; */
`
const FilterInput = styled.input`
  /* display: flex; */
`

const FilterButton = styled.button`
  padding: 10px;
  cursor: pointer;

  &.filtered {
    background-color: #787777;
  }
`

type TSelectedSlot = {
  type: TTypeTraining
  index: number
}

interface ISelectUnitProps {
  selected: TSelectedSlot | null
}

const SelectUnit: FC<ISelectUnitProps> = ({ selected }) => {
  const { t } = useTranslation()
  const gameState = useGameState()
  const [filterShowCrewOnly, setFilterShowCrewOnly] = useStatePersistInCookie("trainingFiltersShowCrewOnly", false)
  const [filterAtkMin, setFilterAtkMin] = useStatePersistInCookie("trainingFiltersAtkMin", 0)
  const [filterLvlMin, setFilterLvlMin] = useStatePersistInCookie("trainingFiltersLvlMin", 0)
  const [filterSortBy, setFilterSortBy] = useStatePersistInCookie<string | undefined>("trainingFiltersSortBy", undefined)
  const [filterSortDesc, setFilterSortDesc] = useStatePersistInCookie("trainingFiltersSortDesc", false)
  const filteredList = useMemo(() => {
    return gameState.state.fleet.filter((x) => {
      const crewCheck = (filterShowCrewOnly && gameState.state.crew.find((y) => y.fleetId == x.id)) || !filterShowCrewOnly
      const atkMinCheck = filterAtkMin == 0 || getUnitAttackPower(x.unit, x.level, x.trainingCount) >= filterAtkMin
      const lvlMinCheck = x.level >= filterLvlMin
      return crewCheck && atkMinCheck && lvlMinCheck
    })
  }, [gameState.state.fleet, filterShowCrewOnly, filterAtkMin, filterLvlMin])
  const sortedList = useMemo(() => {
    return filteredList.sort((a, b) => {
      const finalA: IFleetUnit = filterSortDesc ? a : b
      const finalB: IFleetUnit = filterSortDesc ? b : a
      if (filterSortBy == "baseAtk") return getUnitAttackPower(finalA.unit, 1) - getUnitAttackPower(finalB.unit, 1)
      else if (filterSortBy == "currentAtk")
        return getUnitAttackPower(finalA.unit, finalA.level, finalA.trainingCount) - getUnitAttackPower(finalB.unit, finalB.level, finalB.trainingCount)
      else if (filterSortBy == "level") return finalA.level - finalB.level
      else {
        return 0
      }
    })
  }, [filteredList, filterSortBy, filterSortDesc])

  useEffect(() => {
    // console.log("Use effect")
    if (selected && selected.type == "rayleigh") {
      setFilterLvlMin(100)
    }
    if (selected && selected.type == "xp") {
      setFilterLvlMin(0)
    }
  }, [selected])

  function clickAddUnit(fleetUnitId: number) {
    if (selected) {
      gameState.dispatch({ type: ActionEnum.Training_AddUnit, payload: { training: { fleetUnitId, index: selected?.index, type: selected?.type } } })
    }
  }

  return (
    <SelectUnitStyled>
      <h3>{t("game:Modals.Training.select-unit")} </h3>
      <ErrorMessage>
        {selected === null ? (
          <span style={{ color: "#f3d097" }}>⬆ {t("game:Modals.Training.select-slot-first")} ⬆</span>
        ) : (
          <span style={{ color: "#a1eeae" }}>⬇ {t("game:Modals.Training.select-a-unit")} ⬇</span>
        )}
      </ErrorMessage>
      <Filters>
        <FilterButton
          onClick={() => {
            setFilterShowCrewOnly(!filterShowCrewOnly)
          }}
        >
          {" "}
          {filterShowCrewOnly ? `✅` : `🚫`} {t("game:Modals.Training.show-crew-only")}
        </FilterButton>
        <FilterInput
          placeholder={t("game:Modals.Training.atk-minimum")}
          value={filterAtkMin <= 0 ? "" : filterAtkMin}
          onChange={(e) => {
            const value = e.target.value != "" ? parseInt(e.target.value) : 0
            setFilterAtkMin(value)
          }}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault()
            }
          }}
        />
        <FilterInput
          placeholder={t("game:Modals.Training.lvl-minimum")}
          value={filterLvlMin <= 0 ? "" : filterLvlMin}
          onChange={(e) => {
            let value = e.target.value != "" ? parseInt(e.target.value) : 0
            value = value < 0 ? 0 : value
            value = value > 100 ? 100 : value
            setFilterLvlMin(value)
          }}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault()
            }
          }}
        />
        <SelectFilter onChange={(e) => setFilterSortBy(e.target.value)} value={filterSortBy}>
          <option value={undefined}>{t("game:Modals.Training.sort-by")}</option>
          <option value={"baseAtk"}>{t("game:Modals.Training.base-atk")}</option>
          <option value={"currentAtk"}>{t("game:Modals.Training.current-atk")}</option>
          <option value={"level"}>{t("game:Modals.Training.level")}</option>
        </SelectFilter>
        <FilterButton
          onClick={() => {
            setFilterSortDesc(!filterSortDesc)
          }}
        >
          {" "}
          {filterSortDesc ? "⬇️" : "⬆️"}
        </FilterButton>
        <FilterButton
          onClick={() => {
            setFilterShowCrewOnly(false)
            setFilterAtkMin(0)
            setFilterLvlMin(0)
            setFilterSortBy(undefined)
            setFilterSortDesc(false)
          }}
        >
          {t("common:reset")}
        </FilterButton>
      </Filters>
      <UnitList>
        {sortedList.map((unit) => {
          return (
            <Hover
              key={unit.id}
              hoverContent={<CrewHover fleetUnit={unit} small hideCaptain hideXP hideImg style={{ fontSize: "0.8em" }} />}
              horizontal="center"
              vertical="top"
              //   positionStatic={true}
              offset={{ x: 0, y: 10 }}
            >
              <ImageWrapper onClick={() => clickAddUnit(unit.id)}>
                <img src={getThumbImageSrc(unit.unit.id)} />
              </ImageWrapper>
            </Hover>
          )
        })}
      </UnitList>
    </SelectUnitStyled>
  )
}

export default SelectUnit
