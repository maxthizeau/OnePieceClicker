import { FC } from "react"
import styled from "styled-components"

const XPBarText = styled.span`
  position: absolute;
  font-size: 0.8em;
  left: 50%;
  bottom: -10px;
  transform: translateX(-50%);
  z-index: 3;
  display: none;
`
const XPBarStyled = styled.div`
  width: 100%;
  border-radius: 99px;
  padding: 3px 0px;
  background-color: #e4ac34;
  text-align: center;
  position: relative;
  z-index: 1;
  /* margin-top: -30px; */

  &:hover {
    cursor: default;

    ${XPBarText} {
      display: block;
    }
  }
`

const HitBarStyled = styled.div.attrs<{ percentHP: number }>((props) => ({
  style: {
    width: `${props.percentHP}%`,
    borderTopLeftRadius: `${props.percentHP == 100 ? "99px" : "0px"}`,
    borderBottomLeftRadius: `${props.percentHP == 100 ? "99px" : "0px"}`,
  },
}))<{ percentHP: number }>`
  width: 100%;
  border-top-right-radius: 99px;
  border-bottom-right-radius: 99px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #a3a3a3;
  z-index: 2;
  transition: width 0.2s;
`

interface IXPBarProps {
  maxXP: number
  currentXP: number
}

const CrewXPBar: FC<IXPBarProps> = ({ maxXP, currentXP }) => {
  return (
    <>
      <XPBarStyled>
        <HitBarStyled percentHP={(1 - currentXP / maxXP) * 100} />
        <XPBarText>
          {Math.round(currentXP)} / {Math.round(maxXP)}
        </XPBarText>
      </XPBarStyled>
    </>
  )
}

export default CrewXPBar
