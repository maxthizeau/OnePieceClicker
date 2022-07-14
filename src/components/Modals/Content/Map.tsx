import { FC, useCallback, useState, useEffect, Fragment } from "react"
import styled from "styled-components"
import { zoneIdVar } from "../../../lib/cache"
import { zones } from "../../../lib/data/zones"
import { EInstance } from "../../../lib/enums"
import useInstance from "../../../lib/hooks/useInstance"
import { IModalProps } from "../IModalProps"
import { CloseModalIcon, ModalButtonStyled, ModalContainer, ModalStyled } from "../ModalStyles"
import { getThumbImageSrc } from "../../../lib/clickerFunctions"
import useCards from "../../../lib/hooks/useCards"
import useUnitData from "../../../lib/hooks/useUnitData"
import PirateList from "./PirateDex/PirateList"
import { useReactiveVar } from "@apollo/client"
import { useGameState } from "../../../lib/hooks/GameContext"

const ModalWrapper = styled.div`
  display: flex;
`
const ZonesListWrapper = styled.div`
  padding: 10px;
`

const MapModalContent: FC = () => {
  const gameState = useGameState().state
  const [instance, changeInstance] = useInstance()
  const [cards] = useCards()
  const [data, dataByRarity] = useUnitData()
  const zoneId = useReactiveVar(zoneIdVar)
  const zone = zones[zoneId]

  return (
    <ModalWrapper>
      <ZonesListWrapper>
        <h3>Select a zone</h3>
        {zones
          .filter((zone) => zone.id <= gameState.maxZoneId)
          .map((x) => (
            <ModalButtonStyled
              key={x.id}
              onClick={() => {
                zoneIdVar(x.id)
                sessionStorage.setItem("zoneId", x.id.toString())
                changeInstance(EInstance.Zone)
              }}
            >
              #{x.id} : {x.location}
            </ModalButtonStyled>
          ))}
      </ZonesListWrapper>
    </ModalWrapper>
  )
}

export default MapModalContent
