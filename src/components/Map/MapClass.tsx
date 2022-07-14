import { Component, DragEvent, FC, useState, WheelEvent } from "react"
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
  width: 100%;
  height: 400px;
  cursor: grab;
`

const MapButtonsWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: row;
  z-index: 99;
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

const MapImage = styled.img<IMapImageStyledProps>`
  width: 100%;
  transform: ${(props) => `translateX(${props.pos.x}px) translateY(${props.pos.y}px) scale(${props.pos.scale})`};
  cursor: grab;
`

interface IMapProps {}

type TPos = {
  x: number
  y: number
  scale: number
}
type TDragState = {
  dragging: boolean
  x: number
  y: number
}

interface IMapState {
  pos: TPos
  dragState: TDragState
  zoom: {
    zoomIncrement: number
    zoomMax: number
    zoomMin: number
  }
}

class Map extends Component<IMapProps, IMapState> {
  constructor(props: IMapProps) {
    super(props)
    this.state = {
      pos: {
        x: 0,
        y: 0,
        scale: 1,
      },
      dragState: {
        dragging: false,
        x: 0,
        y: 0,
      },
      zoom: {
        zoomIncrement: 0.3,
        zoomMax: 4,
        zoomMin: 1,
      },
    }
    this.newX = this.newX.bind(this)
    this.newY = this.newY.bind(this)
    this.moveX = this.moveX.bind(this)
    this.moveY = this.moveY.bind(this)
    this.setPos = this.setPos.bind(this)
    this.setDragState = this.setDragState.bind(this)
    this.zoomIn = this.zoomIn.bind(this)
    this.zoomOut = this.zoomOut.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.onDrag = this.onDrag.bind(this)
    this.onDragStart = this.onDragStart.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
  }
  // const [pos, setPos] = useState({ x: 0, y: 0, scale: 1 })
  // const [dragState, setDragState] = useState({ dragging: false, x: 0, y: 0 })

  newX(value: number, newScale?: number): number {
    const scale = newScale ? newScale : this.state.pos.scale
    const valueWithScale = value * scale
    const windowWidth = window.innerWidth
    let newX = scale <= 1 ? 0 : this.state.pos.x + valueWithScale
    const imageFullWidth = windowWidth * scale
    const maximumMove = (imageFullWidth - windowWidth - 30 * scale) / 2
    newX = Math.abs(newX) > maximumMove ? setSignDependingOnEntryNumber(newX, maximumMove) : newX

    return newX
  }

  newY(value: number, newScale?: number): number {
    const scale = newScale ? newScale : this.state.pos.scale
    const valueWithScale = value * scale
    const mapHeight = 400
    let newY = scale <= 1 ? 0 : this.state.pos.y + valueWithScale
    const imageFullHeight = mapHeight * scale
    const maximumMove = (imageFullHeight - mapHeight) / 2
    newY = Math.abs(newY) > maximumMove ? setSignDependingOnEntryNumber(newY, maximumMove) : newY
    return newY
  }

  moveX(value: number) {
    this.setState({
      ...this.state,
      pos: {
        ...this.state.pos,
        x: this.newX(value),
      },
    })
  }

  moveY(value: number) {
    this.setState({
      ...this.state,
      pos: {
        ...this.state.pos,
        y: this.newY(value),
      },
    })
  }

  setPos(pos: TPos) {
    this.setState({ ...this.state, pos })
  }

  setDragState(dragState: TDragState) {
    this.setState({ ...this.state, dragState })
  }

  zoomIn() {
    const { zoomIncrement, zoomMax, zoomMin } = this.state.zoom
    const newScale = this.state.pos.scale + zoomIncrement >= zoomMax ? zoomMax : this.state.pos.scale + zoomIncrement
    this.setPos({ ...this.state.pos, scale: newScale })
  }
  zoomOut() {
    const { zoomIncrement, zoomMax, zoomMin } = this.state.zoom
    const newScale = this.state.pos.scale - zoomIncrement <= zoomMin ? zoomMin : this.state.pos.scale - zoomIncrement
    this.setPos({ scale: newScale, x: newScale <= 1 ? 0 : this.newX(0, newScale), y: newScale <= 1 ? 0 : this.newY(0, newScale) })
  }

  onScroll(e: WheelEvent) {
    // console.log({ pageX: e.pageX, deltaX: e.deltaX, clientX: e.clientX, screenX: e.screenX, movementX: e.movementX })

    const { pos, zoom } = this.state
    const { zoomMin, zoomMax } = zoom

    const delta = e.deltaY * -0.01
    const deltaX = e.deltaX * -1
    const newScale = pos.scale + delta

    // Scale
    let newScaleWithMax = newScale
    if (newScale >= zoomMax) newScaleWithMax = zoomMax
    if (newScale <= zoomMin) newScaleWithMax = zoomMin

    this.setPos({
      scale: newScaleWithMax,
      x: this.newX(deltaX, newScaleWithMax),
      y: this.newY(0, newScaleWithMax),
    })
  }

  onDrag(e: DragEvent) {
    e.preventDefault()
  }
  onDragStart(e: DragEvent) {
    e.dataTransfer.setDragImage(new Image(), 0, 0)

    this.setDragState({ dragging: true, x: e.clientX, y: e.clientY })
    // console.log("START Y : ", e.clientY)
  }

  onDragEnd(e: DragEvent) {
    this.setDragState({ dragging: false, x: e.clientX, y: e.clientY })
  }

  onDragOver(e: DragEvent) {
    const { pos, dragState } = this.state
    this.setDragState({ dragging: true, x: e.clientX, y: e.clientY })
    this.setPos({ ...pos, x: this.newX((dragState.x - e.clientX) * -1), y: this.newY((dragState.y - e.clientY) * -1) })
  }

  render() {
    const { pos, dragState, zoom } = this.state
    return (
      <>
        <p style={{ color: "white" }}>
          X : {pos.x} | Y : {pos.y} | Scale : {pos.scale}
        </p>
        <MapContainer
          onDragEnd={this.onDragEnd}
          onDragStart={this.onDragStart}
          onDragCapture={this.onDrag}
          draggable
          dragging={dragState.dragging}
          onWheelCapture={this.onScroll}
          onDragOver={this.onDragOver}
        >
          <MapButtonsWrapper>
            <BasicButton onClick={this.zoomIn}> + </BasicButton>
            <BasicButton onClick={this.zoomOut}> - </BasicButton>
            <BasicButton
              onClick={() => {
                this.moveX(-50)
              }}
            >
              ←
            </BasicButton>
            <BasicButton
              onClick={() => {
                this.moveX(50)
              }}
            >
              →
            </BasicButton>
            <BasicButton
              onClick={() => {
                this.moveY(-50)
              }}
            >
              ↓
            </BasicButton>
            <BasicButton
              onClick={() => {
                this.moveY(50)
              }}
            >
              ↑
            </BasicButton>
          </MapButtonsWrapper>
          <MapImage pos={pos} src="map.png" />
          <ClickableMapElement pos={pos} />
        </MapContainer>
      </>
    )
  }
}

export default Map
