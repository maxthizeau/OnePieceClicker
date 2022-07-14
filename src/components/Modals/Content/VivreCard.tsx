import { FC, useEffect, useState } from "react"
import { ActionButton, FilterButton, ModalSubtitle, SearchInput, TableFilters } from "../ModalStyles"
import { getMaximumHP, getThumbImageSrc, getUnitAttackPower, intWithSpaces } from "../../../lib/clickerFunctions"
import Table, { TColumn } from "../../Global/Table"
import useCards from "../../../lib/hooks/useCards"
import { ICardUnit, useGameState } from "../../../lib/hooks/GameContext"
import { Store } from "react-notifications-component"
import UnitNotification from "../../Global/notifications/UnitNotification"
import useLogs, { ELogType } from "../../../lib/hooks/useLogs"

const VivreModalContent: FC = () => {
  const [cards, _, recruitCard] = useCards()
  const gameState = useGameState()
  const [data, setData] = useState<ICardUnit[]>([])
  const [filterFleet, setFilterFleet] = useState(false)
  const [search, setSearch] = useState("")
  const { addLog } = useLogs()

  const findIndexFleetFunc = (cardUnit: ICardUnit) => gameState.state.fleet.findIndex((fleetUnit) => fleetUnit.unit.id == cardUnit.id)

  const cardsColumns: TColumn<ICardUnit>[] = [
    {
      label: "",
      dataKey: "img",
      key: "img",
      render: (record, text) => <img src={getThumbImageSrc(record.id)} />,
      sortMode: false,
    },
    {
      label: "#",
      dataKey: "lootOrder",
      key: "lootOrder",

      sort: (a, b) => a.lootOrder - b.lootOrder,
    },

    {
      label: "Name",
      dataKey: "name",
      key: "name",
      sortMode: "string",
      align: "left",
    },
    {
      label: "Cost.",
      dataKey: "cost",
      key: "cost",
      sortMode: "number",
    },
    {
      label: "Rarity.",
      dataKey: "stars",
      key: "stars",
      sortMode: "number",
    },
    {
      label: "HP Lvl Max",
      dataKey: "HPLvl1",
      key: "HPLvl1",
      // sortMode: "number",
      sort: (a, b) => {
        const aHP = getMaximumHP({ id: 0, unit: a, level: 100, xp: 0, hp: 0 })
        const bHP = getMaximumHP({ id: 0, unit: b, level: 100, xp: 0, hp: 0 })
        return aHP - bHP
      },
      render: (record, _) => {
        return getMaximumHP({ id: 0, unit: record, level: 100, xp: 0, hp: 0 })
      },
    },
    {
      label: "ATK Lvl 1",
      dataKey: "ATK",
      key: "ATK",

      sort: (a, b) => {
        const aATK = getUnitAttackPower({ id: 0, unit: a, level: 1, xp: 0, hp: 0 })
        const bATK = getUnitAttackPower({ id: 0, unit: b, level: 1, xp: 0, hp: 0 })
        return aATK - bATK
      },
      render: (record, _) => {
        return getUnitAttackPower({ id: 0, unit: record, level: 1, xp: 0, hp: 0 })
      },
    },
    {
      label: "Price",
      dataKey: "price",
      key: "price",
      render: (record, _) => {
        const { HPLvlMax, ATKLvl1, cost, stars, maxLvl } = record
        const price = (ATKLvl1 + HPLvlMax) * maxLvl * cost * stars * 10
        return intWithSpaces(price) + " $"
      },
      sort: (a, b) => {
        const priceA = (a.ATKLvl1 + a.HPLvlMax) * a.maxLvl * a.cost * a.stars * 10
        const priceB = (b.ATKLvl1 + b.HPLvlMax) * b.maxLvl * b.cost * b.stars * 10
        return priceA - priceB
      },
    },
    {
      label: "Action",
      dataKey: "action",
      key: "action",
      render: (record, text) => {
        if (findIndexFleetFunc(record) != -1) return <span>In Fleet</span>
        return (
          <ActionButton
            onClick={() => {
              const res = recruitCard(record)
              const notifProps = res.success
                ? {
                    content: <UnitNotification label={res.title ?? "Recruit card"} unit={record} />,
                  }
                : {
                    title: res.title,
                    message: res.message,
                  }

              addLog({
                ...notifProps,
                logTypes: [ELogType.VivreCard],
                notification: true,
                type: res.success == true ? "success" : "warning", // 'default', 'success', 'info', 'warning'
              })
            }}
          >
            Recruit
          </ActionButton>
        )
      },
    },
  ]

  const setBaseData = () => {
    setData(cards)
  }

  const filterFleetMember = (val: boolean) => {
    if (val) {
      setData(data.filter((cardUnit) => findIndexFleetFunc(cardUnit) == -1))
    } else {
      setBaseData()
    }
    setFilterFleet(val)
  }

  useEffect(() => {
    // setData(cards.sort((b, a) => a.lootOrder - b.lootOrder))
    filterFleetMember(filterFleet)
  }, [gameState.state.cards, gameState.state.fleet])

  return (
    <>
      <h3>VIVRE CARDS</h3>
      <ModalSubtitle>All the vivre cards you found are here. You can use them to recruit pirates into your fleet.</ModalSubtitle>
      <TableFilters>
        <FilterButton onClick={() => filterFleetMember(!filterFleet)}>{!filterFleet ? "Hide" : "Show"} fleet members</FilterButton>
        <SearchInput placeholder="Search unit" value={search} onChange={(e) => setSearch(e.target.value)} />
      </TableFilters>
      <Table
        style={{ width: "100%", fontSize: "1.2rem", fontFamily: "Courier New, Courier, monospace" }}
        data={data.filter((x) => x.name.toLowerCase().includes(search.toLowerCase()))}
        columns={cardsColumns}
      />
    </>
  )
}

export default VivreModalContent
