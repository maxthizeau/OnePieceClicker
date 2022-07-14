import { FC, useEffect, useState } from "react"
import styled from "styled-components"
import { getThumbImageSrc, idNumberToString } from "../../../lib/clickerFunctions"
import { ships } from "../../../lib/data/ships"
import { TZone, zones } from "../../../lib/data/zones"
import useUnitData from "../../../lib/hooks/useUnitData"
import { IDungeonState, IShip, TUnit } from "../../../lib/types"
import { MenuButton } from "../ClickerStyles"

const PopupStyled = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #fffffff5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
`

const TitleStyled = styled.h1`
  text-align: center;
`
const SubTitleStyled = styled.h3`
  text-align: center;
`

interface IFirstClearMessageProps {
  dungeon: IDungeonState
  zoneId: number
}

enum EContentType {
  ZONE,
  FLEET,
  BOAT,
}

type TContent = {
  type: EContentType
  value: any
}

const ShowStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  text-align: center;
`

const ShowWithImage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  text-align: center;
  & img {
    width: 70px;
    height: 70px;
  }
`

const ShowZone: FC<{ content: TContent }> = ({ content }) => {
  const value: TZone = content.value
  return (
    <ShowStyled>
      <div>You have access to a new zone </div>
      <div>{value.location ?? "Unknown"}</div>
    </ShowStyled>
  )
}
const ShowFleetMember: FC<{ content: TContent }> = ({ content }) => {
  const value: TUnit = content.value
  return (
    <ShowStyled>
      <div>A new member has joined your fleet ! </div>
      <ShowWithImage>
        <img src={getThumbImageSrc(value.id)} />
        <div>{value.name ?? "Unknown"}</div>
      </ShowWithImage>
    </ShowStyled>
  )
}
const ShowBoat: FC<{ content: TContent }> = ({ content }) => {
  const value: IShip = content.value
  return (
    <ShowStyled>
      <div>New ship :</div>
      <ShowWithImage>
        <img src={`images/ships/icon/${value.thumb}_t2.png`} />
        <div>{value.name ?? "Unknown"}</div>
      </ShowWithImage>
    </ShowStyled>
  )
}

const FirstClearMessage: FC<IFirstClearMessageProps> = ({ dungeon, zoneId }) => {
  const [content, setContent] = useState<TContent[]>([])
  const [showIndex, setShowIndex] = useState(0)
  const [units] = useUnitData()
  useEffect(() => {
    const newContent: TContent[] = []
    const currentZone = zones.find((x) => x.id == zoneId)
    if (!currentZone) return
    const nextZone = zones.find((x) => x.id == zoneId + 1)
    if (nextZone) {
      newContent.push({ type: EContentType.ZONE, value: nextZone })
    }
    if (dungeon && !dungeon.alreadyClearedOnce) {
      for (let i = 0; i < currentZone.freeMembers.length; i++) {
        const freeMemberId = currentZone.freeMembers[i]
        const freeMemberFull = units.find((x) => x.id == freeMemberId)
        if (!freeMemberFull) {
          continue
        }
        newContent.push({ type: EContentType.FLEET, value: freeMemberFull })
      }
      for (let i = 0; i < currentZone.freeBoat.length; i++) {
        const freeBoatId = currentZone.freeBoat[i]
        const freeBoatFull = ships.find((x) => x.id == freeBoatId)
        if (!freeBoatFull) {
          continue
        }
        newContent.push({ type: EContentType.BOAT, value: freeBoatFull })
      }
    }
    setContent(newContent)
  }, [])

  if (showIndex >= content.length) {
    return null
  }
  return (
    <PopupStyled>
      <TitleStyled>Victory !</TitleStyled>
      {content[showIndex] && content[showIndex].type == EContentType.ZONE && <ShowZone content={content[showIndex]} />}
      {content[showIndex] && content[showIndex].type == EContentType.FLEET && <ShowFleetMember content={content[showIndex]} />}
      {content[showIndex] && content[showIndex].type == EContentType.BOAT && <ShowBoat content={content[showIndex]} />}
      <MenuButton style={{ marginTop: "20px" }} onClick={() => setShowIndex(showIndex + 1)}>
        Next
      </MenuButton>
    </PopupStyled>
  )
}

export default FirstClearMessage
