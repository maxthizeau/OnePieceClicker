import React, { FC, useCallback, useEffect, useState } from "react"
import {
  filterUnitsByZone,
  getBerryRewardFromUnit,
  getDungeonUnits,
  getFullImageSrc,
  getHPLossFromUnit,
  getNextUnitByRarity,
  getPriceUnit,
  getXPGainFromUnit,
} from "../../lib/clickerFunctions"
import { ECaptainEffect, IDungeonState, TCurrentUnit, TUnit } from "../../lib/types"
import { Center } from "../styled/Globals"
import { CharacterImage, CharacterName, StyledGame } from "./ClickerStyles"
import HealthBar from "./HealthBar"
import { EInstance } from "../../lib/enums"
import EndDungeonMessage from "./Popups/EndDungeonMessage"
import ClickerMenu from "./ClickerMenu"
import Debug from "./Debug"
import DungeonTimer from "./DungeonTimer"
import { ActionEnum, IContext, useGameState } from "../../lib/hooks/GameContext"
import useInterval from "../../lib/hooks/useInterval"
import useInstance from "../../lib/hooks/useInstance"
import useCards from "../../lib/hooks/useCards"
import usePower from "../../lib/hooks/usePower"
import useFleet from "../../lib/hooks/useFleet"
import useItems from "../../lib/hooks/useItems"
import useLogs, { ELogType } from "../../lib/hooks/useLogs"
const data: TUnit[] = require("../../lib/data/units.json")

interface IGameProps {
  zoneId: number
  paused: boolean
  debug?: boolean
}

// type GameState = {
//   zoneId: number
//   units: TUnit[]
//   dungeon: IDungeonState | null
//   currentUnit: TCurrentUnit
// }
const baseDungeonTime = 30

