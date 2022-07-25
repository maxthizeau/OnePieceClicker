import { FC, useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import BlockSprite from "./BlockSprite"

import useTranslation from "next-translate/useTranslation"
import { useTreasureGame } from "../../lib/hooks/TreasureGameContext"
import useInterval from "../../lib/hooks/useInterval"
import { BLOCK_PER_ROW, EBlockState, EGameMode, IGem } from "../../lib/treasureGame/gameConfig"
import { getXYBlockFromIndex, isBorder } from "../../lib/treasureGame/gameFunctions"
import CharSprite from "./CharSprite"

const GameContainer = styled.div<{ mode?: EGameMode }>`
  display: grid;
  width: 645px;
  height: 643px;
  overflow: hidden;
  grid-template-columns: repeat(15, 43px);
  background: #ffffff;
  cursor: ${(props) => props.mode == EGameMode.NORMAL && `pointer`} ${(props) => props.mode == EGameMode.SCAN && `url("images/cursors/radar-cursor.png") 2 15`}
      ${(props) => props.mode == EGameMode.BOMB && `url("images/cursors/bomb-cursor.png") 2 15`}
      ${(props) => props.mode == EGameMode.DIG && `url("images/cursors/pickaxe-cursor.png") 2 15`},
    pointer;

  &:active {
    cursor: ${(props) => props.mode == EGameMode.BOMB && `url("images/cursors/boom-cursor.png") 2 15`}
        ${(props) => props.mode == EGameMode.DIG && `url("images/cursors/pickaxe-click.png") 2 15`},
      pointer;
  }
`

const EnergyIcon = styled.span<{ width?: number; marginTop?: number; marginBottom?: number; marginRight?: number }>`
  display: inline-block;
  content: "";
  width: ${(props) => (props.width ? props.width : "14")}px;
  height: ${(props) => (props.width ? props.width : "14")}px;
  background-image: url("images/icons/lightningIcon.png");
  background-size: contain;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "4")}px;
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : "0")}px;
  margin-right: ${(props) => (props.marginRight ? props.marginRight : "0")}px;

  /* background-position: -12px -10px; */
`
const DiamondIcon = styled.span<{ width?: number; marginTop?: number; marginBottom?: number }>`
  display: inline-block;
  content: "";
  width: ${(props) => (props.width ? props.width : "18")}px;
  height: ${(props) => (props.width ? props.width : "18")}px;
  background-image: url("images/icons/diamondIcon.png");
  background-size: contain;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "0")}px;
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : "0")}px;
  margin-right: 10px;

  /* background-position: -12px -10px; */
`

const GameButtonContainer = styled.div`
  margin-top: 10px;
  width: 645px;
  display: flex;
  /* align-items: center; */
  justify-content: space-around;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`

const GameButton = styled.a<{ active?: boolean }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-width: 30px;
  border: 2px solid beige;
  background-color: ${(props) => (props.active ? "#aed8ae" : "white")};
  border-radius: 3px;
  margin: 5px;
  opacity: 0.8;
  transition: 0.3s;
  font-weight: bold;
  font-size: 1.2em;

  &:hover {
    opacity: 1;
    animation: 0.3s;
    cursor: pointer;
  }

  & span {
    font-size: 14px;
  }

  &.fullWidthButton {
    width: 100%;
  }
`

const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  font-size: 14px;
  & ${GameButton} {
    margin: 10px;
    padding: 0px 15px;
    width: 100px;
    text-align: center;
  }
`

const ArrowsButtonContainer = styled.div`
  display: flex;
  /* width: 90px; */
  flex-direction: row;
  flex-wrap: wrap;
  /* justify-self: center; */
  & ${GameButton} {
    width: 30px;
    height: 30px;
  }
  & ${GameButton}:first-child {
    margin-left: 46px;
    margin-right: 40px;
  }
  & ${GameButton}:last-child {
    margin-right: 0;
  }
`

const GameText = styled.div`
  padding: 5px 10px;
  border: 2px solid #b9896e;
  border-radius: 3px;
  font-size: 14px;
  display: flex;

  text-align: center;
  background-color: #896651;
  color: #ececec;
`

const GameTextContainer = styled.div`
  display: flex;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  justify-content: space-between;
`

interface IShowLevel {
  level: number[][]
  levelState: EBlockState[]
  charPosition: { x: number; y: number }
  gems: IGem[]
  click: (index: number) => void
  rowCount: number
  mode: EGameMode
  bombWidth: number
  scanWidth: number
}

const ShowLevel: FC<IShowLevel> = ({ level, levelState, charPosition, gems, click, rowCount, mode, bombWidth, scanWidth }) => {
  const fullRowCount = level.length / BLOCK_PER_ROW
  const minimumRowsBeforeScroll = Math.floor(rowCount / 2)

  // Scroll logic
  const printedTopRow =
    charPosition.y + minimumRowsBeforeScroll < rowCount
      ? 0
      : charPosition.y + minimumRowsBeforeScroll < fullRowCount - 1
      ? charPosition.y - minimumRowsBeforeScroll
      : fullRowCount - rowCount
  const printedBottomRow = charPosition.y + minimumRowsBeforeScroll < rowCount ? rowCount - 1 : charPosition.y + minimumRowsBeforeScroll

  return (
    <>
      {level.map((block, index) => {
        const xyBlock = getXYBlockFromIndex(index)

        if (xyBlock.y < printedTopRow || xyBlock.y > printedBottomRow) {
          // Don't print cells if not in printed row range
          return null
        }

        const blockIsBorder = isBorder(index, level.length)
        const state = blockIsBorder ? EBlockState.SHOW : levelState[index]
        const blockToShow = state == EBlockState.SHOW ? block : [1, 1]
        if (blockToShow === null) {
          return
        }

        if (charPosition.x == xyBlock.x && charPosition.y == xyBlock.y) {
          return <CharSprite key={index} />
        }

        let stone = undefined
        for (let i = 0; i < gems.length; i++) {
          if (state == EBlockState.HIDDEN) {
            break
          }
          const gem = gems[i]
          if (gem.x == xyBlock.x && gem.y == xyBlock.y) {
            stone = gem.stone
            break
          }
        }
        return (
          <BlockSprite
            onClick={() => {
              click(index)
            }}
            key={index}
            x={blockToShow[0]}
            y={blockToShow[1]}
            blockState={state}
            stone={stone}
            mode={mode}
            bombWidth={bombWidth}
            scanWidth={scanWidth}
          />
        )
      })}
    </>
  )
}

const TreasureFinder = () => {
  const { level, levelState, gems, charPosition, charFunctions, mode, setMode, click, energy, lastEnergyUpdateTimestamp, config, userResetLevel } =
    useTreasureGame()
  const [timer, setTimer] = useState(config.timer - Math.floor((new Date().getTime() - lastEnergyUpdateTimestamp) / 1000))
  const { t } = useTranslation()

  const keyPress = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault()
      switch (event.key) {
        case "ArrowDown":
          charFunctions.down()
          break
        case "ArrowUp":
          charFunctions.up()
          break
        case "ArrowLeft":
          charFunctions.left()
          break
        case "ArrowRight":
          charFunctions.right()
          break

        default:
          break
      }

      // console.log(event.key, "pressed")
    },
    [charPosition, level, levelState, charFunctions]
  )

  useEffect(() => {
    document.addEventListener("keydown", keyPress, false)

    return () => {
      document.removeEventListener("keydown", keyPress, false)
    }
  }, [charPosition, level, levelState, charFunctions])

  useInterval(() => {
    const newTimer = config.timer - Math.floor((new Date().getTime() - lastEnergyUpdateTimestamp) / 1000)
    setTimer(newTimer >= 0 ? newTimer : 0)
  }, 200)

  return (
    <>
      <GameTextContainer>
        <GameText>
          {t("treasureGame:refill-in")}{" "}
          {timer.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </GameText>
        <GameText>
          <DiamondIcon /> {gems.filter((x) => x.collected == true).length} / {gems.length}
        </GameText>
        <GameText>
          <EnergyIcon width={14} marginRight={5} marginBottom={0} /> {energy} / {config.maxEnergy}
        </GameText>
      </GameTextContainer>
      <GameContainer mode={mode}>
        <ShowLevel
          level={level}
          levelState={levelState}
          charPosition={charPosition}
          gems={gems}
          click={click}
          rowCount={15}
          mode={mode}
          bombWidth={config.bombWidth}
          scanWidth={config.scanWidth}
        />
      </GameContainer>
      <GameButtonContainer>
        <GameButtonContainer>
          <ActionButtonContainer>
            <GameButton
              onClick={() => {
                setMode(EGameMode.NORMAL)
              }}
              active={mode == EGameMode.NORMAL}
            >
              {t("treasureGame:move")}
              <span>
                {config.energyCosts.move} <EnergyIcon />
              </span>
            </GameButton>

            <GameButton
              onClick={() => {
                setMode(EGameMode.DIG)
              }}
              active={mode == EGameMode.DIG}
            >
              {t("treasureGame:pickaxe")}
              <span>
                {config.energyCosts.pickaxe} <EnergyIcon />
              </span>
            </GameButton>
          </ActionButtonContainer>
        </GameButtonContainer>
        <ArrowsButtonContainer>
          <GameButton
            onClick={() => {
              charFunctions.up()
            }}
          >
            ↑
          </GameButton>
          <GameButton
            onClick={() => {
              charFunctions.left()
            }}
          >
            ←
          </GameButton>
          <GameButton
            onClick={() => {
              charFunctions.down()
            }}
          >
            ↓
          </GameButton>
          <GameButton
            onClick={() => {
              charFunctions.right()
            }}
          >
            →
          </GameButton>
        </ArrowsButtonContainer>
        <GameButtonContainer>
          <ActionButtonContainer>
            <GameButton
              onClick={() => {
                setMode(EGameMode.SCAN)
              }}
              active={mode == EGameMode.SCAN}
            >
              {t("treasureGame:scan")}
              <span>
                {config.energyCosts.scan} <EnergyIcon />
              </span>
            </GameButton>

            <GameButton
              onClick={() => {
                setMode(EGameMode.BOMB)
              }}
              active={mode == EGameMode.BOMB}
            >
              {t("treasureGame:bomb")}
              <span>
                {config.energyCosts.bomb} <EnergyIcon />
              </span>
            </GameButton>
          </ActionButtonContainer>
        </GameButtonContainer>
      </GameButtonContainer>
      <GameButtonContainer>
        <GameButton
          className="fullWidthButton"
          onClick={() => {
            userResetLevel()
          }}
        >
          {t("treasureGame:new-level")}
          <span>
            {config.energyCosts.reset} <EnergyIcon />
          </span>
        </GameButton>
      </GameButtonContainer>
    </>
  )
}

export default TreasureFinder
