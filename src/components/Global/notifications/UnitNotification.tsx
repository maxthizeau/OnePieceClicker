import { FC } from "react"
import styled from "styled-components"
import { getThumbImageSrc } from "../../../lib/clickerFunctions"
import { TUnit } from "../../../lib/types"

const NotificationStyled = styled.div`
  display: flex;
  background-color: #3ca044;
  border-radius: 5px;
  width: 100%;
  font-size: 0.8em;
  border-left: 10px solid #186b2a;
  color: white;
`

const NotificationWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const LeftSide = styled.div`
  background-color: #186b2a !important;
  padding: 7px 10px 5px 0px;
  margin-right: 20px;

  & img {
    width: 60px;
    height: 60px;
  }
`

const RightSide = styled.div`
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* flex-grow: 1; */
`

const NotificationTitle = styled.h4`
  color: white;
  font-weight: bold;
  margin: 0 0 5px 0;
`

const NotificationContent = styled.div`
  font-size: 0.8rem;
`

interface ICardLootNotification {
  label: string
  unit: TUnit
}

const UnitNotification: FC<ICardLootNotification> = ({ label, unit }) => {
  if (!unit) return null
  return (
    <NotificationStyled>
      <NotificationWrapper>
        <LeftSide>
          <img src={getThumbImageSrc(unit.id)} />
        </LeftSide>
        <RightSide>
          <NotificationTitle>{label}</NotificationTitle>

          <NotificationContent>{unit.name}</NotificationContent>
        </RightSide>
      </NotificationWrapper>
    </NotificationStyled>
  )
}

export default UnitNotification
