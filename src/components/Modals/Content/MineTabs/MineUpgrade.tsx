import useTranslation from "next-translate/useTranslation"
import { FC } from "react"
import styled from "styled-components"
import { ETreasureGameUpgrades, IMineUpgrade, mineUpgradesList } from "../../../../lib/data/treasureGame"
import { ActionEnum, useGameState } from "../../../../lib/hooks/GameContext"
import { ELogType, useLogs } from "../../../../lib/hooks/useLogs"
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
  upgradeId: ETreasureGameUpgrades
  icon: string
  title: string
  subtitle: string
  level: number
  price: number
  maximumLevel: number
  onClick: () => void
}

// const MineUpgradeList

const UpgradeBox: FC<IUpgradeBoxProps> = ({ upgradeId, icon, title, subtitle, level, price, maximumLevel, onClick }) => {
  const { t } = useTranslation()
  const disabled = level >= maximumLevel
  return (
    <UpgradeBoxStyled>
      <UpgradeIcon>
        <img src={icon} />
      </UpgradeIcon>
      <UpgradeText>
        <p className="main-title">{t(`treasureGame:Upgrades.${Object.values(ETreasureGameUpgrades)[upgradeId]}-title`)}</p>
        <p className="sub-title">{t(`treasureGame:Upgrades.${Object.values(ETreasureGameUpgrades)[upgradeId]}-subtitle`)}</p>
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
  const { t } = useTranslation()
  const { addLog } = useLogs()

  function upgradeMine(upgrade: IMineUpgrade, currentLevel: number) {
    if (gameState.state.berries < upgrade.prices[currentLevel - 1]) {
      addLog({
        id: `mineUpgradeError-${upgrade.id}-${currentLevel}`,
        logTypes: [ELogType.Mine],
        notification: true,
        title: t("notifications:warning.title-not-enough-berries"),
        message: t("notifications:warning.message-mine-market-upgrade"),

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
      <h5>{t("game:Modals.Mine.upgrade-subtitle")}</h5>

      {mineUpgradesList.map((upgrade, index) => {
        console.log(gameState.state)
        const stateUpgrade = gameState.state.treasureGameUpgrades?.find((x) => x.id == upgrade.id)
        if (!stateUpgrade) return null
        return (
          <UpgradeBox
            key={`upgrade-mine-${index}`}
            upgradeId={upgrade.id}
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
