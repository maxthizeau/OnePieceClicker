import { FC, useEffect, useRef, useState } from "react"
import styled from "styled-components"

type THozitontalPosition = "left" | "center" | "right"
type TVerticalPosition = "top" | "middle" | "bottom"

const HoverContent = styled.div<{
  horizontal?: THozitontalPosition
  vertical?: TVerticalPosition
  offset?: { x?: number; y?: number }
  dimensionWrapper: number[]
  dimensionContent: number[]
}>`
  /* display: none; */
  position: absolute;
  transition: 0s;
  opacity: 0;
  visibility: hidden;

  // Horizontal placement
  ${(props) => {
    const offset = props.offset?.x ?? 0
    if (props.horizontal == "left") return `right: ${props.dimensionWrapper[0] + offset}px;`
    if (props.horizontal == "right") return `left: ${props.dimensionWrapper[0] + offset}px;`
    if (props.horizontal == "center") return `left: ${-props.dimensionContent[0] / 2 + props.dimensionWrapper[0] / 2 + offset}px;`
  }}
  // Vertical placement
  ${(props) => {
    const offset = props.offset?.y ?? 0
    if (props.vertical == "top") return `bottom: ${props.dimensionWrapper[1] + offset}px;`
    if (props.vertical == "bottom") return `top: ${props.dimensionWrapper[1] + offset}px;`
    if (props.vertical == "middle") return `top: ${-props.dimensionContent[1] / 2 + props.dimensionWrapper[1] / 2 + offset}px;`
  }}

  z-index: 1000;
`
const HoverWrapper = styled.div<{ delayOpen?: number; positionStatic?: boolean }>`
  position: ${(props) => (props.positionStatic ? "static" : "relative")};

  font-family: "Open Sans", "arial";
  height: fit-content;

  &:hover ${HoverContent} {
    /* display: block; */
    visibility: visible;
    opacity: 1;
    transition-delay: ${(props) => props.delayOpen ?? 0}ms;
  }
`

interface IHoverProps {
  hoverContent: React.ReactNode
  horizontal?: THozitontalPosition
  vertical?: TVerticalPosition
  offset?: { x?: number; y?: number }
  delayOpen?: number
  children?: React.ReactNode
  positionStatic?: boolean
}

const Hover: FC<IHoverProps> = ({ hoverContent, children, horizontal, vertical, offset, delayOpen, positionStatic }) => {
  const refWrapper = useRef<HTMLDivElement>(null)
  const refContent = useRef<HTMLDivElement>(null)
  const [dimensionWrapper, setDimensionWrapper] = useState([0, 0])
  const [dimensionContent, setDimensionContent] = useState([0, 0])
  const [reload, setReload] = useState(false)

  useEffect(() => {
    function handleResize() {
      setDimensionWrapper([refWrapper.current?.clientWidth ?? 0, refWrapper.current?.clientHeight ?? 0])
      setDimensionContent([refContent.current?.clientWidth ?? 0, refContent.current?.clientHeight ?? 0])
    }
    window.addEventListener("resize", handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    setReload(!reload)
  }, [dimensionContent, dimensionWrapper])

  return (
    <HoverWrapper ref={refWrapper} delayOpen={delayOpen} positionStatic={positionStatic}>
      <HoverContent
        ref={refContent}
        horizontal={horizontal ?? "left"}
        vertical={vertical ?? "top"}
        dimensionWrapper={dimensionWrapper}
        dimensionContent={dimensionContent}
        offset={offset}
      >
        {hoverContent}
        {/* <p>
          Wrapper : [{dimensionWrapper[0]}, {dimensionWrapper[1]}]
        </p>
        <p>
          Content : [{dimensionContent[0]}, {dimensionContent[1]}]
        </p> */}
      </HoverContent>
      {children}
    </HoverWrapper>
  )
}

export default Hover
