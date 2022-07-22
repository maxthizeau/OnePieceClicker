import styled, { createGlobalStyle, css } from "styled-components"

function getWidthString(span: number) {
  if (!span) return
  let width = (span / 24) * 100
  return `width: ${width}%;`
}

export const GlobalStyle = createGlobalStyle`

* {
  margin:0;
padding:0;
box-sizing: border-box;
}

  body, html {
    margin: 0;
    padding: 0;
    /* height: 100vh; */
  width: 100vw;
    box-sizing: border-box;
    font-family: 'Press Start 2P', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 0.9em;
    background-color: #272727;
    white-space: pre-line;

        
  }

  button {
    font-family : inherit;
    font-size: 0.8em;
  }

  .notifications {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }

  .isTutorial {
    outline: 3px solid #d24747;
    z-index: 500;
    /* position:relative; */
  }
  .inModal {
    /* z-index: 3!important; */
    position:sticky;
  }
  .noOutline {
    outline:none!important;
  }

  
`

export const TutorialContainer = styled.div<{ active?: boolean; isInModal?: boolean }>`
  ${({ active }) => !active && "display:none;"}
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: #0000008b;
  z-index: 490;
`
/* z-index: ${({ isInModal }) => (isInModal ? 2 : 490)}; */

export const CloseTutorialButton = styled.a`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  border: 2px solid black;
  background: #ffffff;
  border-radius: 3px;
  padding: 10px;
  font-family: Open Sans, Verdana, Geneva, Tahoma, sans-serif;
`

export const Container = styled.div`
  box-sizing: border-box;

  margin: 0px auto !important;
  width: 500px;
  height: 100%;
  padding: 20px;
  background-color: #272727;
  display: flex;
  flex-flow: row wrap;

  @media only screen and (min-width: 768px) {
    width: 760px;
  }
  @media only screen and (min-width: 992px) {
    width: 990px;
  }
  @media only screen and (min-width: 1200px) {
    width: 1200px;
  }
  @media only screen and (min-width: 1550px) {
    width: 1500px;
  }

  & * {
    box-sizing: border-box;
  }
`
interface ColumnStyledProps {
  span: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  position?: number
  xsPosition?: number
  smPosition?: number
  mdPosition?: number
  lgPosition?: number
}
// ${(props) => props.span && `flex-basis: calc(100vw * ${props.span}/ 24);`}
export const Column = styled.div<ColumnStyledProps>`
  display: flex;
  flex-direction: column;
  /* float: left; */
  ${({ xs, span }) => (xs ? getWidthString(xs) : getWidthString(span))}

  ${({ position }) => position !== undefined && `order: ${position};`} 
  ${({ xsPosition }) => xsPosition !== undefined && `order: ${xsPosition};`} 

  @media only screen and (max-width: 991px) {
    ${({ sm, span }) => (sm ? getWidthString(sm) : getWidthString(span))}
    ${({ smPosition }) => smPosition !== undefined && `order: ${smPosition};`}
  }
  @media only screen and (min-width: 992px) {
    ${({ md, span }) => (md ? getWidthString(md) : getWidthString(span))}
    ${({ mdPosition }) => mdPosition !== undefined && `order: ${mdPosition};`}
  }
  @media only screen and (min-width: 1200px) {
    ${({ lg, span }) => (lg ? getWidthString(lg) : getWidthString(span))}
    ${({ lgPosition }) => lgPosition !== undefined && `order: ${lgPosition};`}
  }
  @media only screen and (min-width: 1500px) {
    ${({ span }) => getWidthString(span)}
    ${({ position }) => position !== undefined && `order: ${position};`}
  }

  &:first-child {
    padding-left: 0px !important;
  }
  &:last-child {
    padding-right: 0px !important;
  }
`

interface RowStyledProps {
  gutter?: [number, number] | number
}
export const Row = styled.div<RowStyledProps>`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;

  ${Column} {
    padding: ${({ gutter }) => (gutter ? (Array.isArray(gutter) ? `${gutter[0]}px ${gutter[1]}px` : `${gutter}px`) : `0px`)};
  }
`

export const Header = styled.header`
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  /* flex-wrap: wrap; */
  /* justify-content: center; */

  @media only screen and (min-width: 1200px) {
    justify-content: space-between;
    flex-wrap: nowrap;
    /* margin-top: 20px; */
    /* margin-bottom: 45px; */
  }
  @media only screen and (min-width: 1550px) {
    margin-bottom: 0;
  }
`

export const Logo = styled.img`
  max-width: 180px;
  height: 60px;
  margin: auto;
  @media only screen and (min-width: 992px) {
    margin: 0 30px 0 0;
  }
`

export const Center = styled.div`
  margin: auto;
  text-align: center;
`

export const Box = styled.div`
  background-color: #242424;
  border: 2px solid white;
  padding: 20px;
`

export const ShowScrollBar = css`
  &::-webkit-scrollbar {
    -webkit-appearance: none;
  }

  &::-webkit-scrollbar:vertical {
    width: 11px;
  }

  &::-webkit-scrollbar:horizontal {
    height: 0px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    border: 2px solid #b9896e; /* should match background, can't be transparent */
    background-color: rgba(0, 0, 0, 0.5);
  }
`

export const BerryIcon = styled.span<{ width?: number; marginTop?: number; marginBottom?: number; marginLeft?: number; marginRight?: number }>`
  display: inline-block;
  content: "";
  width: ${(props) => (props.width ? props.width : "10")}px;
  height: ${(props) => (props.width ? props.width * 1.58 : "15.8")}px;
  background-image: url("images/icons/berry.png");
  background-size: contain;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "4")}px;
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : "0")}px;
  margin-right: ${(props) => (props.marginRight ? props.marginRight : "0")}px;
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : "0")}px;

  /* background-position: -12px -10px; */
`
