import { FC } from "react"
import styled from "styled-components"
import { intWithSpaces } from "../../../lib/clickerFunctions"
import { defaultUpgrades } from "../../../lib/data/upgrades"
import useUpgrades from "../../../lib/hooks/useUpgrades"
import { BerryIcon } from "../../styled/Globals"
import useTranslation from "next-translate/useTranslation"

const UpgradeBoxStyled = styled.div`
  padding: 20px;

  border-radius: 3px;
  border: 3px solid #b9896e;
  outline: 2px solid black;
  background: #eee2ba;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  column-gap: 70px;
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
  line-height: 1.1em;
  & .main-title {
  }
  & .sub-title {
    font-size: 0.7em;
  }
`
const UpgradeLevel = styled.div`
  flex: 1;
  line-height: 20px;
`

const UpgradeButtonStyled = styled.a<{ disabled?: boolean }>`
  flex: 1;

  cursor: pointer;
  border: 3px solid #eee2ba;
  outline: 2px solid black;
  border-radius: 3px;
  padding: 5px;
  text-align: center;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  background-color: ${(props) => (props.disabled ? "#a6a5a5" : "white")};
`

interface IUpgradeBoxProps {
  icon: string
  title: string
  subtitle: string
  maximumLevel: number
  level: number
  price: number
  onClick: () => void
}

const UpgradeBox: FC<IUpgradeBoxProps> = ({ icon, title, subtitle, level, maximumLevel, price, onClick }) => {
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

      <UpgradeLevel>
        Lvl <br />
        {level}
      </UpgradeLevel>

      <UpgradeButtonStyled disabled={disabled} onClick={!disabled ? onClick : undefined}>
        {disabled ? (
          "MAX"
        ) : (
          <>
            <BerryIcon /> {intWithSpaces(price)}
          </>
        )}
      </UpgradeButtonStyled>
    </UpgradeBoxStyled>
  )
}

const UpgradesModalContent: FC = () => {
  const [upgrades, levelUp] = useUpgrades()
  const { t } = useTranslation()

  return (
    <>
      <h3>Upgrades</h3>

      <UpgradeBox
        icon="images/icons/clickPowerBlackIcon.png"
        title={t("game:Modals.Upgrades.click-power-title")}
        subtitle={`${t("game:Modals.Upgrades.click-power-description")} (+100%)`}
        level={upgrades.ClickPower.level}
        maximumLevel={defaultUpgrades.ClickPower.prices.length}
        price={defaultUpgrades.ClickPower.prices[upgrades.ClickPower.level] * 1000}
        onClick={() => levelUp("ClickPower")}
      />
      <UpgradeBox
        icon="images/icons/crewPowerIcon.png"
        title={t("game:Modals.Upgrades.crew-power-title")}
        subtitle={`${t("game:Modals.Upgrades.crew-power-description")} (+100%)`}
        level={upgrades.CrewPower.level}
        maximumLevel={defaultUpgrades.CrewPower.prices.length}
        onClick={() => levelUp("CrewPower")}
        price={defaultUpgrades.CrewPower.prices[upgrades.CrewPower.level] * 1000}
      />
      <UpgradeBox
        icon="images/icons/vivreCardIcon.png"
        title={t("game:Modals.Upgrades.loot-chance-title")}
        subtitle={`${t("game:Modals.Upgrades.loot-chance-description")} (+10%)`}
        level={upgrades.LootChance.level}
        maximumLevel={defaultUpgrades.LootChance.prices.length}
        price={defaultUpgrades.LootChance.prices[upgrades.LootChance.level] * 1000}
        onClick={() => levelUp("LootChance")}
      />
      <UpgradeBox
        icon="images/icons/xpIcon.png"
        title={t("game:Modals.Upgrades.xp-boost-title")}
        subtitle={`${t("game:Modals.Upgrades.xp-boost-description")} (+10%)`}
        level={upgrades.XP.level}
        maximumLevel={defaultUpgrades.XP.prices.length}
        price={defaultUpgrades.XP.prices[upgrades.XP.level] * 1000}
        onClick={() => levelUp("XP")}
      />
      <UpgradeBox
        icon="images/icons/berry.png"
        title={t("game:Modals.Upgrades.berry-boost-title")}
        subtitle={`${t("game:Modals.Upgrades.berry-boost-description")} (+10%)`}
        level={upgrades.Berry.level}
        maximumLevel={defaultUpgrades.Berry.prices.length}
        price={defaultUpgrades.Berry.prices[upgrades.Berry.level] * 1000}
        onClick={() => levelUp("Berry")}
      />
      <UpgradeBox
        icon="images/icons/foodIcon.png"
        title={t("game:Modals.Upgrades.heal-title")}
        subtitle={`${t("game:Modals.Upgrades.heal-description")} (+20%)`}
        level={upgrades.Heal.level}
        maximumLevel={defaultUpgrades.Heal.prices.length}
        price={defaultUpgrades.Heal.prices[upgrades.Heal.level] * 1000}
        onClick={() => levelUp("Heal")}
      />
      <UpgradeBox
        icon="images/icons/memberIcon.png"
        title={t("game:Modals.Upgrades.crew-size-title")}
        subtitle={`${t("game:Modals.Upgrades.crew-size-description")} (+1)`}
        level={upgrades.CrewMembers.level}
        maximumLevel={defaultUpgrades.CrewMembers.prices.length}
        price={defaultUpgrades.CrewMembers.prices[upgrades.CrewMembers.level] * 1000}
        onClick={() => levelUp("CrewMembers")}
      />
    </>
  )
}

export default UpgradesModalContent
