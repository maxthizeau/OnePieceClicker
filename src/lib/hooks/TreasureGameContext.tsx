import { useCallback, useEffect, useState, createContext, useContext } from "react"
import { Store } from "react-notifications-component"
import TreasureGameNotification from "../../components/Global/notifications/TreasureGameNotification"
import { ETreasureGameUpgrades } from "../data/treasureGame"
import { EBlockState, EGameMode, IGem } from "../treasureGame/gameConfig"
import { generateGemsArray, generateLevel, getIndexFromXYBlock, getXYBlockFromIndex, isBorder } from "../treasureGame/gameFunctions"
import { EShipEffect } from "../types"
import { hardCopy } from "../utils"
import { ActionEnum, useGameState } from "./GameContext"
import useInterval from "./useInterval"
import { useLogs, ELogType } from "./useLogs"
import useShip from "./useShip"
import useTranslation from "next-translate/useTranslation"

type TNotification = {
  type: "error" | "gem" | "success" | "warning"
  label: string
  message: string
  gem?: string
}

type TConfig = {
  timer: number
  energyPerTimer: number
  maxEnergy: number
  bombWidth: number
  scanWidth: number
  visionWidth: number
  scanPrecision: number
  maxScanPrecision: number
  energyCosts: {
    move: number
    scan: number
    pickaxe: number
    bomb: number
  }
  doubleLoot: number
}

type State = {
  charPosition: { x: number; y: number }
  level: number[][]
  gems: IGem[]
  levelState: EBlockState[]
  lastEnergyUpdateTimestamp: number
  energy: number
  config: TConfig
}
type Dispatch = {
  setCharPosition: (arg: { x: number; y: number }) => void
  setLevel: (arg: number[][]) => void
  setGems: (arg: IGem[]) => void
  setLevelState: (arg: EBlockState[]) => void
  setLastEnergyUpdateTimestamp: (arg: number) => void
  setEnergy: (arg: number) => void
}

const TreasureGameContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)

function TreasureGameProvider({ children }: { children: React.ReactNode }) {
  const gameState = useGameState()
  const { getShipBoost } = useShip()

  const visionUpgrade = gameState.state.treasureGameUpgrades.find((x) => x.id == ETreasureGameUpgrades.VISION)?.level ?? 1
  const bombRadiusUpgrade = gameState.state.treasureGameUpgrades.find((x) => x.id == ETreasureGameUpgrades.BOMB_RADIUS)?.level ?? 1
  const scanRadiusUpgrade = gameState.state.treasureGameUpgrades.find((x) => x.id == ETreasureGameUpgrades.SCAN_RADIUS)?.level ?? 1
  const scanPrecisionUpgrade = gameState.state.treasureGameUpgrades.find((x) => x.id == ETreasureGameUpgrades.SCAN_PRECISION)?.level ?? 1
  const moveCostUpgrade = gameState.state.treasureGameUpgrades.find((x) => x.id == ETreasureGameUpgrades.MOVE_COST)?.level ?? 1
  const pickaxeCostUpgrade = gameState.state.treasureGameUpgrades.find((x) => x.id == ETreasureGameUpgrades.PICKAXE_COST)?.level ?? 1
  const bombCostUpgrade = gameState.state.treasureGameUpgrades.find((x) => x.id == ETreasureGameUpgrades.BOMB_COST)?.level ?? 1
  const scanCostUpgrade = gameState.state.treasureGameUpgrades.find((x) => x.id == ETreasureGameUpgrades.SCAN_COST)?.level ?? 1
  const gemsUpgrade = gameState.state.treasureGameUpgrades.find((x) => x.id == ETreasureGameUpgrades.GEMS)?.level ?? 1
  const energyRefillUpgrade = gameState.state.treasureGameUpgrades.find((x) => x.id == ETreasureGameUpgrades.ENERGY_REFILL)?.level ?? 1
  const energyMaxUpgrade = gameState.state.treasureGameUpgrades.find((x) => x.id == ETreasureGameUpgrades.ENERGY_MAX)?.level ?? 1

  const config = {
    timer: Math.round(30 - 30 * (getShipBoost(EShipEffect.MINE_ENERGY) - 1)),
    energyPerTimer: 4 + energyRefillUpgrade,
    maxEnergy: 60 + (energyMaxUpgrade - 1) * 5,
    bombWidth: bombRadiusUpgrade,
    scanWidth: scanRadiusUpgrade,
    visionWidth: visionUpgrade,
    scanPrecision: scanPrecisionUpgrade,
    maxScanPrecision: 10,
    gems: 9 + gemsUpgrade,
    doubleLoot: getShipBoost(EShipEffect.MINE_DOUBLELOOT_CHANCE),
    energyCosts: {
      move: 4 - moveCostUpgrade,
      scan: 32 - scanCostUpgrade * 2,
      pickaxe: 7 - pickaxeCostUpgrade,
      bomb: 32 - bombCostUpgrade * 2,
    },
  }

  const [charPosition, setCharPosition] = useState<{ x: number; y: number }>({ x: 6, y: 0 })
  const [level, setLevel] = useState<number[][]>([])
  const [gems, setGems] = useState<IGem[]>([])
  const [levelState, setLevelState] = useState<EBlockState[]>([])
  const [lastEnergyUpdateTimestamp, setLastEnergyUpdateTimestamp] = useState(new Date().getTime())
  const [energy, setEnergy] = useState(60)

  useEffect(() => {
    const generatedLevel = generateLevel()
    setCharPosition({ x: 7, y: 0 })
    setLevel(generatedLevel)
    setLevelState(new Array(generatedLevel.length).fill(EBlockState.HIDDEN))
    setGems(generateGemsArray(generatedLevel, 10))
  }, [])

  const state: State = {
    charPosition,
    level,
    gems,
    levelState,
    lastEnergyUpdateTimestamp,
    energy,
    config,
  }

  const dispatch: Dispatch = {
    setCharPosition,
    setLevel,
    setGems,
    setLevelState,
    setLastEnergyUpdateTimestamp,
    setEnergy,
  }

  const value = { state, dispatch }
  return <TreasureGameContext.Provider value={value}>{children}</TreasureGameContext.Provider>
}

