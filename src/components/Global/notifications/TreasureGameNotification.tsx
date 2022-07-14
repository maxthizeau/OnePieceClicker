import { FC } from "react"
import styled from "styled-components"
import { getThumbImageSrc } from "../../../lib/clickerFunctions"
import { TUnit } from "../../../lib/types"

const NotificationWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const LeftSide = styled.div`
  padding: 7px 10px 5px 0px;
  margin-right: 20px;

  & img {
    width: 60px;
    height: 60px;
  }
`
const NotificationStyled = styled.div<{ type: string }>`
  display: flex;
  background-color: ${(props) => {
    if (props.type == "success") return "#3ca044"
    if (props.type == "warning") return "#a0763c"
    if (props.type == "gem") return "#3ca08e"
    if (props.type == "error") return "#a03c3c"
  }};
  border-radius: 5px;
  width: 100%;
  font-size: 0.8em;
  border-left: 10px solid;
  border-color: ${(props) => {
    if (props.type == "success") return "#186b2a"
    if (props.type == "warning") return "#6b5218"
    if (props.type == "gem") return "#186b63"
    if (props.type == "error") return "#6b1818"
  }};

  color: white;

  & ${LeftSide} {
    background-color: ${(props) => {
      if (props.type == "success") return "#186b2a"
      if (props.type == "warning") return "#6b5218"
      if (props.type == "gem") return "#186b63"
      if (props.type == "error") return "#6b1818"
    }} !important;
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

interface ITreasureGameNotificationProps {
  label: string
  message: string
  type: "error" | "gem" | "success" | "warning"
  gem?: string
}

const TreasureGameNotification: FC<ITreasureGameNotificationProps> = ({ label, message, type, gem }) => {
  // if (!unit) return null
  let image = ""
  if (type == "gem" && gem) {
    image = `images/treasure-game/gems/${gem}.png`
  }
  if (type == "error") {
    image = `images/icons/warningIcon.png`
  }
  if (type == "success") {
    image = `images/icons/winIcon.png`
  }
  if (type == "warning") {
    image = `images/icons/lightningIcon.png`
  }

  return (
    <NotificationStyled type={type}>
      <NotificationWrapper>
        <LeftSide>
          <img src={image} />
        </LeftSide>
        <RightSide>
          <NotificationTitle>{label}</NotificationTitle>

          <NotificationContent>{message}</NotificationContent>
        </RightSide>
      </NotificationWrapper>
    </NotificationStyled>
  )
}

export default TreasureGameNotification
