import styled, { css } from "styled-components"

export const StyledGame = styled.div<{ src?: string }>`
  padding: 20px;
  margin: -16px 0px 0px 0px;
  border-radius: 3px;
  border: 3px solid #b9896e;
  outline: 2px solid black;
  background: #f4f4f4;
  position: relative;

  ${(props) =>
    props.src &&
    css`
      background-size: cover;
      height: 412px;
      background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 10%, rgba(255, 255, 255, 0)), url(${props.src});
    `}
`

export const CharacterName = styled.h3`
  margin: 0;
  font-size: 1.4rem;
  text-align: center;
  margin-bottom: 12px;
  font-size: 1.1rem;

  position: absolute;
  bottom: 35px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
`

export const CharacterImage = styled.img`
  height: 280px;
  margin: 35px 0;

  :hover {
    cursor: pointer;
  }
`

export const DebugText = styled.div`
  position: absolute;
  padding: 10px;
  background: #e6e6e6be;
  color: black;
  font-family: "Courier New", Courier, monospace;
  top: 10px;
  right: 10px;
`

export const DungeonUnitIndicatorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  /* background: red; */
`

interface IDungeonUnitIndicator {
  status: "up" | "down" | "active"
  isBoss?: boolean
}

export const DungeonUnitIndicator = styled.div<IDungeonUnitIndicator>`
  display: flex;
  align-items: center;
  &::before {
    content: "";
    width: ${(props) => (props.isBoss ? "23px" : "12px")};
    height: ${(props) => (props.isBoss ? "23px" : "12px")};

    background: ${(props) => (props.status == "up" ? "#CCC" : props.status == "down" ? "#2a2a2a" : "#b4911d")};
    border: 2px solid ${(props) => (props.isBoss ? "#7c3333" : "#1a1a1a")};
    ${(props) =>
      props.isBoss &&
      `
      
      background-image:url('images/icons/pirateIcon.png');
      background-size: 20px 20px;
      background-position: center;
      margin-top:-5px;
      
       `}

    margin: 0px 10px;

    border-radius: 99px;
  }
`

export const MenuButtonWrapper = styled.div`
  display: flex;
  flex-grow: 0;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`
export const MenuButton = styled.button`
  cursor: pointer;
  padding: 8px 8px;
  border-radius: 3px;
  border: 2px solid #b9896e;
  outline: 1px solid black;
  background: #f4f4f4;
  font-size: 0.9em;
  text-align: center;
  transition: background-color 0.2s;

  &:hover {
    ${(props) => !props.disabled && `background-color: #dfd5c5;`}
  }
`
