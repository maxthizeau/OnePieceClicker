import { FC, useEffect, useState } from "react"
import { ActionButton, FilterButton, ModalSubtitle, SearchInput, TableFilters } from "../ModalStyles"
import { getMaximumHP, getPriceUnit, getThumbImageSrc, getUnitAttackPower, intWithSpaces } from "../../../lib/clickerFunctions"
import Table, { TColumn } from "../../Global/Table"
import useCards from "../../../lib/hooks/useCards"
import { ICardUnit, useGameState } from "../../../lib/hooks/GameContext"
import { Store } from "react-notifications-component"
import UnitNotification from "../../Global/notifications/UnitNotification"
import { useLogs, ELogType } from "../../../lib/hooks/useLogs"
import { nFormatter } from "../../../lib/utils"
import { BerryIcon } from "../../styled/Globals"
import useTranslation from "next-translate/useTranslation"

const VivreModalContent: FC = () => {
  const { t } = useTranslation()
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
      label: t("game:Tables.table-column-name"),
      dataKey: "name",
      key: "name",
      sortMode: "string",
      align: "left",
    },
    {
      label: t("game:Tables.table-column-cost"),
      dataKey: "cost",
      key: "cost",
      sortMode: "number",
      render: (record, text) => {
        return `${Math.round((record.cost / 65) * 100)}%`
        // return text
      },
    },
    {
      label: t("game:Tables.table-column-rarity"),
      dataKey: "stars",
      key: "stars",
      sortMode: "number",
    },
    {
      label: t("game:Tables.table-column-hplvlmax"),
      dataKey: "HPLvlMax",
      key: "HPLvlMax",
      // sortMode: "number",
      sort: (a, b) => {
        const aHP = getMaximumHP(a, 100)
        const bHP = getMaximumHP(b, 100)
        return aHP - bHP
      },
      render: (record, _) => {
        return getMaximumHP(record, 100)
      },
    },
    {
      label: t("game:Tables.table-column-atklvl1"),
      dataKey: "ATK",
      key: "ATK",

      sort: (a, b) => {
        const aATK = getUnitAttackPower(a, 1)
        const bATK = getUnitAttackPower(b, 1)
        return aATK - bATK
      },
      render: (record, _) => {
        return getUnitAttackPower(record, 1)
      },
    },
    {
      label: t("game:Tables.table-column-price"),
      dataKey: "price",
      key: "price",
      render: (record, _) => {
        const price = getPriceUnit(record)
        return (
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <BerryIcon /> {nFormatter(price, 1)}
          </div>
        )
      },
      sort: (a, b) => {
        const priceA = getPriceUnit(a)
        const priceB = getPriceUnit(b)
        return priceA - priceB
      },
    },
    {
      label: t("game:Tables.table-column-action"),
      dataKey: "action",
      key: "action",
      render: (record, text) => {
        if (findIndexFleetFunc(record) != -1) return <span>{t("game:Tables.table-action-in-fleet")}</span>
        return (
          <ActionButton
            onClick={() => {
              const res = recruitCard(record)
              const notifProps = res.success
                ? {
                    content: <UnitNotification label={res.title ?? t("game:Tables.table-action-recruit-card")} unit={record} />,
                  }
                : {
                    title: res.title,
                    message: res.message,
                  }

              addLog({
                ...notifProps,
                id: `vivreCard-${record.id}`,
                logTypes: [ELogType.VivreCard],
                notification: true,
                type: res.success == true ? "success" : "warning", // 'default', 'success', 'info', 'warning'
              })
            }}
          >
            {t("game:Tables.table-action-recruit")}
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
      <h3>{t("game:Modals.VivreCard.vivre-card-label")}</h3>
      <ModalSubtitle>{t("game:Modals.VivreCard.vivre-card-description")}</ModalSubtitle>
      <TableFilters>
        <FilterButton onClick={() => filterFleetMember(!filterFleet)}>
          {!filterFleet ? t("common:hide") : t("common:show")} {t("game:Modals.VivreCard.fleet-members")}
        </FilterButton>
        <SearchInput placeholder={t("game:Modals.VivreCard.search-unit")} value={search} onChange={(e) => setSearch(e.target.value)} />
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
