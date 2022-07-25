import { FC } from "react"
import styled from "styled-components"

const StatStyled = styled.div`
  color: white;
  display: flex;
  margin-bottom: 35px;
`

const StatLogoWrapper = styled.div`
  width: 25px;
  margin-right: 12px;
  align-self: center;

  img {
    width: 100%;
  }
`

const StatTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

interface IStatProps {
  logo: string
  label: string
  value: string
}

const Stat: FC<IStatProps> = ({ logo, label, value }) => {
  return (
    <StatStyled>
      <StatLogoWrapper>
        <img src={logo} />
      </StatLogoWrapper>
      <StatTextWrapper>
        <span>{label}</span>
        <span>{value}</span>
      </StatTextWrapper>
    </StatStyled>
  )
}

export default Stat
