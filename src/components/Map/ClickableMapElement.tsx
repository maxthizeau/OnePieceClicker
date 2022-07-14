import { FC, HTMLAttributes, useRef } from "react"
import styled from "styled-components"

interface IClickableMapElementProps {
  pos: {
    x: number
    y: number
    scale: number
  }
  mapDimension: [number | undefined, number | undefined]
  debug?: boolean
}

// const ButtonWrapper = styled.div<IClickableMapElementProps>`
//   position: absolute;
//   top: 0;
//   left: 0;
//   height: 100%;
//   width: ${(props) => props.mapDimension[0] ?? 0}px;
//   transform: ${(props) => `translateX(${props.pos.x}px) translateY(${props.pos.y}px) scale(${props.pos.scale})`};

//   /* background: #92101089; */
// `
//   left: ${(props) => props.pos.x - 50 * (props.pos.scale - 1)}px;
//   top: ${(props) => props.pos.y + 30 * (props.pos.scale - 1)}px;
//   transform: scale(${(props) => props.pos.scale});

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

type IPointColor = {
  border?: string
  background?: string
  text?: string
  buttonBackground?: string
  buttonText?: string
  buttonBorder?: string
}

interface IClickablePointStyledProps extends HTMLAttributes<HTMLDivElement> {
  x: number
  y: number
  colors?: IPointColor
}

const PointInfoBox = styled.div`
  position: absolute;
  padding: 5px 10px;
  font-size: 0.5em;
  top: 18px;
  left: 50%;
  transform: translate(-50%, -100%);
  max-width: 120px;
  box-shadow: 0px 1px 2px #ccc;
  text-align: center;

  &::after {
    content: "";
    position: absolute;
    left: 42%;
    top: 100%;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;

    clear: both;
  }
`

const InfoBoxButton = styled.a`
  display: block;
  text-transform: uppercase;
  font-size: 0.7em;
  margin-top: 3px;
  border-radius: 3px;
  padding: 0px 3px;
`

const ClickablePoint = styled.div<IClickablePointStyledProps>`
  position: absolute;
  width: 18px;
  height: 20px;
  border-radius: 90px;
  border: 3px solid ${(props) => (props.colors?.border ? props.colors.border : `#ff0000`)};
  background-color: ${(props) => (props.colors?.background ? props.colors.background : `#fff`)};
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  cursor: pointer;
  &::after {
    content: "";
    position: absolute;
    left: -1.1px;
    top: 99%;
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 10px solid ${(props) => (props.colors?.border ? props.colors.border : `#ff0000`)};
    clear: both;
  }
  ${PointInfoBox} {
    color: ${(props) => (props.colors?.text ? props.colors.text : `#000`)};
    background: ${(props) => (props.colors?.border ? props.colors.border : `#ff0000`)};

    &::after {
      border-top: 10px solid ${(props) => (props.colors?.border ? props.colors.border : `#ff0000`)};
    }

    ${InfoBoxButton} {
      border: 1px solid ${(props) => (props.colors?.buttonBorder ? props.colors.buttonBorder : `#ff0000`)};
      background: ${(props) => (props.colors?.buttonBackground ? props.colors.buttonBackground : `#CCC`)};
      color: ${(props) => (props.colors?.buttonText ? props.colors.buttonText : `#000`)};
    }
  }
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

  function calculatePropsCoordonates(pos: [number, number]): { x: number; y: number } {
    if (!mapDimension[0] || !mapDimension[1]) return { x: 0, y: 0 }
    const x = pos[0] / (baseDimension[0] / mapDimension[0])
    const y = pos[1] / (baseDimension[1] / mapDimension[1])
    return { x: x, y: y }
  }

  const colors: IPointColor = {
    background: "#ce9e9e",
    border: "#c80c0c",
    text: "#f0f0f0",
    buttonBackground: "#f3adad",
    buttonText: "#000000",
    buttonBorder: "#be6c6c",
  }

  if (!mapDimension[0] || !mapDimension[1]) {
    return <p>Loading...</p>
  }
  return (
    <>
      <ButtonWrapper pos={pos} mapDimension={mapDimension}>
        {debug && (
          <PositionLogs>
            [{mapDimension[0]}, {mapDimension[1]}]
          </PositionLogs>
        )}
        <ClickablePoint {...calculatePropsCoordonates([1985, 720])} colors={colors}>
          <PointInfoBox>
            <span>Baratie</span>
            <InfoBoxButton>Navigate</InfoBoxButton>
          </PointInfoBox>
        </ClickablePoint>
        <ClickablePoint {...calculatePropsCoordonates([1348, 1095])} colors={colors} />
      </ButtonWrapper>
    </>
  )
}

export default ClickableMapElement
