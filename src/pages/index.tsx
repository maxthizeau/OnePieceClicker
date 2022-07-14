import type { NextPage } from "next"
import Head from "next/head"

import Clicker from "../components/Clicker/_GameFunctionnal"
import { Column, Container, Header, Row, Logo } from "../components/styled/Globals"
import CurrenciesList from "../components/Currencies/CurrenciesList"
import StatsList from "../components/Stats/StatsList"
import Goals from "../components/Goals/Goals"
import Crew from "../components/Crew/Crew"
import Boat from "../components/Boat/Boat"

import ClientOnly from "../components/ClientOnly"
import { zoneIdVar } from "../lib/cache"
import { useApolloClient, useReactiveVar } from "@apollo/client"
import Zone from "../components/Clicker/Zone"
import { useState } from "react"
import { zones } from "../lib/data/zones"
import { EInstance } from "../lib/enums"
import useInstance from "../lib/hooks/useInstance"
import { ActionEnum, useGameState } from "../lib/hooks/GameContext"
import useCards from "../lib/hooks/useCards"
import useSave from "../lib/hooks/useSave"
import styled from "styled-components"
import { possibleGems } from "../lib/data/treasureGame"

const AdminButton = styled.a`
  display: block;
  border-radius: 99px;
  text-align: center;
  font-weight: bold;
  font-size: 0.8em;
  padding: 5px;
  background: white;
  margin-top: 15px;
  cursor: pointer;
  font-family: "Open Sans";
`

const Home: NextPage = () => {
  const client = useApolloClient()
  const zoneId = useReactiveVar(zoneIdVar)
  const { instance, changeInstance } = useInstance()
  const [cards, lootCard] = useCards()
  const [paused, setPaused] = useState(false)
  const gameState = useGameState()
  const [save, reset, downloadSave] = useSave()

  // const [, updateState] = useState({})
  // const forceUpdate = useCallback(() => updateState({}), [])

  // useEffect(() => {
  //   forceUpdate()
  // }, [instance])

  return (
    <>
      <Container>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ClientOnly>
          <Header>
            <div>
              <Logo src="images/logo.png" />
            </div>
            <CurrenciesList />
          </Header>
          <Row gutter={[16, 16]}>
            <Column span={17}>
              <Row gutter={[16, 16]}>
                <Column span={8}>
                  <StatsList />
                  <Goals />
                </Column>
                <Column span={16}>
                  {instance == EInstance.Zone && <Zone zone={zones[zoneId]} />}
                  {(instance == EInstance.Clicker || instance == EInstance.Dungeon) && (
                    <Clicker
                      zoneId={zoneId}
                      paused={paused}
                      debug={true}
                      // instance={instance}
                      // changeInstance={changeInstance}
                      // gameState={gameState}
                      // lootCard={lootCard}
                    />
                  )}
                </Column>
              </Row>
              <Row gutter={[16, 16]}>
                <Column span={24}>
                  <Boat />
                </Column>
              </Row>
            </Column>
            <Column span={7}>
              {/* <ItemList /> */}

              <Crew />
              <AdminButton
                onClick={() => {
                  console.log("Pause/Resume")
                  setPaused(!paused)
                }}
              >
                {paused ? "Resume" : "Pause"}
              </AdminButton>
              <AdminButton onClick={() => downloadSave()}>Download Save</AdminButton>
              {/* <>
              <AdminButton
                onClick={() => {
                  save()
                }}
              >
                Force SAVE
              </AdminButton>
              <AdminButton
                onClick={() => {
                  reset()
                }}
              >
                Reset
              </AdminButton>
              <AdminButton
                onClick={() => {
                  gameState.dispatch({ type: ActionEnum.AddBerries, payload: { berriesChange: 1000000000000 } })
                }}
              >
                Berries
              </AdminButton>
            */}
              <AdminButton
                onClick={() => {
                  for (let i = 0; i < 1000; i++) {
                    console.log("Lootgem")
                    const rng = Math.floor(Math.random() * possibleGems.length)
                    gameState.dispatch({
                      type: ActionEnum.TreasureGame_LootGem,
                      payload: { treasureGameGem: { id: possibleGems[rng] } },
                    })
                  }
                }}
              >
                Gems
              </AdminButton>
              {/* 
              </> 
              <a
              
              onClick={() => {
                console.log("Clear Cache")
                sessionStorage.clear()
                client.cache.evict({ fieldName: "zoneId" })
                client.cache.evict({ fieldName: "instance" })
                client.cache.gc()
              }}
            >
              Clear cache
            </a> */}
              <AdminButton
                onClick={() => {
                  gameState.dispatch({ type: ActionEnum.AddBerries, payload: { berriesChange: 1000000 } })
                }}
              >
                Berries
              </AdminButton>
              <AdminButton
                onClick={() => {
                  gameState.dispatch({ type: ActionEnum.AddBerries, payload: { berriesChange: 100000000 } })
                }}
              >
                Berries ++
              </AdminButton>
              <AdminButton
                onClick={() => {
                  gameState.dispatch({ type: ActionEnum.AddBerries, payload: { berriesChange: 10000000000 } })
                }}
              >
                Berries ++++
              </AdminButton>
              <AdminButton
                onClick={() => {
                  gameState.dispatch({ type: ActionEnum.AddBerries, payload: { berriesChange: 10000000000000000 } })
                }}
              >
                Berries ++++++++
              </AdminButton>
            </Column>
          </Row>
          {/* <MapModal /> */}
        </ClientOnly>
      </Container>
    </>
  )
}

export default Home
