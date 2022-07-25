import useTranslation from "next-translate/useTranslation"
import { FC } from "react"
import styled from "styled-components"
import { getMaximumHP, getThumbImageSrc, getUnitAttackPower } from "../../../lib/clickerFunctions"
import { IFleetUnit, useGameState } from "../../../lib/hooks/GameContext"
import useFleet from "../../../lib/hooks/useFleet"
import useStatePersistInCookie from "../../../lib/hooks/useStatePersistsInCookie"
import Table, { TColumn } from "../../Global/Table"
import { ActionButton, ModalSubtitle, SearchInput, TableFilters } from "../ModalStyles"

const ExtraModalStyles = styled.div`
  /* overflow: scroll;
  position: static; */
`

const FleetModalContent: FC = () => {
  const gameState = useGameState()
  const [search, setSearch] = useStatePersistInCookie("fleetSearchByName", "")
  const [showLvl1, setShowLvl1] = useStatePersistInCookie("fleetShowLvl1", false)
  const { addToCrew } = useFleet().crewFunctions
  const { t } = useTranslation()
  const findIndexCrewFunc = (fleetUnit: IFleetUnit) => gameState.state.crew.findIndex((crewUnit) => crewUnit.fleetId == fleetUnit.id)

  const fleetColumns: TColumn<IFleetUnit>[] = [
    {
      label: "",
      dataKey: "img",
      key: "img",
      render: (record, text) => {
        return <img src={getThumbImageSrc(record.unit.id)} />
      },
      sortMode: false,
    },
    {
      label: "#",
      dataKey: "id",
      key: "id",
      render: (record, text) => record.id,
      sortMode: true,
    },

    {
      label: t("game:Tables.table-column-name"),
      dataKey: "name",
      key: "name",
      render: (record, text) => record.unit.name,
      sortMode: "string",
    },

    {
      label: t("game:Tables.table-column-rarity"),
      dataKey: "stars",
      key: "stars",
      render: (record, text) => record.unit.stars,
      sortMode: "number",
    },
    {
      label: t("game:Tables.table-column-level"),
      dataKey: "level",
      key: "level",
      sortMode: "number",
    },

    {
      label: "Max. HP",
      dataKey: "hp",
      key: "hp",
      sort: (a, b) => {
        const maxA = showLvl1 ? getMaximumHP(a.unit, 1) : getMaximumHP(a.unit, a.level)
        const maxB = showLvl1 ? getMaximumHP(b.unit, 1) : getMaximumHP(b.unit, b.level)
        return maxA - maxB
      },
      render: (record, _) => {
        const hp = showLvl1 ? getMaximumHP(record.unit, 1) : getMaximumHP(record.unit, record.level)
        return hp
      },
    },
    {
      label: "ATK",
      dataKey: "atk",
      key: "atk",
      render: (record, _) => {
        const atk = showLvl1 ? getUnitAttackPower(record.unit, 1) : getUnitAttackPower(record.unit, record.level, record.trainingCount)
        return atk
      },

      sort: (a, b) => {
        const atkA = showLvl1 ? getUnitAttackPower(a.unit, 1) : getUnitAttackPower(a.unit, a.level, a.trainingCount)
        const atkB = showLvl1 ? getUnitAttackPower(b.unit, 1) : getUnitAttackPower(b.unit, b.level, b.trainingCount)
        return atkA - atkB
      },
    },
    {
      label: t("game:Tables.table-column-action"),
      dataKey: "action",
      key: "action",
      render: (record, text) => {
        if (findIndexCrewFunc(record) != -1) return <span>{t("game:Tables.table-action-in-crew")}</span>
        return (
          <ActionButton
            onClick={() => {
              const res = addToCrew(record)
            }}
          >
            {t("game:Tables.table-action-to-crew")}
          </ActionButton>
        )
      },
    },
  ]

  return (
    <ExtraModalStyles>
      <h3>{t("game:Modals.Fleet.fleet-label")}</h3>
      <ModalSubtitle>{t("game:Modals.Fleet.fleet-modal-subtitle")}</ModalSubtitle>
      <TableFilters>
        {/* <FilterButton onClick={() => filterFleetMember(!filterFleet)}>{!filterFleet ? "Hide" : "Show"} fleet members</FilterButton> */}
        <SearchInput placeholder="Search unit" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button onClick={() => setShowLvl1(!showLvl1)}>
          {showLvl1 ? `✅` : `🚫`} {t("game:Modals.Fleet.show-lvl1-stats")}
        </button>
      </TableFilters>
      <Table
        tableKey="fleetCardTable"
        style={{ width: "100%", fontSize: "1.2rem", fontFamily: "Courier New, Courier, monospace" }}
        data={gameState.state.fleet
          .sort((b, a) => a.id - b.id)
          .filter((x) => x.unit.name.toLowerCase().includes(search !== undefined ? search.toLowerCase() : ""))}
        columns={fleetColumns}
        pagination={{ itemPerPage: 9 }}
      />
    </ExtraModalStyles>
  )
}

export default FleetModalContent
