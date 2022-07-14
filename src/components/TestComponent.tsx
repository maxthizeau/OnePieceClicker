import { useEffect, useState } from "react"
import styled from "styled-components"
import { EInstance } from "../lib/enums"
import { useGameState, ActionEnum, TUpgrade } from "../lib/hooks/GameContext"
import { cardsColumns, crewColumns, fleetColumns } from "../lib/tableColumns"
import { TUnit } from "../lib/types"
import { columns } from "../pages/testTable"
import Table from "./Global/Table"
import { intWithSpaces } from "../lib/clickerFunctions"

import useInterval from "../lib/hooks/useInterval"
import { Store } from "react-notifications-component"
import CardLootNotification from "./Global/notifications/UnitNotification"
import UnitNotification from "./Global/notifications/UnitNotification"
const dataSource: TUnit[] = require("../lib/data/units.json")

const BlackButton = styled.button`
  background: #2a2a2a;
  padding: 10px;
  margin: 20px;
  border: 1px solid white;
`

const TableBlock = styled.div`
  /* max-height: 500px; */
  overflow: scroll;
  width: 100%;

  & h3 {
    text-align: center;
    color: white;
  }
`

const ButtonList = styled.div`
  text-align: center;
  & button {
    background: grey;
    border-radius: 5px;
    margin: 20px;
    cursor: pointer;
    padding: 10px;
  }
`

