import { FC, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { EStepKeys } from "../../lib/data/tutorial"
import { useTutorial } from "../../lib/hooks/TutorialContext"

type THozitontalPosition = "left" | "center" | "right"
type TVerticalPosition = "top" | "middle" | "bottom"

const TutorialElementStyled = styled.div<{
  horizontal?: THozitontalPosition
  vertical?: TVerticalPosition
  offset?: { x?: number; y?: number }
  width?: number
  height?: number
  dimension: number[]
  isInModal?: boolean
}>`
  position: absolute;
  ${({ width }) => (width !== undefined ? `width: ${width}px;` : "")}
  ${({ height }) => (height !== undefined ? `height: ${height}px;` : "")}
  background-color: white;
  z-index: ${({ isInModal }) => (isInModal ? 1205 : 495)};
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  border-radius: 3px;
  padding: 10px;
  line-height: 1.5em;
  font-size: 14px;

  // Horizontal placement
  ${(props) => {
    const offset = props.offset?.x ?? 0
    if (props.horizontal == "left") return `left: ${0 + offset}px;`
    if (props.horizontal == "right") return `right: ${0 + offset}px;`
    if (props.horizontal == "center") return `left: 50%;transform:translateX(-50%);`
  }}
  // Vertical placement
  ${(props) => {
    const offset = props.offset?.y ?? 0
    if (props.vertical == "top") return `top: ${0 + offset}px;`
    if (props.vertical == "bottom") return `bottom: ${0 + offset}px;`
    if (props.vertical == "middle") return `top: 50%;transform:translateY(-50%);`
  }}

  & .tutorial-goal {
    text-align: center;
    font-weight: bold;
    margin-top: 10px;
  }

  & ul li {
    list-style: none;
    margin-bottom: 10px;
  }

  & h3 {
    margin: 10px 0px;
    font-size: 1.1em;
  }

  & p {
    margin-bottom: 10px;
  }
`

const NextButton = styled.button`
  display: block;
  margin: 10px auto 5px auto;
  padding: 3px 6px;
`

interface ITutorialElementProps {
  children?: React.ReactNode
  horizontal?: THozitontalPosition
  vertical?: TVerticalPosition
  offset?: { x?: number; y?: number }
  width?: number
  height?: number
  stepKey: EStepKeys
  isInModal?: boolean
}

const TutorialElement: FC<ITutorialElementProps> = ({ children, horizontal, vertical, offset, width, height, stepKey, isInModal }) => {
  const [dimension, setDimension] = useState([0, 0])
  const refWrapper = useRef<HTMLDivElement>(null)
  const [reload, setReload] = useState(false)
  const { step, state, dispatch } = useTutorial()

  useEffect(() => {
    function handleResize() {
      setDimension([refWrapper.current?.clientWidth ?? 0, refWrapper.current?.clientHeight ?? 0])
    }
    window.addEventListener("resize", handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    setReload(!reload)
  }, [dimension])

  const isStepKey = step && step?.stepKey == stepKey
  if (!isStepKey || !state.showModal) return null
  return (
    <TutorialElementStyled
      ref={refWrapper}
      width={width}
      height={height}
      dimension={dimension}
      horizontal={horizontal ?? "left"}
      vertical={vertical ?? "top"}
      offset={offset}
      isInModal={isInModal}
    >
      {children}
      {(step.showCloseModalButton || step.doneOnModalClose) && <NextButton onClick={() => dispatch.clickCloseModal()}>Next</NextButton>}
    </TutorialElementStyled>
  )
}

export default TutorialElement
