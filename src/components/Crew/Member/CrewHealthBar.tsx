import { FC } from "react"
import styled from "styled-components"

const HealthBarText = styled.span`
  position: absolute;
  font-size: 0.8em;
  left: 50%;
  top: -10px;
  transform: translateX(-50%);
  z-index: 3;
  display: none;
`

const HealthBarStyled = styled.div`
  width: 100%;
  border-radius: 99px;
  padding: 3px 0px;
  background-color: #27af39;
  text-align: center;
  position: relative;
  z-index: 1;
  margin-bottom: 7px;

  &:hover {
    cursor: default;

    ${HealthBarText} {
      display: block;
    }
  }
  /* margin-top: -30px; */
`

const HitBarStyled = styled.div<{ percentHP: number }>`
  border-top-right-radius: 99px;
  border-bottom-right-radius: 99px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: ${(props) => props.percentHP}%;
  border-top-left-radius: ${(props) => (props.percentHP == 100 ? "99px" : "0px")};
  border-bottom-left-radius: ${(props) => (props.percentHP == 100 ? "99px" : "0px")};
  background-color: #a3a3a3;
  z-index: 2;
  transition: width 0.2s;
`

interface IHealthBarProps {
  maxHP: number
  currentHP: number
}

const CrewHealthBar: FC<IHealthBarProps> = ({ maxHP, currentHP }) => {
  return (
    <>
      <HealthBarStyled>
        <HitBarStyled percentHP={(1 - currentHP / maxHP) * 100} />
        <HealthBarText>
          {currentHP} / {maxHP}
        </HealthBarText>
      </HealthBarStyled>
    </>
  )
}

export default CrewHealthBar
