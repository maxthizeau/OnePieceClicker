import { FC } from "react"
import styled from "styled-components"
import { zones } from "../../lib/data/zones"
import { useGameState } from "../../lib/hooks/GameContext"
import ClickablePoint from "./ClickablePoint"

interface IClickableMapElementProps {
  pos: {
    x: number
    y: number
    scale: number
  }
  mapDimension: [number | undefined, number | undefined]
  debug?: boolean
}

const ButtonWrapper = styled.div.attrs<IClickableMapElementProps>((props) => ({
  style: {
    width: `${props.mapDimension[0] ?? 0}px`,
    transform: `translateX(${props.pos.x}px) translateY(${props.pos.y}px) scale(${props.pos.scale})`,
  },
}))<IClickableMapElementProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
`

const PositionLogs = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  text-shadow: 1px 1px 1px black;
`

const ClickableMapElement: FC<IClickableMapElementProps> = ({ pos, mapDimension, debug = false }) => {
  const baseDimension: [number, number] = [3282, 2160]
  const gameState = useGameState()

  function calculatePropsCoordonates(pos: [number, number]): { x: number; y: number } {
    if (!mapDimension[0] || !mapDimension[1]) return { x: 0, y: 0 }
    const x = pos[0] / (baseDimension[0] / mapDimension[0])
    const y = pos[1] / (baseDimension[1] / mapDimension[1])
    return { x: x, y: y }
  }

  if (!mapDimension[0] || !mapDimension[1]) {
    return <p>Loading...</p>
  }
  return (
    <>
      <ButtonWrapper pos={pos} mapDimension={mapDimension}>
        {/* {debug && (
          <PositionLogs>
            [{mapDimension[0]}, {mapDimension[1]}]
          </PositionLogs>
        )} */}
        {zones
          .filter((zone) => zone.id <= gameState.state.maxZoneId)
          .map((x) => {
            const isCurrent = x.id === gameState.state.currentZone
            return <ClickablePoint isCurrent={isCurrent} key={x.id} zone={x} {...calculatePropsCoordonates([x.mapCoordonates.x, x.mapCoordonates.y])} />
          })}
        {/* <ClickablePoint {...calculatePropsCoordonates([1348, 1095])} colors={colors} /> */}
      </ButtonWrapper>
    </>
  )
}

export default ClickableMapElement
