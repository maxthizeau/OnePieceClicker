import { FC } from "react"
import { Store } from "react-notifications-component"
import styled from "styled-components"
import { intWithSpaces } from "../../../../lib/clickerFunctions"
import { ETreasureGameUpgrades, IMineUpgrade, mineUpgradesList } from "../../../../lib/data/treasureGame"
import { ActionEnum, useGameState } from "../../../../lib/hooks/GameContext"
import { useLogs, ELogType } from "../../../../lib/hooks/useLogs"
import { nFormatter } from "../../../../lib/utils"
import { BerryIcon } from "../../../styled/Globals"
const UpgradeBoxStyled = styled.div`
  padding: 5px 10px;
  border-radius: 3px;
  border: 3px solid #b9896e;
  outline: 2px solid black;
  background: #eee2ba;
  display: flex;
  align-items: center;
  column-gap: 20px;
  flex-wrap: wrap;
  flex: 1;
  margin-bottom: 20px;
`

const UpgradeIcon = styled.div`
  & img {
    width: 40px;
    height: 40px;
  }
`

const UpgradeText = styled.div`
  flex: 1;
  text-align: left;
  & .main-title {
  }
  & .sub-title {
    font-size: 0.7em;
  }
`
const UpgradeLevel = styled.div`
  flex-grow: 0;
  line-height: 20px;
  font-size: 0.8em;
`

const UpgradeButtonStyled = styled.a<{ disabled?: boolean }>`
  border: 3px solid #eee2ba;
  outline: 2px solid black;
  border-radius: 3px;
  padding: 5px;
  text-align: center;
  font-size: 0.8em;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  background-color: ${(props) => (props.disabled ? "#a6a5a5" : "white")};
`

interface IUpgradeBoxProps {
  icon: string
  title: string
  subtitle: string
  level: number
  price: number
  maximumLevel: number
  onClick: () => void
}

// const MineUpgradeList

const UpgradeBox: FC<IUpgradeBoxProps> = ({ icon, title, subtitle, level, price, maximumLevel, onClick }) => {
  const disabled = level >= maximumLevel
  return (
    <UpgradeBoxStyled>
      <UpgradeIcon>
        <img src={icon} />
      </UpgradeIcon>
      <UpgradeText>
        <p className="main-title">{title}</p>
        <p className="sub-title">{subtitle}</p>
      </UpgradeText>

      <UpgradeLevel>Lvl. {level}</UpgradeLevel>
      <UpgradeButtonStyled disabled={disabled} onClick={!disabled ? onClick : undefined}>
        {disabled ? (
          "MAX"
        ) : (
          <>
            <BerryIcon /> <span>{nFormatter(price, 3)}</span>
          </>
        )}
      </UpgradeButtonStyled>
    </UpgradeBoxStyled>
  )
}

const MineUpgrade: FC = () => {
  const gameState = useGameState()
  const { addLog } = useLogs()

  function upgradeMine(upgrade: IMineUpgrade, currentLevel: number) {
    if (gameState.state.berries < upgrade.prices[currentLevel - 1]) {
      addLog({
        id: `mineUpgradeError-${upgrade.id}-${currentLevel}`,
        logTypes: [ELogType.Mine],
        notification: true,
        title: "Not enought berries",
        message: "You don't have enought berries to do this upgrade",
        type: "warning", // 'default', 'success', 'info', 'warning'
      })
    } else {
      gameState.dispatch({
        type: ActionEnum.TreasureGame_Upgrade,
        payload: {
          treasureGameUpgrade: upgrade.id,
        },
      })
    }
  }

  return (
    <>
      <h5>Upgrade : Mine more efficiently</h5>

      {mineUpgradesList.map((upgrade, index) => {
        console.log(gameState.state)
        const stateUpgrade = gameState.state.treasureGameUpgrades?.find((x) => x.id == upgrade.id)
        if (!stateUpgrade) return null
        return (
          <UpgradeBox
            key={`upgrade-mine-${index}`}
            icon={upgrade.icon}
            title={upgrade.title}
            subtitle={upgrade.subtitle}
            level={stateUpgrade.level}
            maximumLevel={upgrade.maximumLevel}
            price={upgrade.prices[stateUpgrade.level - 1]}
            onClick={() => {
              upgradeMine(upgrade, stateUpgrade.level)
            }}
          />
        )
      })}
    </>
  )
}

export default MineUpgrade
