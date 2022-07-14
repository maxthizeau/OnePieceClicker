import { FC, useCallback, useState, useEffect } from "react"
import styled from "styled-components"
import { zoneIdVar } from "../../../lib/cache"
import { zones } from "../../../lib/data/zones"
import { EInstance } from "../../../lib/enums"
import useInstance from "../../../lib/hooks/useInstance"
import { IModalProps } from "../IModalProps"
import { CloseModalIcon, ModalButtonStyled, ModalContainer, ModalStyled } from "../ModalStyles"
import { intWithSpaces } from "../../../lib/clickerFunctions"
import useUpgrades from "../../../lib/hooks/useUpgrades"
import { BerryIcon } from "../../styled/Globals"

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

  return (
    <>
      <h3>Upgrades</h3>

      <UpgradeBox
        icon="images/icons/clickPowerBlackIcon.png"
        title="Click Power"
        subtitle="Boost the click power (+100%)"
        level={upgrades.ClickPower.level}
        maximumLevel={upgrades.ClickPower.prices.length}
        price={upgrades.ClickPower.prices[upgrades.ClickPower.level] * 1000}
        onClick={() => levelUp("ClickPower")}
      />
      <UpgradeBox
        icon="images/icons/crewPowerIcon.png"
        title="Crew Power"
        subtitle="Boost your crew power (+100%)"
        level={upgrades.CrewPower.level}
        maximumLevel={upgrades.CrewPower.prices.length}
        onClick={() => levelUp("CrewPower")}
        price={upgrades.CrewPower.prices[upgrades.CrewPower.level] * 1000}
      />
      <UpgradeBox
        icon="images/icons/vivreCardIcon.png"
        title="Loot Chance"
        subtitle="Increase your vivre card loot chance (+10%)"
        level={upgrades.LootChance.level}
        maximumLevel={upgrades.LootChance.prices.length}
        price={upgrades.LootChance.prices[upgrades.LootChance.level] * 1000}
        onClick={() => levelUp("LootChance")}
      />
      <UpgradeBox
        icon="images/icons/xpIcon.png"
        title="XP Boost"
        subtitle="Gain more XP from defeating an enemy (+10%)"
        level={upgrades.XP.level}
        maximumLevel={upgrades.XP.prices.length}
        price={upgrades.XP.prices[upgrades.XP.level] * 1000}
        onClick={() => levelUp("XP")}
      />
      <UpgradeBox
        icon="images/icons/berry.png"
        title="Berry Boost"
        subtitle="Earn more berries when you defeat an enemy (+10%)"
        level={upgrades.Berry.level}
        maximumLevel={upgrades.Berry.prices.length}
        price={upgrades.Berry.prices[upgrades.Berry.level] * 1000}
        onClick={() => levelUp("Berry")}
      />
      <UpgradeBox
        icon="images/icons/foodIcon.png"
        title="Heal"
        subtitle="Heal more with food (+20%)"
        level={upgrades.Heal.level}
        maximumLevel={upgrades.Heal.prices.length}
        price={upgrades.Heal.prices[upgrades.Heal.level] * 1000}
        onClick={() => levelUp("Heal")}
      />
      <UpgradeBox
        icon="images/icons/memberIcon.png"
        title="Crew +1"
        subtitle="Increase the crew size and add one more member (+1)"
        level={upgrades.CrewMembers.level}
        maximumLevel={upgrades.CrewMembers.prices.length}
        price={upgrades.CrewMembers.prices[upgrades.CrewMembers.level] * 1000}
        onClick={() => levelUp("CrewMembers")}
      />
    </>
  )
}

export default UpgradesModalContent