const useTreasureGame = () => {
  const { t } = useTranslation()
  const context = useContext(TreasureGameContext)
  const gameState = useGameState()
  const { addLog } = useLogs()

  function stateUseEnergy(amount: number) {
    gameState.dispatch({ type: ActionEnum.TreasureGame_UseEnergy, payload: { treasureGameEnergyUsed: amount } })
  }

  if (context === undefined) {
    throw new Error("useTreasureGame must be used within a TreasureGameProvider")
  }

  const { charPosition, level, gems, levelState, lastEnergyUpdateTimestamp, energy, config } = context.state

  const { setCharPosition, setLevel, setGems, setLevelState, setLastEnergyUpdateTimestamp, setEnergy } = context.dispatch

  const [mode, setMode] = useState<EGameMode>(EGameMode.NORMAL)
  const [previousNotification, setPreviousNotification] = useState<string>("")

  const spendEnergy = (amount: number) => {
    if (energy - amount >= 0) {
      setEnergy(energy - amount)
      stateUseEnergy(amount)
      return true
    } else {
      return false
    }
  }
  /* Show around char  */
  function updateStateAroundChar() {
    // If levelState is not initialized yet, skip
    if (levelState.length == 0) {
      return
    }
    const newLevelState = hardCopy(levelState)

    for (let i = -config.visionWidth; i <= config.visionWidth; i++) {
      for (let j = -config.visionWidth; j <= config.visionWidth; j++) {
        const index = getIndexFromXYBlock(charPosition.x + i, charPosition.y + j)
        if (newLevelState[index] != EBlockState.PATH) {
          newLevelState[index] = EBlockState.SHOW
        }
      }
    }
    const index = getIndexFromXYBlock(charPosition.x, charPosition.y)
    newLevelState[index] = EBlockState.PATH
    setLevelState(newLevelState)
    console.log(levelState)
  }

  // Return the index of gem array if found, or null
  const positionHasGem = (x: number, y: number): number | null => {
    for (let i = 0; i < gems.length; i++) {
      const gem = gems[i]
      if (gem.x == x && gem.y == y && !gem.collected) {
        return i
      }
    }
    return null
  }

  const gemFound = (index: number) => {
    // console.log("GEM FOUND !", gems[index])
    const gemName = gems[index].stone.replaceAll("-", " ").toUpperCase()
    const notifId = `gem-${gemName}-${index}`
    const gemsCopy = hardCopy(gems)
    gemsCopy[index].collected = true
    setGems(gemsCopy)
    const doubleLootBoost = config.doubleLoot
    let doubleLoot = false
    if (doubleLootBoost > 1) {
      const rng = Math.random()
      doubleLoot = rng <= doubleLootBoost - 1
    }
    if (doubleLoot) {
      gameState.dispatch({ type: ActionEnum.TreasureGame_LootGem, payload: { treasureGameGem: { id: gems[index].stone } } })
      gameState.dispatch({ type: ActionEnum.TreasureGame_LootGem, payload: { treasureGameGem: { id: gems[index].stone } } })
      sendNotification(notifId, "gem", t("treasureGame:double-gem-loot"), gemName, gems[index].stone)
    } else {
      gameState.dispatch({ type: ActionEnum.TreasureGame_LootGem, payload: { treasureGameGem: { id: gems[index].stone } } })
      sendNotification(notifId, "gem", t("treasureGame:gem-loot"), gemName, gems[index].stone)
    }
  }

  const move = useCallback(
    ({ x, y }: { x: number; y: number }) => {
      const index = getIndexFromXYBlock(x, y)
      console.log(index)
      console.log(level[index])
      if (level[index][0] != 1 || level[index][1] != 1) {
        sendNotification(`move-${x}-${y}`, "error", t("treasureGame:impossible-to-move"), t("treasureGame:impossible-to-move-message"))
      } else {
        const enoughtEnergy = spendEnergy(config.energyCosts.move)
        if (enoughtEnergy) {
          const gemIndexFound = positionHasGem(x, y)
          if (gemIndexFound !== null) {
            gemFound(gemIndexFound)
          }
          setCharPosition({ x: x, y: y })
        } else {
          sendNotification("energy-move", "warning", t("treasureGame:not-enough-energy"), t("treasureGame:not-enough-energy-message"))
        }
      }
    },
    [level, energy, gems, previousNotification]
  )

  const up = () => {
    console.log(charPosition)
    move({ x: charPosition.x, y: charPosition.y - 1 })
  }
  const down = () => {
    console.log(charPosition)
    const newCharPos = { x: charPosition.x, y: charPosition.y + 1 }
    // levelStateAroundChar(charPosition)
    move(newCharPos)
  }
  const left = () => {
    console.log(charPosition)
    move({ y: charPosition.y, x: charPosition.x - 1 })
  }
  const right = () => {
    console.log(charPosition)
    move({ y: charPosition.y, x: charPosition.x + 1 })
  }

  const sendNotification = (notifId: string, type: "error" | "gem" | "success" | "warning", label: string, message: string, gem?: string) => {
    // const notification: TNotification = { type, label, message, gem }
    if (notifId != previousNotification) {
      console.log(notifId, previousNotification)

      addLog({
        id: notifId,
        logTypes: [ELogType.Mine],
        type: "success",
        notification: true,
        content: <TreasureGameNotification label={label} type={type} message={message} gem={gem} />,
      })
      setPreviousNotification(notifId)
    }
  }

  const click = (index: number) => {
    console.log("Click on ", index)
    if (mode == EGameMode.SCAN) {
      console.log("Scan Click")

      const enoughtEnergy = spendEnergy(config.energyCosts.scan)
      if (enoughtEnergy) {
        const levelStateTmp = hardCopy(levelState)
        // const levelTmp = hardCopy(level)
        const xyBlock = getXYBlockFromIndex(index)
        for (let i = -config.scanWidth; i <= config.scanWidth; i++) {
          for (let j = -config.scanWidth; j <= config.scanWidth; j++) {
            const indexToChange = getIndexFromXYBlock(xyBlock.x + i, xyBlock.y + j)

            // Logic : First scan --> Set to ScanNothing or ScanSomething
            // ScanSomething can be a wall or a gem
            // Second Scan --> Set Scan something to ScanNothing or ScanTreasure
            const rng = Math.random() * config.maxScanPrecision
            // If random set and this is a wall and EBlockState.HIDDEN
            if (config.scanPrecision < rng && level[indexToChange][0] != 1 && level[indexToChange][1] != 1 && levelState[indexToChange] == EBlockState.HIDDEN) {
              levelStateTmp[indexToChange] = EBlockState.SCAN_SOMETHING
            } else if (level[indexToChange][0] != 1 && level[indexToChange][1] != 1 && levelState[indexToChange] == EBlockState.SCAN_SOMETHING) {
              levelStateTmp[indexToChange] = EBlockState.SCAN_NOTHING
            }

            for (let k = 0; k < gems.length; k++) {
              const gem = gems[k]

              if (gem.x == xyBlock.x + i && gem.y == xyBlock.y + j) {
                switch (levelState[indexToChange]) {
                  case EBlockState.SCAN_SOMETHING:
                    levelStateTmp[indexToChange] = EBlockState.SCAN_TREASURE
                    break
                  case EBlockState.HIDDEN:
                    levelStateTmp[indexToChange] = EBlockState.SCAN_SOMETHING
                    break
                  default:
                    break
                }
              }
            }
          }
        }
        setLevelState(levelStateTmp)
      } else {
        sendNotification("energy-scan", "warning", t("treasureGame:not-enough-energy"), t("treasureGame:not-enough-energy-message"))
      }
    }
    if (mode == EGameMode.DIG) {
      console.log("DIG Click")
      if (levelState[index] != EBlockState.SHOW || isBorder(index, level.length)) {
        // console.log("WARNING : You cannot pickaxe this block")
        sendNotification(`dig-error-noborder-${index}`, "error", t("treasureGame:impossible-action"), t("treasureGame:you-cannot-pickaxe-this-block"))
      } else if (level[index][0] == 1 && level[index][1] == 1) {
        // console.log("WARNING : You can only pickaxe walls")
        sendNotification(`dig-error-onlywall-${index}`, "error", t("treasureGame:impossible-action"), t("treasureGame:you-can-only-pickaxe-walls"))
      } else {
        const enoughtEnergy = spendEnergy(config.energyCosts.pickaxe)
        if (enoughtEnergy) {
          const levelTmp = hardCopy(level)
          levelTmp[index] = [1, 1]
          setLevel(levelTmp)
        } else {
          sendNotification("energy-dig", "warning", t("treasureGame:not-enough-energy"), t("treasureGame:not-enough-energy-message"))
        }
      }
    }
    if (mode == EGameMode.BOMB) {
      console.log("Nuke Click")
      if (levelState[index] != EBlockState.SHOW || isBorder(index, level.length)) {
        sendNotification(`bomb-error-${index}`, "error", t("treasureGame:impossible-action"), t("treasureGame:you-cannot-bomb-this-block"))
      } else {
        const enoughtEnergy = spendEnergy(config.energyCosts.bomb)
        if (enoughtEnergy) {
          const levelTmp = hardCopy(level)
          const xyBlock = getXYBlockFromIndex(index)
          for (let i = -config.bombWidth; i <= config.bombWidth; i++) {
            for (let j = -config.bombWidth; j <= config.bombWidth; j++) {
              const indexToChange = getIndexFromXYBlock(xyBlock.x + i, xyBlock.y + j)
              if (!isBorder(indexToChange, level.length)) {
                levelTmp[indexToChange] = [1, 1]
              }
            }
          }

          setLevel(levelTmp)
        } else {
          sendNotification(`energy-bomb`, "warning", t("treasureGame:not-enough-energy"), t("treasureGame:not-enough-energy-message"))
        }
      }
    }
  }

  useEffect(() => {
    updateStateAroundChar()
  }, [charPosition])

  useInterval(() => {
    const now = new Date().getTime()
    if (now - lastEnergyUpdateTimestamp > config.timer * 1000) {
      // Add x times the energy (where x is the count of timer elapsed)
      const energyToAdd = Math.floor((now - lastEnergyUpdateTimestamp) / (config.timer * 1000)) * config.energyPerTimer
      // Add energy if not at maximum already
      setEnergy(energy + energyToAdd > config.maxEnergy ? config.maxEnergy : energy + energyToAdd)
      setLastEnergyUpdateTimestamp(now)
    }
  }, 1000)

  const charFunctions = { up, down, left, right }

  return { level, levelState, gems, charPosition, charFunctions, mode, setMode, click, energy, lastEnergyUpdateTimestamp, config }
  //   return [level, levelState, charPosition, charFunctions, mode, changeMode] as const
}

export { TreasureGameProvider, useTreasureGame }
