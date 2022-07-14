import { FC } from "react"
import styled from "styled-components"
import { useGameState } from "../../lib/hooks/GameContext"

const ItemListStyled = styled.div`
  display: flex;
  margin-top: 15px;
  font-family: "Open Sans", "Verdana", "Arial";
  width: 100%;

  border: 3px solid #eee2ba;
  outline: 2px solid black;
  background: #b9896e;
  border-radius: 3px;
  font-size: 1em;
  padding: 2px;
  margin-bottom: 20px;
`

const ItemTable = styled.table`
  background-color: #b9896e;
  border-collapse: collapse;
  width: 100%;
  letter-spacing: -0.1em;
  table-layout: fixed;

  & tr td {
    /* border: 1px solid white; */
    padding: 5px;
    text-align: center;
  }

  & tr td img {
    width: 25px;
    height: 25px;
  }

  .timer {
    font-family: "Courier New", Courier, monospace;
  }
`

const ItemList: FC = () => {
  const gameState = useGameState()
  return (
    <>
      <ItemListStyled>
        <ItemTable>
          <tr>
            <td>
              <img src="images/icons/logPoseIcon.png" />
            </td>
            <td>
              <img src="images/icons/foodIcon.png" />
            </td>
            <td>
              <img src="images/icons/demonFruitIcon.png" />
            </td>
            <td>
              <img src="images/icons/colaIcon.png" />
            </td>
            <td>
              <img src="images/icons/dendenmushiIcon.png" />
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>1</td>
            <td>0</td>
            <td>2</td>
            <td>219</td>
          </tr>
          <tr className="timer">
            <td>00:30</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </ItemTable>
      </ItemListStyled>
    </>
  )
}

export default ItemList
