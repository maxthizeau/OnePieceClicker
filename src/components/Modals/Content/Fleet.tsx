import { FC, useState } from "react"
import { ActionButton, ModalSubtitle, SearchInput, TableFilters } from "../ModalStyles"
import { getThumbImageSrc, getUnitAttackPower, getMaximumHP } from "../../../lib/clickerFunctions"
import Table, { TColumn } from "../../Global/Table"
import { IFleetUnit, useGameState } from "../../../lib/hooks/GameContext"
import useFleet from "../../../lib/hooks/useFleet"

const FleetModalContent: FC = () => {
  const gameState = useGameState()
  const [search, setSearch] = useState("")
  const { addToCrew } = useFleet().crewFunctions

  const findIndexCrewFunc = (fleetUnit: IFleetUnit) => gameState.state.crew.findIndex((crewUnit) => crewUnit.fleetId == fleetUnit.id)

  const fleetColumns: TColumn<IFleetUnit>[] = [
    {
      label: "",
      dataKey: "img",
      key: "img",
      render: (record, text) => <img src={getThumbImageSrc(record.unit.id)} />,
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
      label: "Name",
      dataKey: "name",
      key: "name",
      render: (record, text) => record.unit.name,
      sortMode: "string",
    },

    {
      label: "Rarity.",
      dataKey: "stars",
      key: "stars",
      render: (record, text) => record.unit.stars,
      sortMode: "number",
    },
    {
      label: "Level.",
      dataKey: "level",
      key: "level",

      sortMode: "number",
    },

    {
      label: "Max. HP",
      dataKey: "hp",
      key: "hp",
      sort: (a, b) => getMaximumHP(a) - getMaximumHP(b),
      render: (record, _) => {
        return getMaximumHP(record)
      },
    },
    {
      label: "ATK",
      dataKey: "atk",
      key: "atk",
      render: (record, _) => {
        return getUnitAttackPower(record)
      },

      sort: (a, b) => getUnitAttackPower(a) - getUnitAttackPower(b),
    },
    {
      label: "Action",
      dataKey: "action",
      key: "action",
      render: (record, text) => {
        if (findIndexCrewFunc(record) != -1) return <span>In crew</span>
        return (
          <ActionButton
            onClick={() => {
              const res = addToCrew(record)
            }}
          >
            To crew
          </ActionButton>
        )
      },
    },
  ]

  return (
    <>
      <h3>FLEET</h3>
      <ModalSubtitle>All members you recruited in your fleet. You can add them to your crew whenever you want.</ModalSubtitle>
      <TableFilters>
        {/* <FilterButton onClick={() => filterFleetMember(!filterFleet)}>{!filterFleet ? "Hide" : "Show"} fleet members</FilterButton> */}
        <SearchInput placeholder="Search unit" value={search} onChange={(e) => setSearch(e.target.value)} />
      </TableFilters>
      <Table
        style={{ width: "100%", fontSize: "1.2rem", fontFamily: "Courier New, Courier, monospace" }}
        data={gameState.state.fleet.sort((b, a) => a.id - b.id).filter((x) => x.unit.name.toLowerCase().includes(search.toLowerCase()))}
        columns={fleetColumns}
      />
    </>
  )
}

export default FleetModalContent