const Game: FC<IGameProps> = (props: IGameProps) => {
  const [intervalDungeon, setIntervalDungeon] = useState<number>(baseDungeonTime)
  const [units, setUnits] = useState<TUnit[]>(data)
  const [dungeon, setDungeon] = useState<IDungeonState | null>(null)
  const [currentUnit, setCurrentUnit] = useState<TCurrentUnit>()
  const [enableHit, setEnableHit] = useState(true)
  const [instance, changeInstance] = useInstance()
  const [crewPower, clickPower] = usePower()
  // const [crewPower, clickPower] = [10000000000, 100000000]
  const [_, lootCard] = useCards()
  const { getCaptainBoost, rngCrewMemberGainXP, crewLooseHP } = useFleet().crewFunctions
  const { items, useItem } = useItems()
  const { addLog } = useLogs()
  const gameState = useGameState()
  function setHP(newHP: number) {
    if (!currentUnit) return
    setCurrentUnit({ ...currentUnit, hp: newHP })
  }

  function startDungeonTimer() {
    setIntervalDungeon(baseDungeonTime)
  }

  const initState = () => {
    const zoneUnits = data.filter((x) => x.zone == props.zoneId)
    let dungeon: IDungeonState | null = null

    // If this is a dungeon, init the dungeon state
    if (instance == EInstance.Dungeon) {
      dungeon = {
        isDungeon: true,
        state: "inprogress",
        dungeonUnits: getDungeonUnits(data, props.zoneId),
        currentUnitIndex: 0,
        farmMode: false,
        alreadyClearedOnce: gameState.state.maxZoneId > props.zoneId,
      }
      startDungeonTimer()
    }

    // Prepare current unit (if dungeon --> dungeonUnits[0])
    const randomUnit = !dungeon ? zoneUnits[Math.floor(Math.random() * zoneUnits.length)] : dungeon.dungeonUnits[dungeon.currentUnitIndex]
    setUnits(data)
    setDungeon(dungeon)
    setCurrentUnit({ unit: randomUnit, hp: randomUnit.clickerMaxHP })
  }

  function nextDungeonUnit() {
    if (!dungeon) return null
    const { state, currentUnitIndex, dungeonUnits, isDungeon } = dungeon

    let newDungeonState: IDungeonState | null = null
    console.log(dungeon.dungeonUnits.length, dungeon.currentUnitIndex + 1)
    if (state !== "inprogress") {
      return null
    }

    if (dungeon.dungeonUnits.length <= dungeon.currentUnitIndex + 1) {
      console.log("Last enemy defeated")
      newDungeonState = { ...dungeon, state: "victory" }
      setDungeon(newDungeonState)
      currentUnit && setCurrentUnit({ ...currentUnit, hp: 0 })
      dungeonVictory()
    } else {
      console.log("Another enemy is coming")
      const nextDungeonUnit: TUnit = dungeon.dungeonUnits[dungeon.currentUnitIndex + 1]
      setDungeon({ ...dungeon, currentUnitIndex: dungeon.currentUnitIndex + 1 })
      setCurrentUnit({ hp: nextDungeonUnit.clickerMaxHP, unit: nextDungeonUnit })
    }
  }

  function nextUnit() {
    console.log("nextUnit")

    const zoneUnits = filterUnitsByZone(units, props.zoneId)

    if (dungeon) {
      nextDungeonUnit()
    } else {
      const randomUnit = getNextUnitByRarity(zoneUnits)

      if (!randomUnit) return
      setCurrentUnit({ unit: randomUnit, hp: randomUnit.clickerMaxHP })
    }
  }

  function currentUnitDies() {
    console.log("[Current Unit Dies]")
    console.log("Current unit :  ", currentUnit)
    setHP(0)
    setEnableHit(false)
    currentUnit && lootCard(currentUnit?.unit)
    const captainEffect = getCaptainBoost(ECaptainEffect.BERRY)
    const berryWon = currentUnit ? Math.round(getBerryRewardFromUnit(currentUnit.unit) * captainEffect) : 0
    console.log("Berries : ", berryWon)
    gameState.dispatch({
      type: ActionEnum.AddBerries,
      payload: {
        berriesChange: berryWon,
      },
    })
    console.log("Berries : ", berryWon)
    currentUnit && rngCrewMemberGainXP(getXPGainFromUnit(currentUnit))
    currentUnit && crewLooseHP(getHPLossFromUnit(currentUnit))
    gameState.dispatch({ type: ActionEnum.KilledEnemy, payload: { zoneId: props.zoneId } })
    setTimeout(() => {
      nextUnit()
      setEnableHit(true)
    }, 200)
  }

  function hit(value: number) {
    if (!currentUnit || currentUnit?.hp <= 0) {
      return
    }
    const hp = currentUnit ? currentUnit.hp : 0
    const newHP = hp - value < 0 ? 0 : hp - value
    if (newHP > 0) {
      setHP(newHP)
    } else {
      currentUnitDies()
    }
  }
  function resetDungeon(farmMode?: boolean) {
    console.log("PROPPPROS", gameState.state.maxZoneId, props.zoneId)
    if (!dungeon) return null

    const newDungeonState: IDungeonState = {
      ...dungeon,
      state: "inprogress",
      dungeonUnits: getDungeonUnits(units, props.zoneId),
      currentUnitIndex: 0,
      farmMode: farmMode !== undefined ? farmMode : dungeon.farmMode,
      alreadyClearedOnce: gameState.state.maxZoneId > props.zoneId,
    }

    startDungeonTimer()

    setCurrentUnit({ unit: newDungeonState.dungeonUnits[0], hp: newDungeonState.dungeonUnits[0].clickerMaxHP })
    setDungeon(newDungeonState)
  }

  function dungeonVictory() {
    if (dungeon && !dungeon.alreadyClearedOnce) {
      // addLog({
      //   logTypes: [ELogType.VivreCard, ELogType.Clicker],
      //   notification: true,
      //   type: "success",
      //   content: <CardLootNotification label={"Vivre Card Found"} unit={card} />,
      // })
    }

    gameState.dispatch({ type: ActionEnum.DungeonDone, payload: { zoneId: props.zoneId } })
    if (dungeon?.farmMode) {
      resetDungeon()
    }
  }

  function onHit(e: React.MouseEvent) {
    e.preventDefault()
    enableHit && hit(clickPower)
  }

  function changeFarmMode(farmMode: boolean, reset = false) {
    console.log("Change farm mode to ", farmMode)
    if (!dungeon) return
    console.log("not returned ")
    if (reset) {
      resetDungeon(farmMode)
    } else {
      setDungeon({ ...dungeon, farmMode })
    }
  }
  function endDungeonTimer() {
    console.log("END TIMER")
    if (dungeon && dungeon.state !== "lost") {
      setDungeon({ ...dungeon, state: "lost" })
    }
  }

  const tick = () => {
    // Handle Auto Hit
    // console.log("PAUSED : ", props.paused)
    // console.log("--TICK--")
    if (!props.paused) {
      if (!dungeon || dungeon.state == "inprogress") {
        // hit() updates state, wont work if endDungeonTimer() runs too since it also modify the state
        // console.log("HIT !")
        hit(crewPower)
      }
    }
    // Handle Dungeon Timer
    if (dungeon && dungeon.state == "inprogress") {
      if (intervalDungeon <= 0) {
        endDungeonTimer()
      } else {
        setIntervalDungeon(intervalDungeon - 1)
      }
    }
  }

  useEffect(() => {
    initState()
  }, [])

  useInterval(() => {
    tick()
  }, 1000)

  if (!currentUnit) return null
  const { hp, unit } = currentUnit
  const { debug = false } = props

  return (
    <>
      <StyledGame>
        <Debug debug={debug} unit={unit} dungeon={dungeon} instance={instance} />

        <ClickerMenu
          buttonLabel1="Back"
          buttonFunction1={() => {
            changeInstance(EInstance.Zone)
          }}
          buttonLabel2={dungeon?.farmMode ? "Stop" : "Farm"}
          buttonFunction2={() => {
            changeFarmMode(!dungeon?.farmMode)
          }}
          dungeon={dungeon}
        />

        {dungeon && dungeon.state !== "inprogress" && (
          <EndDungeonMessage
            type={dungeon.state}
            back={() => {
              changeInstance(EInstance.Zone)
            }}
            setFarmMode={() => changeFarmMode(true, true)}
            resetDungeon={() => resetDungeon()}
          />
        )}
        <Center>
          {dungeon && dungeon.state == "inprogress" && <DungeonTimer timer={intervalDungeon} />}
          <CharacterImage src={getFullImageSrc(unit.id)} onClick={onHit} />
        </Center>

        <CharacterName>{unit.name}</CharacterName>
        <HealthBar maxHP={unit.clickerMaxHP} currentHP={hp} />

        {/* <div>ATK : 255</div> */}
      </StyledGame>
    </>
  )
}

export default Game