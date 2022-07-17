import { FC, ReactElement, useCallback, useEffect, useState } from "react"
import { IModalProps, TModalType } from "./IModalProps"
import { CloseModalIcon, ModalContainer, ModalStyled } from "./ModalStyles"
import VivreModalContent from "./Content/VivreCard"
import MapModalContent from "./Content/Map"
import FleetModalContent from "./Content/Fleet"
import UpgradesModalContent from "./Content/Upgrades"
import ShopModalContent from "./Content/Shop"
import BoatModalContent from "./Content/Boat"
import ZoneModalContent from "./Content/Zone"
import MineModalContent from "./Content/Mine"
import TrainingModalContent from "./Content/Training"
import GoalsModalContent from "./Content/Goals"
import useTranslation from "next-translate/useTranslation"

const Modal: FC<IModalProps> = (props) => {
  const { visible, setVisible, type } = props
  const { t } = useTranslation()
  const [hoverModal, setHoverModal] = useState(false)

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
        !hoverModal && setVisible(false)
      }}
    >
      <CloseModalIcon onClick={() => setVisible(false)}>{t("game:Modals.close-button")}</CloseModalIcon>
      <ModalStyled onMouseEnter={() => setHoverModal(true)} onMouseLeave={() => setHoverModal(false)}>
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
      </ModalStyled>
    </ModalContainer>
  )
}

export default Modal
