import { FC } from "react"
import styled from "styled-components"
import { EBlockState, EGameMode } from "../../lib/treasureGame/gameConfig"

interface IBlockSpriteImageProps {
  width: number
  positionX: number
  positionY: number
  stone?: string
  state?: EBlockState
  mode?: EGameMode
  bombWidth: number
  scanWidth: number
}

const BlockSpriteImage = styled.div<IBlockSpriteImageProps>`
  background-image: url("images/treasure-game/sprite-elements.png");
  display: inline-block;
  height: ${(props) => props.width}px;
  width: ${(props) => props.width}px;
  ${({ positionX, positionY }) => `background-position: ${positionX * -1}px ${positionY * -1}px;`}
  margin:0;
  padding: 0;
  border: none;
  position: relative;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid white;
    /* cursor: pointer; */
  }

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    ${(props) => (props.state === EBlockState.HIDDEN || props.state === EBlockState.SCAN_NOTHING) && `background-color: #212020d3;`}
    ${(props) => props.state === EBlockState.PATH && `background-color: #efefef34;`}
    ${(props) =>
      props.state === EBlockState.SCAN_TREASURE &&
      `background-color: #212020d3; background-image: url("images/icons/questionMarkGreenIcon.png");background-size:contain;`}
    ${(props) =>
      props.state === EBlockState.SCAN_SOMETHING &&
      `background-color: #212020d3; background-image: url("images/icons/questionMarkOrangeIcon.png");background-size:contain;`}
    ${(props) =>
      props.state === EBlockState.SHOW && props.stone && `background-image: url("images/treasure-game/gems/${props.stone}.png");background-size:contain;`}
  }

  &:hover .borderHoverX {
    width: 2px;
    position: absolute;
    ${(props) => {
      if (props.mode != EGameMode.BOMB && props.mode != EGameMode.SCAN) {
        return
      }
      const modeWidth = props.mode == EGameMode.BOMB ? props.bombWidth : props.mode == EGameMode.SCAN ? props.scanWidth : 0
      const color = props.mode == EGameMode.BOMB ? "red" : props.mode == EGameMode.SCAN ? "#317b3f" : "transparent"
      const position = props.width * modeWidth
      return `background-color: ${color};
      height: ${props.width * (3 + (modeWidth - 1) * 2)}px;
    top: ${-position}px;
    left: ${-position}px;`
    }}

    z-index: 900;

    &::after {
      content: "";
      width: 2px;
      height: ${(props) => props.width * 3}px;
      position: absolute;
      top: 0px;
      right: ${(props) => -props.width * 3}px;
      ${(props) => {
        if (props.mode != EGameMode.BOMB && props.mode != EGameMode.SCAN) {
          return
        }
        const modeWidth = props.mode == EGameMode.BOMB ? props.bombWidth : props.mode == EGameMode.SCAN ? props.scanWidth : 0
        const color = props.mode == EGameMode.BOMB ? "red" : props.mode == EGameMode.SCAN ? "#317b3f" : "transparent"
        const position = props.width * modeWidth
        return `background-color: ${color};
      height: ${props.width * (3 + (modeWidth - 1) * 2)}px;
    right: ${-props.width * (3 + (modeWidth - 1) * 2)}px;`
      }}
      z-index: 900;
    }
  }
  &:hover .borderHoverY {
    height: 2px;
    position: absolute;
    z-index: 900;

    ${(props) => {
      if (props.mode != EGameMode.BOMB && props.mode != EGameMode.SCAN) {
        return
      }
      const modeWidth = props.mode == EGameMode.BOMB ? props.bombWidth : props.mode == EGameMode.SCAN ? props.scanWidth : 0
      const color = props.mode == EGameMode.BOMB ? "red" : props.mode == EGameMode.SCAN ? "#317b3f" : "transparent"
      const position = props.width * modeWidth
      return `background-color: ${color};
      width: ${props.width * (3 + (modeWidth - 1) * 2)}px;
    top: ${-position}px;
    left: ${-position}px;`
    }}

    &::after {
      content: "";
      height: 2px;

      position: absolute;

      right: 0px;
      z-index: 900;
      ${(props) => {
        if (props.mode != EGameMode.BOMB && props.mode != EGameMode.SCAN) {
          return
        }
        const modeWidth = props.mode == EGameMode.BOMB ? props.bombWidth : props.mode == EGameMode.SCAN ? props.scanWidth : 0
        const color = props.mode == EGameMode.BOMB ? "red" : props.mode == EGameMode.SCAN ? "#317b3f" : "transparent"
        const position = props.width * modeWidth
        return `background-color: ${color};
      width: ${props.width * (3 + (modeWidth - 1) * 2)}px;
    bottom: -${props.width * (3 + (modeWidth - 1) * 2)}px;`
      }}
    }
  }
`

interface IBlockSpriteProps {
  x: number
  y: number
  blockState: EBlockState
  onClick?: () => void
  stone?: string
  mode: EGameMode
  bombWidth: number
  scanWidth: number
}

const BlockSprite: FC<IBlockSpriteProps> = ({ x, y, blockState, onClick, stone, mode, bombWidth, scanWidth }) => {
  const leftPadding = 25 // 24
  const topPadding = 43
  const margin = 26
  const width = 43

  const rows = 6
  const columns = 10

  // [0,0] [1,0] [2,0] [3,0] ...
  // [0,1] [1,1] [2,1] [3,1]  ...
  // ...

  const positionX = leftPadding + x * (margin + width)
  const positionY = topPadding + y * (margin + width)

  return (
    <>
      <BlockSpriteImage
        onClick={onClick}
        width={width}
        positionX={positionX}
        positionY={positionY}
        state={blockState}
        stone={stone}
        mode={mode}
        bombWidth={bombWidth}
        scanWidth={scanWidth}
      >
        <>
          <div className="borderHoverX"></div>
          <div className="borderHoverY"></div>
        </>
      </BlockSpriteImage>
    </>
  )
}

export default BlockSprite
