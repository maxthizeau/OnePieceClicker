import { FC } from "react"
import styled from "styled-components"
import { intWithSpaces } from "../../lib/clickerFunctions"

const HealthBarStyled = styled.div`
  width: 100%;
  border-radius: 99px;
  padding: 3px 0px;
  background-color: #a3a3a3;
  font-size: 10px;
  text-align: center;
  position: relative;
  z-index: 1;
  overflow: hidden;
  /* margin-top: -30px; */
`

const HitBarStyled = styled.div.attrs<{ percentHP: number }>((props) => ({
  style: {
    // translate: `${}%`,
    transform: `translateX(-${props.percentHP}%)`,
    borderTopLeftRadius: `${props.percentHP == 100 ? "99px" : "0px"}`,
    borderBottomLeftRadius: `${props.percentHP == 100 ? "99px" : "0px"}`,
  },
}))<{ percentHP: number }>`
  border-top-right-radius: 99px;
  border-bottom-right-radius: 99px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background-color: #27af39;
  z-index: 2;
  transition: transform 0.2s;
`

// const HitBarStyled = styled.div<{ percentHP: number }>`
//   border-top-right-radius: 99px;
//   border-bottom-right-radius: 99px;
//   position: absolute;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   width: 100%;
//   transform: translateX(-${(props) => props.percentHP}%);
//   border-top-left-radius: ${(props) => (props.percentHP == 100 ? "99px" : "0px")};
//   border-bottom-left-radius: ${(props) => (props.percentHP == 100 ? "99px" : "0px")};
//   background-color: #27af39;
//   z-index: 2;
//   transition: transform 0.2s;
//   /* animation: right-animate 1s ease infinite alternate; */
// `

const HealthBarText = styled.span`
  position: relative;
  z-index: 3;
`

interface IHealthBarProps {
  maxHP: number
  currentHP: number
}

const HealthBar: FC<IHealthBarProps> = ({ maxHP, currentHP }) => {
  return (
    <>
      <HealthBarStyled>
        <HitBarStyled percentHP={(1 - currentHP / maxHP) * 100} />
        <HealthBarText>
          {intWithSpaces(currentHP)} / {intWithSpaces(maxHP)}
        </HealthBarText>
      </HealthBarStyled>
    </>
  )
}

export default HealthBar
