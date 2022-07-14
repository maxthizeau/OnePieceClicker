import { CSSProperties, PropsWithChildren, useState } from "react"
import { render } from "react-dom"
import styled from "styled-components"

const TableStyled = styled.table`
  border: 1px solid black;

  border-collapse: collapse;

  & thead {
    background: #000;
    color: white;
  }

  & tbody tr {
    background-color: white;

    &:nth-of-type(odd) {
      background: #f1f1f1;
    }
  }

  & tbody tr:hover {
    background-color: #e9e9e9;
  }

  & td,
  th {
    padding: 5px 10px;
  }

  & th.sortable {
    cursor: pointer;
  }

  & .left-align {
    text-align: left;
  }
  & .center-align {
    text-align: center;
  }
  & .right-align {
    text-align: right;
  }

  & td img {
    width: 60px;
  }
`

// enum Key {
//   id = "id",
//   name = "name",
//   lvl = "cost",
//   hp = "HPLvlMax",
//   atk = "ATKLvlMax",
// }

type TSortBy = {
  key: string
  order: "asc" | "desc"
}

export type TColumn<T> = {
  label: string
  key: string
  dataKey: string
  render?: (record: T, text: string) => any
  sort?: (a: T, b: T) => number
  sortMode?: "string" | "number" | boolean
  align?: "left" | "right" | "center"
}

// If "sort" func is specified : takes priority
// If "sort" func is not specified but sortMode is (and is not false), sort with the sortMode (by number, by string, or by defaultSort Function)

interface ITableProps<T extends object> {
  columns: TColumn<T>[]
  data: any[]
  style?: CSSProperties
}

const Table = <T extends Object>(props: ITableProps<T>) => {
  const [sortBy, setSortBy] = useState<TSortBy | null>(null)

  const sort = (key: string | null) => {
    if (!key) {
      setSortBy(null)
      return
    }
    if (sortBy && key == sortBy.key) {
      setSortBy({ ...sortBy, order: sortBy.order == "asc" ? "desc" : "asc" })
    } else {
      setSortBy({ key, order: "asc" })
    }
  }

  const defaultSort = (a: any, b: any) => {
    if (!sortBy) return 0
    const parsedA: number =
      typeof a[sortBy.key] == "number" ? (a[sortBy.key] as number) : typeof a[sortBy.key] == "string" ? parseInt(a[sortBy.key] as string) : 0
    const parsedB: number =
      typeof b[sortBy.key] == "number" ? (b[sortBy.key] as number) : typeof b[sortBy.key] == "string" ? parseInt(b[sortBy.key] as string) : 0
    return sortBy.order == "asc" ? parsedA - parsedB : parsedB - parsedA
  }

  const stringSort = (a: any, b: any): number => {
    if (!sortBy) return 0
    const stringA = a[sortBy.key].toString()
    const stringB = b[sortBy.key].toString()
    if (sortBy.order == "asc") return stringA.localeCompare(stringB)
    else return stringB.localeCompare(stringA)
  }

  const sortData = (a: any, b: any): number => {
    if (!sortBy) return 0
    const columnSorted = props.columns.find((col) => col.dataKey == sortBy?.key)
    const columnSortFunction = columnSorted?.sort
    const columnSortMode = columnSorted?.sortMode

    if (columnSortFunction) {
      const sortResult = columnSortFunction(a, b)
      return sortBy.order === "asc" ? sortResult : sortResult * -1
    } else if (columnSortMode === true || columnSortMode === "number") {
      return defaultSort(a, b)
    } else if (columnSortMode == "string") {
      return stringSort(a, b)
    } else {
      return 0
    }
  }

  const isSortable = (column: TColumn<T>) => {
    return column.sort !== undefined || column.sortMode
  }

  const render = (row: any, dataKey: string): string => {
    const columnRender = props.columns.find((col) => col.dataKey == dataKey)?.render

    if (columnRender) {
      return columnRender(row, row[dataKey])
    } else {
      return row[dataKey]
    }
  }

  return (
    <>
      <TableStyled style={props.style}>
        <thead>
          <tr>
            {props.columns.map((column) => {
              const sortable = isSortable(column)
              const sortSign = sortBy?.key == column.dataKey ? (sortBy.order == "asc" ? "⬆️" : "⬇️") : ""
              const classnames = `${sortable && "sortable"} ${column.align ? `${column.align}-align` : ""}`
              return (
                <th
                  key={column.key}
                  className={classnames}
                  onClick={() => {
                    sortable && sort(column.dataKey)
                  }}
                >
                  {column.label} {sortSign}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {props.data.sort(sortData).map((row, index) => {
            return (
              <tr key={`${index}`}>
                {props.columns.map((column, columnIndex) => {
                  return (
                    <td className={column.align ? `${column.align}-align` : ""} key={`column-${column.dataKey}-${index}`}>
                      {render(row, column.dataKey)}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </TableStyled>
    </>
  )
}

export default Table
