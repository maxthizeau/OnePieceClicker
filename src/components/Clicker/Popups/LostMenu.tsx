import { FC } from "react"
import { MenuButton, MenuButtonWrapper } from "../ClickerStyles"
import useTranslation from "next-translate/useTranslation"

interface ILostMenuProps {
  buttonDisabled: boolean
  resetDungeon: () => void
  back: () => void
}

const LostMenu: FC<ILostMenuProps> = ({ buttonDisabled, resetDungeon, back }) => {
  const { t } = useTranslation()
  return (
    <MenuButtonWrapper>
      <MenuButton disabled={buttonDisabled} onClick={() => back()}>
        {/* Go back to the seaport */}
        {t("game:Clicker.Popups.back-to-seaport")}
      </MenuButton>
      <MenuButton disabled={buttonDisabled} onClick={() => resetDungeon()}>
        {/* Try again (Click faster !) */}
        {t("game:Clicker.Popups.try-again")}
      </MenuButton>
    </MenuButtonWrapper>
  )
}

export default LostMenu
