import { FC } from "react"
import { MenuButton, MenuButtonWrapper } from "../ClickerStyles"

interface IVictoryMenuProps {
  buttonDisabled: boolean
  setFarmMode: () => void
  resetDungeon: () => void
  back: () => void
}

const VictoryMenu: FC<IVictoryMenuProps> = ({ buttonDisabled, setFarmMode, resetDungeon, back }) => {
  return (
    <MenuButtonWrapper>
      <MenuButton disabled={buttonDisabled} onClick={() => back()}>
        Go back to the seaport
      </MenuButton>
      <MenuButton disabled={buttonDisabled} onClick={() => resetDungeon()}>
        Fight again (once)
      </MenuButton>
      <MenuButton disabled={buttonDisabled} onClick={() => setFarmMode()}>
        Farm it (until you stop it)
      </MenuButton>
    </MenuButtonWrapper>
  )
}

export default VictoryMenu
