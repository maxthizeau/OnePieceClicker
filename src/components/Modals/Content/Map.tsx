import { FC } from "react"
import styled from "styled-components"
import { zones } from "../../../lib/data/zones"
import { EInstance } from "../../../lib/enums"
import useInstance from "../../../lib/hooks/useInstance"
import { ModalButtonStyled } from "../ModalStyles"
import useCards from "../../../lib/hooks/useCards"
import useUnitData from "../../../lib/hooks/useUnitData"
import { ActionEnum, useGameState } from "../../../lib/hooks/GameContext"
import useTranslation from "next-translate/useTranslation"
import { useTutorial } from "../../../lib/hooks/TutorialContext"
import { EStepKeys } from "../../../lib/data/tutorial"

const ModalWrapper = styled.div`
  display: flex;
`
const ZonesListWrapper = styled.div`
  padding: 10px;
`

const MapModalContent: FC = () => {
  const gameState = useGameState()
  const { instance, changeInstance } = useInstance()
  // const [cards] = useCards()
  // const [data, dataByRarity] = useUnitData()
  // const zone = zones[gameState.state.currentZone]
  const tutorial = useTutorial()
  const isTutorialStepChangeZone = tutorial.step && tutorial.step?.stepKey == EStepKeys.CHANGE_ZONE
  const { t } = useTranslation()
  return (
    <ModalWrapper>
      <ZonesListWrapper>
        <h3>{t("game:Modals.MapV1.select-zone")}</h3>
        {zones
          .filter((zone) => zone.id <= gameState.state.maxZoneId)
          .map((x) => (
            <ModalButtonStyled
              key={x.id}
              onClick={() => {
                gameState.dispatch({ type: ActionEnum.ChangeZone, payload: { zoneId: x.id } })
                changeInstance(EInstance.Zone)
                if (isTutorialStepChangeZone) {
                  tutorial.dispatch.nextStep()
                }
              }}
            >
              #{x.id} : {t(`zones:${x.id}-${x.location}`)}
            </ModalButtonStyled>
          ))}
      </ZonesListWrapper>
    </ModalWrapper>
  )
}

export default MapModalContent
