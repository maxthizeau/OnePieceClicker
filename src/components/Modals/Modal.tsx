import useTranslation from "next-translate/useTranslation"
import { FC, useCallback, useEffect, useState } from "react"
import { EStepKeys } from "../../lib/data/tutorial"
import { useTutorial } from "../../lib/hooks/TutorialContext"
import TutorialElement from "../Global/TutorialElement"
import { CloseTutorialButton, TutorialContainer } from "../styled/Globals"
import BoatModalContent from "./Content/Boat"
import FleetModalContent from "./Content/Fleet"
import GoalsModalContent from "./Content/Goals"
import ImportExportModalContent from "./Content/ImportExport"
import MapModalContent from "./Content/Map"
import MineModalContent from "./Content/Mine"
import ShopModalContent from "./Content/Shop"
import TrainingModalContent from "./Content/Training"
import UpgradesModalContent from "./Content/Upgrades"
import VivreModalContent from "./Content/VivreCard"
import ZoneModalContent from "./Content/Zone"
import { IModalProps } from "./IModalProps"
import { CloseModalIcon, ModalContainer, ModalStyled } from "./ModalStyles"

const Modal: FC<IModalProps> = (props) => {
  const { visible, setVisible, type } = props
  const { t } = useTranslation()
  const [hoverModal, setHoverModal] = useState(false)
  const tutorial = useTutorial()
  const isTutorialStepRecruit = props.type == "cards" && tutorial.step && tutorial.step?.stepKey == EStepKeys.RECRUIT_CARD
  const isTutorialSelectGoal = props.type == "goals" && tutorial.step && tutorial.step?.stepKey == EStepKeys.SELECT_GOAL
  const isTutorialExplainShop = props.type == "shop" && tutorial.step && tutorial.step?.stepKey == EStepKeys.EXPLAIN_SHOP
  const isTutorialStep = isTutorialStepRecruit || isTutorialSelectGoal || isTutorialExplainShop
  // Function called when user press Escape
  const escFunction = useCallback((event: any) => {
    if (event.key === "Escape") {
      setVisible(false)
    }
  }, [])

  // Use effect to listen if user press Escape.
  useEffect(() => {
    document.addEventListener("keydown", escFunction, false)
    return () => {
      document.removeEventListener("keydown", escFunction, false)
    }
  }, [])

  useEffect(() => {
    if (hoverModal) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [hoverModal])

  if (!visible) return null

  return (
    <ModalContainer
      onClick={() => {
        if (!hoverModal) {
          isTutorialStep && tutorial.dispatch.clickCloseModal()
          setVisible(false)
        }
      }}
    >
      <TutorialContainer
        active={tutorial.step !== undefined && tutorial.state.showModal && tutorial.step.isInModal}
        isInModal={tutorial.step !== undefined && tutorial.step.isInModal}
      >
        <CloseTutorialButton onClick={() => tutorial.dispatch.setHideTutorial(true)}>{t("tutorial:closeTutorial")}</CloseTutorialButton>
      </TutorialContainer>

      {isTutorialStep && (
        <TutorialElement stepKey={tutorial.step.stepKey} vertical="top" horizontal="center" offset={{ x: 0, y: 50 }} isInModal={true}>
          {tutorial.step.content}
        </TutorialElement>
      )}

      <CloseModalIcon onClick={() => setVisible(false)}>{t("game:Modals.close-button")}</CloseModalIcon>
      <ModalStyled className={isTutorialExplainShop ? "isTutorial" : ""} onMouseEnter={() => setHoverModal(true)} onMouseLeave={() => setHoverModal(false)}>
        {type == "map" && <MapModalContent />}
        {type == "cards" && <VivreModalContent />}
        {type == "fleet" && <FleetModalContent />}
        {type == "upgrades" && <UpgradesModalContent />}
        {type == "shop" && <ShopModalContent />}
        {type == "boat" && <BoatModalContent />}
        {type == "zone" && <ZoneModalContent />}
        {type == "mine" && <MineModalContent />}
        {type == "training" && <TrainingModalContent />}
        {type == "goals" && <GoalsModalContent />}
        {type == "saves" && <ImportExportModalContent />}
      </ModalStyled>
    </ModalContainer>
  )
}

export default Modal