const TestComponent = () => {
  const gameState = useGameState()
  const [show, setShow] = useState<string>("")

  let crewPower = 1
  for (let i = 0; i < gameState.state.crew.length; i++) {
    const fleetUnit = gameState.state.fleet.find((x) => gameState.state.crew[i].fleetId == x.id)
    // console.log(i, fleetUnit)
    if (!fleetUnit) break
    const { ATKLvlMax, stars, maxLvl } = fleetUnit.unit
    const unitATK = Math.round(ATKLvlMax + ((ATKLvlMax * stars) / maxLvl) * fleetUnit.level)
    // console.log(unitATK)
    crewPower = crewPower * Math.round(unitATK / 500)
    // console.log("Crew power : ", crewPower)
  }

  // useInterval(() => {
  //   // console.log("HIIII !")
  // }, 1000)

  const upgrades = ["ClickPower", "CrewPower", "LootChance", "XP", "Berry", "Heal", "AutoHeal", "AutoRecruit"]

  return (
    <div style={{ color: "white" }}>
      <p>Instance : {EInstance[gameState.state.instance]}</p>
      <p>{gameState.state.berries} Berries</p>

      {/* <p>{JSON.stringify(gameState.state.items)} Items</p> */}
      <div>
        <BlackButton
          onClick={() => {
            Store.addNotification({
              title: "Dropbox",
              message: "Files were synced",
              type: "success", // 'default', 'success', 'info', 'warning'
              container: "top-left", // where to position the notifications
              animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
              animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
              dismiss: {
                duration: 3000,
                onScreen: true,
              },
            })
          }}
        >
          Push base notif
        </BlackButton>
        <BlackButton
          onClick={() => {
            Store.addNotification({
              content: <UnitNotification unit={gameState.state.cards?.[0]} label="Loot" />,
              container: "top-left", // where to position the notifications
              animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
              animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
              dismiss: {
                duration: 3000,
              },
            })
          }}
        >
          Push notif custom
        </BlackButton>
        <BlackButton
          onClick={() => {
            gameState.dispatch({ type: ActionEnum.AddBerries, payload: { berriesChange: 10005 } })
          }}
        >
          Add Berry
        </BlackButton>
        <BlackButton
          onClick={() => {
            gameState.dispatch({
              type: ActionEnum.Import,
              payload: {
                berriesChange: 832,
                cards: [dataSource[2], dataSource[4], dataSource[9]],
              },
            })
          }}
        >
          Import full state
        </BlackButton>
        <BlackButton
          onClick={() => {
            gameState.dispatch({
              type: ActionEnum.LootCard,
              payload: { cards: [dataSource[Math.round(Math.random() * dataSource.length)]] },
            })
          }}
        >
          Loot card
        </BlackButton>

        <BlackButton
          onClick={() => {
            gameState.dispatch({
              type: ActionEnum.ChangeInstance,
              payload: { instance: EInstance.Clicker },
            })
          }}
        >
          Clicker Instance
        </BlackButton>
        <BlackButton
          onClick={() => {
            gameState.dispatch({
              type: ActionEnum.ChangeInstance,
              payload: { instance: EInstance.Zone },
            })
          }}
        >
          Zone Instance
        </BlackButton>
        <BlackButton
          onClick={() => {
            const unit = gameState.state.cards[Math.round(Math.random() * gameState.state.cards.length)]
            if (!unit) return null

            gameState.dispatch({
              type: ActionEnum.RecruitCard,
              payload: {
                addFleet: [
                  {
                    unit: unit,
                    level: Math.round(Math.random() * 100) + 1,
                    xp: 0,
                    hp: unit.HPLvlMax,
                  },
                ],
                berriesChange: 1000,
              },
            })
          }}
        >
          Recruit to fleet
        </BlackButton>
        <BlackButton
          onClick={() => {
            const unit = gameState.state.fleet[Math.round(Math.random() * gameState.state.fleet.length)]
            if (!unit) return null
            gameState.dispatch({
              type: ActionEnum.AddToCrew,
              payload: {
                crew: {
                  fleetId: unit.id,
                },
              },
            })
          }}
        >
          Fleet --&gt; Crew
        </BlackButton>
        <BlackButton
          onClick={() => {
            const unit = gameState.state.crew[Math.round(Math.random() * gameState.state.crew.length)]
            if (!unit) return null
            gameState.dispatch({
              type: ActionEnum.RemoveFromCrew,
              payload: {
                crew: {
                  fleetId: unit.fleetId,
                },
              },
            })
          }}
        >
          Remove from crew
        </BlackButton>
        <BlackButton
          onClick={() => {
            const rng = Math.round(Math.random() * (gameState.state.crew.length - 1))
            const unit = gameState.state.crew[rng]
            if (!unit) return null
            gameState.dispatch({
              type: ActionEnum.GainXP,
              payload: {
                crew: {
                  fleetId: unit.fleetId,
                },
                gainXP: 50000,
              },
            })
          }}
        >
          Gain XP
        </BlackButton>
      </div>

      <hr />
      <ButtonList>
        <button onClick={() => setShow("cards")}>Cards</button>
        <button onClick={() => setShow("fleet")}>Fleet</button>
        <button onClick={() => setShow("crew")}>Crew</button>
        <button onClick={() => setShow("upgrades")}>Upgrades</button>
      </ButtonList>

      <TableBlock>
        {show == "cards" && (
          <>
            <h3>Cards</h3>
            <Table columns={cardsColumns} data={gameState.state.cards} style={{ fontFamily: "arial", color: "black", width: "100%", textAlign: "center" }} />
          </>
        )}
        {show == "fleet" && (
          <>
            <h3>Fleet</h3>
            <Table columns={fleetColumns} data={gameState.state.fleet} style={{ fontFamily: "arial", color: "black", width: "100%", textAlign: "center" }} />
          </>
        )}
        {show == "crew" && (
          <>
            <h3>Crew</h3>
            <Table
              columns={crewColumns}
              data={gameState.state.fleet.filter((x) => gameState.state.crew.find((crewUnit) => crewUnit.fleetId === x.id))}
              style={{ fontFamily: "arial", color: "black", width: "100%", textAlign: "center" }}
            />
            <p>ATK Pwr : {intWithSpaces(crewPower)}</p>
            {JSON.stringify(gameState.state.crew, null, 4)}
          </>
        )}
        {show == "upgrades" && (
          <>
            <h3>Upgrades</h3>

            {Object.keys(gameState.state.upgrades)
              .filter((v) => isNaN(Number(v)))
              .map((name) => {
                const keyName = name as keyof TUpgrade
                const gameStateUpgrade = gameState.state.upgrades[keyName]
                console.log(gameState.state.upgrades)
                return (
                  <p>
                    <span>
                      {name} | Lvl. {gameStateUpgrade ? gameStateUpgrade : 0}{" "}
                    </span>
                    <a
                      style={{ padding: "2px 5px", border: "1px solid white" }}
                      onClick={() => {
                        gameState.dispatch({
                          type: ActionEnum.Upgrade,
                          payload: {
                            upgrade: keyName,
                          },
                        })
                      }}
                    >
                      UP !
                    </a>
                  </p>
                )
              })}

            {/* {gameState.state.upgrades.map((key, index) => {
              let upgrade: keyof TUpgrade = key as keyof TUpgrade
              console.log("up", upgrade)
              const gameStateUpgrade = gameState.state.upgrades.keys() 
              // const up: EUpgrade = upgrade
              return (
                <p>
                  <span>
                    {index} : {EUpgrade[index]} | Lvl. {gameStateUpgrade ? gameStateUpgrade : 0}{" "}
                  </span>
                  <a
                    style={{ padding: "2px 5px", border: "1px solid white" }}
                    onClick={() => {
                      gameState.dispatch({
                        type: ActionEnum.Upgrade,
                        payload: {
                          upgrade: upgrade,
                        },
                      })
                    }}
                  >
                    {" "}
                    UP !
                  </a>
                </p>
              )
            })} */}
          </>
        )}
      </TableBlock>
    </div>
  )
}

export default TestComponent
