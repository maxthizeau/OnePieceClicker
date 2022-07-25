import useTranslation from "next-translate/useTranslation"
import { FC } from "react"
import styled from "styled-components"
import { EStepKeys } from "../../../lib/data/tutorial"
import { zones } from "../../../lib/data/zones"
import { EInstance } from "../../../lib/enums"
import { ActionEnum, useGameState } from "../../../lib/hooks/GameContext"
import { useTutorial } from "../../../lib/hooks/TutorialContext"
import useInstance from "../../../lib/hooks/useInstance"
import { ModalButtonStyled } from "../ModalStyles"

const ModalWrapper = styled.div`
  /* display: flex; */
  margin: auto;
`
const ZonesListWrapper = styled.div`
  margin: auto;
  padding: 10px;
`

const MapV1ModalContent: FC = () => {
  const gameState = useGameState()
  const { instance, changeInstance } = useInstance()
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
              style={x.id == gameState.state.currentZone ? { backgroundColor: "#fef5a1" } : {}}
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

export default MapV1ModalContent
