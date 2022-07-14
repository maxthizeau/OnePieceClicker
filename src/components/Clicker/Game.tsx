import React from "react"
import { filterUnitsByZone, getDungeonUnits, getFullImageSrc, getNextUnitByRarity } from "../../lib/clickerFunctions"
import { IDungeonState, TUnit } from "../../lib/types"
import { Center } from "../styled/Globals"
import { CharacterImage, CharacterName, StyledGame } from "./ClickerStyles"
import HealthBar from "./HealthBar"
import { EInstance } from "../../lib/enums"
import EndDungeonMessage from "./Popups/EndDungeonMessage"
import ClickerMenu from "./ClickerMenu"
import Debug from "./Debug"
import DungeonTimer from "./DungeonTimer"
import { GameStateContext, IContext } from "../../lib/hooks/GameContext"

const data: TUnit[] = require("../../lib/data/units.json")

export interface GameProps {
  zoneId: number
  paused: boolean
  instance: EInstance
  changeInstance: (arg: EInstance) => void
  gameState: IContext
  lootCard: (card: TUnit) => boolean
  debug?: boolean
}

type GameState = {
  zoneId: number
  units: TUnit[]
  dungeon: IDungeonState | null
  currentUnit: {
    i: number
    unit: TUnit
    hp: number
  }
}
const baseDungeonTime = 30

class Game extends React.Component<GameProps, GameState> {
  static contextType = GameStateContext
  declare context: React.ContextType<typeof GameStateContext>

  interval: any
  intervalDungeon: number

  constructor(props: GameProps) {
    super(props)
    this.intervalDungeon = baseDungeonTime

    this.state = this.initState(props.zoneId)
  }

  initState = (zoneId: number): GameState => {
    const zoneUnits = data.filter((x) => x.zone == zoneId)
    console.log("initstate")
    let dungeon: IDungeonState | null = null
    if (this.props.instance == EInstance.Dungeon) {
      console.log("This is a dungeon !")
      dungeon = {
        isDungeon: true,
        state: "inprogress",
        dungeonUnits: getDungeonUnits(data, this.props.zoneId),
        currentUnitIndex: 0,
        farmMode: false,
      }
      this.startDungeonTimer()
    }

    const randomUnit = !dungeon ? zoneUnits[Math.floor(Math.random() * zoneUnits.length)] : dungeon.dungeonUnits[dungeon.currentUnitIndex]
    return {
      zoneId: zoneId,
      units: data,
      dungeon,
      currentUnit: { i: 0, unit: randomUnit, hp: randomUnit.clickerMaxHP },
    }
  }

  setHP = (newHP: number) => {
    this.setState({ ...this.state, currentUnit: { ...this.state.currentUnit, hp: newHP } })
  }

  onHit = (e: React.MouseEvent) => {
    e.preventDefault()
    const clickPower = 100000000
    this.hit(clickPower)
  }

  hit = (value: number) => {
    const hp = this.state.currentUnit ? this.state.currentUnit.hp : 0
    const newHP = hp - value < 0 ? 0 : hp - value
    if (newHP > 0) {
      this.setHP(newHP)
    } else {
      this.setHP(0)
      setTimeout(() => {
        this.nextUnit()
      }, 500)
    }
  }

  nextUnit = () => {
    const { dungeon, units } = this.state
    const zoneUnits = filterUnitsByZone(units, this.props.zoneId)
    // this.context?.dispatch(({type, payload}) => {
    this.props.lootCard(this.state.currentUnit.unit)
    // })
    if (dungeon) {
      this.nextDungeonUnit()
    } else {
      const randomUnit = getNextUnitByRarity(zoneUnits)
      this.setState({ ...this.state, currentUnit: { i: 0, unit: randomUnit, hp: randomUnit.clickerMaxHP } })
    }
  }

