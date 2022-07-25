import { CSSProperties, useCallback, useMemo, useState } from "react"
import styled from "styled-components"
import useStatePersistInCookie from "../../lib/hooks/useStatePersistsInCookie"

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

const Pagination = styled.ul`
  margin: 30px auto;
  text-align: center;
  font-family: Open Sans, Verdana, Geneva, Tahoma, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  font-size: 16px;

  & li {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 5px;

    & input {
      width: 30px;
      text-align: center;
      margin-right: 3px;
      padding: 3px 0px;
      /* padding: 1px 0px; */
    }
  }
  & .pagination-button {
    cursor: pointer;
  }
`

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
  tableKey: string
  columns: TColumn<T>[]
  data: any[]
  style?: CSSProperties
  pagination?: {
    itemPerPage?: number
  }
}

const Table = <T extends Object>(props: ITableProps<T>) => {
  const [sortBy, setSortBy] = useStatePersistInCookie<TSortBy | null>(props.tableKey, null)
  const [page, setPage] = useState(1)

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

  const sortData = useCallback(
    (a: any, b: any): number => {
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
    },
    [sortBy]
  )

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

  const maxPage = useMemo(() => {
    return props.pagination !== undefined ? Math.ceil(props.data.length / props.pagination.itemPerPage) : 1
  }, [props.data, props.pagination])

  const sortedData = useMemo(() => {
    const data = props.data.sort(sortData)
    if (props.pagination === undefined) {
      return data
    } else {
      const pageSize = props.pagination.itemPerPage
      const currentPage = page < 1 ? 1 : page > pageSize ? pageSize : page
      return data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    }
  }, [props.data, sortBy, page])

  const changePage = (newPage) => {
    // if (newPage >= 1 && newPage <= maxPage) {
    setPage(newPage)
    // }
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
          {sortedData.map((row, index) => {
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
      {props.pagination !== undefined && (
        <Pagination>
          <li className="pagination-button" onClick={() => changePage(page - 1)}>
            ←
          </li>
          <li>
            <input
              value={page}
              onChange={(e) => {
                const value = e.target.value != "" ? parseInt(e.target.value) : 0
                changePage(value)
              }}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
            />{" "}
            / {maxPage}
          </li>
          <li className="pagination-button" onClick={() => changePage(page + 1)}>
            →
          </li>
        </Pagination>
      )}
    </>
  )
}

export default Table
