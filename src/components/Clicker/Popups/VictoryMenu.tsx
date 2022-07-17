import { FC } from "react"
import { MenuButton, MenuButtonWrapper } from "../ClickerStyles"
import useTranslation from "next-translate/useTranslation"

interface IVictoryMenuProps {
  buttonDisabled: boolean
  setFarmMode: () => void
  resetDungeon: () => void
  back: () => void
}

const VictoryMenu: FC<IVictoryMenuProps> = ({ buttonDisabled, setFarmMode, resetDungeon, back }) => {
  const { t } = useTranslation()
  return (
    <MenuButtonWrapper>
      <MenuButton disabled={buttonDisabled} onClick={() => back()}>
        {t("game:Clicker.Popups.back-to-seaport")}
      </MenuButton>
      <MenuButton disabled={buttonDisabled} onClick={() => resetDungeon()}>
        {/* Fight again (once) */}
        {t("game:Clicker.Popups.fight-again")}
      </MenuButton>
      <MenuButton disabled={buttonDisabled} onClick={() => setFarmMode()}>
        {/* Farm it (until you stop it) */}
        {t("game:Clicker.Popups.farm-dungeon")}
      </MenuButton>
    </MenuButtonWrapper>
  )
}

export default VictoryMenu