  nextDungeonUnit = () => {
    const { dungeon } = this.state
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
      this.setState({ ...this.state, dungeon: newDungeonState, currentUnit: { ...this.state.currentUnit, hp: 0 } })
      this.dungeonVictory()
    } else {
      console.log("Another enemy is coming")
      const nextDungeonUnit: TUnit = dungeon.dungeonUnits[dungeon.currentUnitIndex + 1]
      newDungeonState = { ...dungeon, currentUnitIndex: dungeon.currentUnitIndex + 1 }
      this.setState({ ...this.state, dungeon: newDungeonState, currentUnit: { i: 0, hp: nextDungeonUnit.clickerMaxHP, unit: nextDungeonUnit } })
    }
  }

  resetDungeon = (farmMode?: boolean) => {
    if (!this.state.dungeon) return null

    const newDungeonState: IDungeonState = {
      ...this.state.dungeon,
      state: "inprogress",
      dungeonUnits: getDungeonUnits(this.state.units, this.props.zoneId),
      currentUnitIndex: 0,
      farmMode: farmMode !== undefined ? farmMode : this.state.dungeon.farmMode,
    }

    this.startDungeonTimer()

    this.setState({
      ...this.state,
      currentUnit: { i: 0, unit: newDungeonState.dungeonUnits[0], hp: newDungeonState.dungeonUnits[0].clickerMaxHP },
      dungeon: newDungeonState,
    })
  }

  dungeonVictory = () => {
    if (this.state.dungeon?.farmMode) {
      this.resetDungeon()
    }
  }

  changeFarmMode = (farmMode: boolean, reset = false) => {
    console.log("Change farm mode to ", farmMode)
    if (!this.state.dungeon) return
    console.log("not returned ")
    if (reset) {
      this.resetDungeon(farmMode)
    } else {
      this.setState({ ...this.state, dungeon: { ...this.state.dungeon, farmMode } })
    }
  }

  tick = () => {
    console.log("--------")
    console.log("--TICK--")
    const crewPower = 10000000
    // Handle Auto Hit
    if (!this.props.paused) {
      if (!this.state.dungeon || this.state.dungeon.state == "inprogress") {
        // this.hit() updates state, wont work if this.endDungeonTimer() runs too since it also modify the state
        console.log("HIT !")
        this.hit(crewPower)
      }
    }
    // Handle Dungeon Timer
    if (this.state.dungeon && this.state.dungeon.state == "inprogress") {
      if (this.intervalDungeon <= 0) {
        this.endDungeonTimer()
      } else {
        this.intervalDungeon -= 1
      }
    }
    console.log("--------")
  }

  startDungeonTimer() {
    this.intervalDungeon = baseDungeonTime
  }

  endDungeonTimer() {
    console.log("END TIMER")
    if (this.state.dungeon && this.state.dungeon.state !== "lost") {
      this.setState({ ...this.state, dungeon: { ...this.state.dungeon, state: "lost" } })
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000)
    console.log("Context : ")
    console.log(this.context?.state)
  }

  componentDidUpdate() {
    // console.log("Interval : ", this.intervalDungeon)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { hp, unit, i } = this.state.currentUnit
    const dungeon = this.state.dungeon
    const { instance, changeInstance, debug = false } = this.props
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
              this.changeFarmMode(!dungeon?.farmMode)
            }}
            dungeon={dungeon}
          />

          {dungeon && dungeon.state !== "inprogress" && (
            <EndDungeonMessage
              type={dungeon.state}
              back={() => {
                changeInstance(EInstance.Zone)
              }}
              setFarmMode={() => this.changeFarmMode(true, true)}
              resetDungeon={this.resetDungeon}
            />
          )}
          <Center>
            {dungeon && dungeon.state == "inprogress" && <DungeonTimer timer={this.intervalDungeon} />}
            <CharacterImage src={getFullImageSrc(unit.id)} onClick={this.onHit} />
          </Center>

          <CharacterName>{unit.name}</CharacterName>
          <HealthBar maxHP={unit.clickerMaxHP} currentHP={hp} />

          {/* <div>ATK : 255</div> */}
        </StyledGame>
      </>
    )
  }
}

export default Game
