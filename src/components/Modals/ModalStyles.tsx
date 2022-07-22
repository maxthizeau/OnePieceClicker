import styled from "styled-components"
import { ShowScrollBar } from "../styled/Globals"

export const ModalContainer = styled.div`
  background-color: #00000042;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 700;
  display: flex;
  justify-content: center;
  align-items: center;

  & h3 {
    margin: 20px 0px 20px 0px;
  }
`

export const ModalStyled = styled.div`
  position: relative;
  border: 3px solid #eee2ba;
  outline: 2px solid black;
  background: #b9896e;
  border-radius: 3px;
  /* min-width: 500px; */
  /* max-width: 800px; */
  padding: 20px;
  max-height: 90vh;
  max-width: 1200px;
  overflow: scroll;
  ${ShowScrollBar}
`

export const ModalButtonStyled = styled.a`
  display: flex;
  cursor: pointer;
  background: white;
  border: 3px solid #eee2ba;
  outline: 2px solid black;
  border-radius: 3px;
  margin-bottom: 20px;
  padding: 5px;
  text-align: left;
`

export const CloseModalIcon = styled.a`
  position: absolute;
  cursor: pointer;
  top: 2vh;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 200px;
  padding: 5px;
  z-index: 100;
  background: #a63333;
  color: white;
  border-radius: 99px;
`

export const ModalSubtitle = styled.p`
  width: 80%;
  color: #272727;
  font-size: 0.8rem;
  margin: 10px auto;
`

export const SmallModalSubtitle = styled(ModalSubtitle)`
  font-size: 0.7rem;
`

export const ActionButton = styled.button`
  cursor: pointer;
`
export const TableFilters = styled.div`
  font-family: "Courier New", Courier, monospace;
`

export const FilterButton = styled.button`
  margin: 10px;
`

export const SearchInput = styled.input`
  margin: 10px;
`
