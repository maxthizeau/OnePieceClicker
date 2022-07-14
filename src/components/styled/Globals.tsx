import styled, { createGlobalStyle, css } from "styled-components"

export const GlobalStyle = createGlobalStyle`


  body {
    margin: 0;
    padding: 0;
    height: 100%;
  width: 100%;
    box-sizing: border-box;
    font-family: 'Press Start 2P', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    
    background-color: #272727;
        
  }

  button {
    font-family : inherit;
    font-size: 0.8em;
  }

  .notifications {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }

  
`

export const Container = styled.div`
  box-sizing: border-box;
  margin: auto;
  max-width: 1600px;
  height: 100%;
  padding: 20px;
  background-color: #272727;

  & * {
    box-sizing: border-box;
  }
`
interface ColumnStyledProps {
  span: number
}
export const Column = styled.div<ColumnStyledProps>`
  display: flex;
  flex-direction: column;

  ${(props) => props.span && `flex-basis: calc(100vw * ${props.span}/ 24);`}

  &:first-child {
    margin-left: 0px !important;
  }
  &:last-child {
    margin-right: 0px !important;
  }
`

interface RowStyledProps {
  gutter?: [number, number] | number
}
export const Row = styled.div<RowStyledProps>`
  display: flex;
  flex-direction: row;
  width: 100%;
  /* flex-wrap: wrap; */

  ${Column} {
    margin: ${({ gutter }) => (gutter ? (Array.isArray(gutter) ? `${gutter[0]}px ${gutter[1]}px` : `${gutter}px`) : `0px`)};
  }
`

export const Header = styled.header`
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const Logo = styled.img`
  max-width: 270px;
  height: 80px;
  margin-right: 30px;
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
