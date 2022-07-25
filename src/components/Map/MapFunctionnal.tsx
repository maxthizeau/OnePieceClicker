import { DragEvent, FC, MouseEvent, useEffect, useRef, useState, WheelEvent } from "react"
import styled from "styled-components"
import ClickableMapElement from "./ClickableMapElement"

function setSignDependingOnEntryNumber(entry: number, result: number) {
  if (entry < 0) {
    return result * -1
  } else {
    return result
  }
}

interface IMapContainerStyledProps {
  dragging?: boolean
}

const MapContainer = styled.div<IMapContainerStyledProps>`
  position: relative;
  overflow: hidden;
  width: 988px;
  height: 650px;
  cursor: grab;
`

const MapButtonsWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: row;
  z-index: 99;
  font-family: "Courier New", Courier, monospace;
`
const BasicButton = styled.a`
  display: flex;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 2px solid beige;
  background-color: white;
  border-radius: 3px;
  margin: 5px;
  opacity: 0.8;
  transition: 0.3s;
  font-weight: bold;
  font-size: 1.2em;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 1;
    animation: 0.3s;
    cursor: pointer;
  }
`

interface IMapImageStyledProps {
  pos: {
    x: number
    y: number
    scale: number
  }
}

// const MapImage = styled.img<IMapImageStyledProps>`
//   width: 100%;
//   transform: ${(props) => `translateX(${props.pos.x}px) translateY(${props.pos.y}px) scale(${props.pos.scale})`};
//   cursor: grab;
// `

const MapImage = styled.img.attrs<IMapImageStyledProps>((props) => ({
  style: {
    transform: `translateX(${props.pos.x}px) translateY(${props.pos.y}px) scale(${props.pos.scale})`,
  },
}))<IMapImageStyledProps>`
  width: 100%;
  cursor: grab;
`

interface IMapProps {
  debug?: boolean
}

