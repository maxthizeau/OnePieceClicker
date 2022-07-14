import { TColumn } from "../components/Global/Table"
import { getThumbImageSrc, intWithSpaces } from "./clickerFunctions"
import { IFleetUnit } from "./hooks/GameContext"
import { TUnit } from "./types"

export const cardsColumns: TColumn<TUnit>[] = [
  {
    label: "",
    dataKey: "img",
    key: "img",
    render: (record, text) => <img src={getThumbImageSrc(record.id)} />,
    sortMode: false,
  },
  {
    label: "#",
    dataKey: "id",
    key: "id",
    sortMode: true,
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
    label: "HP",
    dataKey: "HPLvlMax",
    key: "HPLvlMax",
    sortMode: "number",
  },
  {
    label: "ATK",
    dataKey: "ATKLvlMax",
    key: "ATKLvlMax",
    sortMode: "number",
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
]

export const fleetColumns: TColumn<IFleetUnit>[] = [
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
    label: "HP",
    dataKey: "hp",
    key: "hp",
    sortMode: "number",
  },
  {
    label: "ATK",
    dataKey: "atk",
    key: "atk",
    render: (record, text) => {
      const { ATKLvlMax, stars, maxLvl } = record.unit
      return Math.round(ATKLvlMax + ((ATKLvlMax * stars) / maxLvl) * record.level)
    },

    sortMode: "number",
  },
]

export const crewColumns: TColumn<IFleetUnit>[] = [
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
    label: "xp.",
    dataKey: "xp",
    key: "xp",
    sortMode: "number",
    render: (record, text) => `${text} / ${record.level * 300}`,
  },

  {
    label: "HP",
    dataKey: "hp",
    key: "hp",
    sortMode: "number",
  },
  {
    label: "ATK",
    dataKey: "atk",
    key: "atk",
    render: (record, text) => {
      const { ATKLvlMax, stars, maxLvl } = record.unit
      return Math.round(ATKLvlMax + ((ATKLvlMax * stars) / maxLvl) * record.level)
    },

    sortMode: "number",
  },
]
