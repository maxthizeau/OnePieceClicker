import { FC } from "react"
import { MenuButton, MenuButtonWrapper } from "../ClickerStyles"

interface ILostMenuProps {
  buttonDisabled: boolean
  resetDungeon: () => void
  back: () => void
}

const LostMenu: FC<ILostMenuProps> = ({ buttonDisabled, resetDungeon, back }) => {
  return (
    <MenuButtonWrapper>
      <MenuButton disabled={buttonDisabled} onClick={() => back()}>
        Go back to the seaport
      </MenuButton>
      <MenuButton disabled={buttonDisabled} onClick={() => resetDungeon()}>
        Try again (Click faster !)
      </MenuButton>
    </MenuButtonWrapper>
  )
}

export default LostMenu