const Map: FC<IMapProps> = ({ debug = false }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0, scale: 1 })
  const [zoomIncrement, zoomMax, zoomMin] = [0.3, 4, 1]
  const [dragState, setDragState] = useState({ dragging: false, x: 0, y: 0 })
  const [mapWidth, setMapWidth] = useState<number | undefined>(undefined)
  const [mapHeight, setMapHeight] = useState<number | undefined>(undefined)

  useEffect(() => {
    // Save new map width/height when resize window
    function handleResize() {
      setMapWidth(ref?.current?.offsetWidth)
      setMapHeight(ref?.current?.offsetHeight)
    }
    window.addEventListener("resize", handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const onClick = (e: MouseEvent<HTMLImageElement, MouseEvent>) => {
    console.log(e)
  }

  const newX = (value: number, newScale?: number): number => {
    const scale = newScale ? newScale : pos.scale
    const valueWithScale = value * scale
    const windowWidth = 988
    let newX = scale <= 1 ? 0 : pos.x + valueWithScale
    const imageFullWidth = windowWidth * scale
    const maximumMove = (imageFullWidth - windowWidth) / 2 + 40
    newX = Math.abs(newX) > maximumMove ? setSignDependingOnEntryNumber(newX, maximumMove) : newX

    return newX
  }

  const newY = (value: number, newScale?: number): number => {
    const scale = newScale ? newScale : pos.scale
    // console.log(scale)
    const valueWithScale = value * scale
    const mapHeight = 650
    let newY = scale <= 1 ? 0 : pos.y + valueWithScale
    const imageFullHeight = mapHeight * scale
    const maximumMove = (imageFullHeight - mapHeight) / 2
    newY = Math.abs(newY) > maximumMove ? setSignDependingOnEntryNumber(newY, maximumMove) : newY
    return newY
  }

  const moveX = (value: number) => {
    setPos({ ...pos, x: newX(value) })
  }

  const moveY = (value: number) => {
    setPos({ ...pos, y: newY(value) })
  }

  const zoomIn = () => {
    const newScale = pos.scale + zoomIncrement >= zoomMax ? zoomMax : pos.scale + zoomIncrement

    setPos({ ...pos, scale: newScale })
  }
  const zoomOut = () => {
    const newScale = pos.scale - zoomIncrement <= zoomMin ? zoomMin : pos.scale - zoomIncrement
    setPos({ scale: newScale, x: newScale <= 1 ? 0 : newX(0, newScale), y: newScale <= 1 ? 0 : newY(0, newScale) })
  }

  const onScroll = (e: WheelEvent) => {
    // console.log({ pageX: e.pageX, deltaX: e.deltaX, clientX: e.clientX, screenX: e.screenX, movementX: e.movementX })
    // e.preventDefault()
    e.stopPropagation()
    const delta = e.deltaY * -0.01
    const deltaX = e.deltaX * -1
    const newScale = pos.scale + delta

    // Scale
    let newScaleWithMax = newScale
    if (newScale >= zoomMax) newScaleWithMax = zoomMax
    if (newScale <= zoomMin) newScaleWithMax = zoomMin

    setPos({
      scale: newScaleWithMax,
      x: newX(deltaX, newScaleWithMax),
      y: newY(0, newScaleWithMax),
    })
  }

  const onDrag = (e: DragEvent) => {
    e.preventDefault()
  }
  const onDragStart = (e: DragEvent) => {
    const { offsetX, offsetY } = e.nativeEvent
    console.log("X :", ((offsetX + pos.x) / pos.scale) * (3282 / 988) - 35)
    console.log("Y :", ((offsetY + pos.y) / pos.scale) * (2160 / 650) - 105)
    // console.log("Offset X : ", offsetX)
    // console.log("Offset X : ", offsetX)
    // console.log("posX", pos.x)
    // console.log("scale : ", pos.scale)
    // console.log("ratio", 3282 / 988)
    e.dataTransfer.setDragImage(new Image(), 0, 0)

    setDragState({ dragging: true, x: e.clientX, y: e.clientY })
    // console.log("START Y : ", e.clientY)
  }

  const onDragEnd = (e: DragEvent) => {
    setDragState({ dragging: false, x: e.clientX, y: e.clientY })
  }

  const onDragOver = (e: DragEvent) => {
    setDragState({ dragging: true, x: e.clientX, y: e.clientY })
    setPos({ ...pos, x: newX((dragState.x - e.clientX) * -1), y: newY((dragState.y - e.clientY) * -1) })
  }

  function changeScroll() {
    let style = document.body.style.overflow
    document.body.style.overflow = style === "hidden" ? "auto" : "hidden"
  }

  return (
    <>
      {debug && (
        <p style={{ color: "white" }}>
          X : {pos.x} | Y : {pos.y} | Scale : {pos.scale}
        </p>
      )}
      <MapContainer
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onDragCapture={onDrag}
        draggable
        dragging={dragState.dragging}
        onWheelCapture={onScroll}
        onDragOver={onDragOver}
        onMouseEnter={changeScroll}
        onMouseLeave={changeScroll}
        ref={ref}
      >
        <MapButtonsWrapper>
          <BasicButton onClick={zoomIn}> + </BasicButton>
          <BasicButton onClick={zoomOut}> - </BasicButton>
          <BasicButton
            onClick={() => {
              moveX(-50)
            }}
          >
            ←
          </BasicButton>
          <BasicButton
            onClick={() => {
              moveX(50)
            }}
          >
            →
          </BasicButton>
          <BasicButton
            onClick={() => {
              moveY(-50)
            }}
          >
            ↓
          </BasicButton>
          <BasicButton
            onClick={() => {
              moveY(50)
            }}
          >
            ↑
          </BasicButton>
        </MapButtonsWrapper>
        <MapImage pos={pos} src="images/map.png" />
        <ClickableMapElement debug={debug} mapDimension={[mapWidth, mapHeight]} pos={pos} />
      </MapContainer>
    </>
  )
}

export default Map
