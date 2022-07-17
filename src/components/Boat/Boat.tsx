import { gql, useQuery, useReactiveVar } from "@apollo/client"
import React, { FC, useState } from "react"
import styled from "styled-components"
import { zones } from "../../lib/data/zones"
import MenuButton from "./MenuButton"
import { zoneIdVar } from "../../lib/cache"
import MapModal from "../Modals/Content/Map"
import Modal from "../Modals/Modal"
import useShip from "../../lib/hooks/useShip"
import { IShip } from "../../lib/types"
import { getShipEffects } from "../../lib/clickerFunctions"
import { ActionEnum, useGameState } from "../../lib/hooks/GameContext"
import { IMenuUnlockPayload, IMenuUnlockState, menuUnlocksPrices } from "../../lib/data/menuUnlocks"
import { ELogType, useLogs } from "../../lib/hooks/useLogs"
import useTranslation from "next-translate/useTranslation"
import Hover from "../Global/Hover"
import BasicHover from "../Global/Hover/BasicHover"
// import { TInstance } from "../../lib/types"

const BoatStyled = styled.div`
  padding: 20px;

  border-radius: 3px;
  border: 3px solid #b9896e;
  outline: 2px solid black;
  background: #eee2ba;
  display: flex;
  flex-wrap: wrap;
  flex-basis: 100%;
  /* max-width: 100%; */
  @media only screen and (min-width: 1200px) {
    width: auto;
    flex-wrap: nowrap;
  }
  /*
  @media only screen and (min-width: 1550px) {
  } */
`

const ImageWrapper = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 3px;
  border: 3px solid #b9896e;
  outline: 2px solid black;
  background: white;
  text-align: center;
  order: 1;
  margin-top: 10px;
  & img {
    width: 150px;
  }
  @media only screen and (min-width: 1200px) {
    width: 240px;
    order: 0;
    margin-top: 0px;
  }
`

const ShipName = styled.div`
  /* margin-bottom: 20px; */
  width: 80%;
  font-size: 0.8em;
  margin: 0px auto 20px auto;
`

const MenuWrapper = styled.div`
  order: 0;
  padding: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  @media only screen and (min-width: 1200px) {
    order: 1;
  }
`

const MenuAndTitleWrapper = styled.div`
  text-align: center;
`

const ShipEffectList = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 20px 0;
  font-family: Open Sans, Verdana, Geneva, Tahoma, sans-serif;
  text-align: left;
  padding: 0 0 0 20px;
`

const ShipEffect = styled.li`
  margin: 0;
  list-style-type: "💢 ";

  margin-bottom: 20px;

  & .name-effect {
    display: block;
    font-weight: bold;
  }
`

const ShipHover = styled.div`
  width: 250px;
  background: #fffffff7;
  border-radius: 3px;
  border: 1px solid #ccc;
  padding: 10px;
`

interface IBoatProps {}

const ShipEffects = ({ ship }: { ship: IShip }) => {
  const { t } = useTranslation()
  return (
    <ShipEffectList>
      {getShipEffects(ship).map((x, index) => {
        return (
          <ShipEffect key={`effect-${ship.name}-${index}`}>
            <span className="name-effect">{t(`game:Modals.Boat.effect-${x.toString}`)}</span>
            <span className="value-effect">+ {x.value} %</span>
          </ShipEffect>
        )
      })}
    </ShipEffectList>
  )
}

const Boat: FC<IBoatProps> = ({}) => {
  const { t } = useTranslation()
  const zoneId = useReactiveVar(zoneIdVar)
  const { state, dispatch } = useGameState()
  const { menuUnlocks } = state
  const zone = zones[zoneId]
  const [visibleZoneModal, setVisibleZoneModal] = useState(false)
  const { currentShip } = useShip()
  const { addLog } = useLogs()

  function unlockMenu(payloadUnlock: IMenuUnlockPayload) {
    let price = 0
    let unlockedMenu = ""
    if (payloadUnlock.Shop) {
      price += menuUnlocksPrices.Shop
      unlockedMenu = "Shop"
    }
    if (payloadUnlock.Upgrades) {
      price += menuUnlocksPrices.Upgrades
      unlockedMenu = "Upgrades"
    }
    if (payloadUnlock.Mine) {
      price += menuUnlocksPrices.Mine
      unlockedMenu = "Mine"
    }
    if (payloadUnlock.Training) {
      price += menuUnlocksPrices.Training
      unlockedMenu = "Training"
    }

    if (state.berries < price) {
      addLog({
        id: `unlockMenuError-${price}-${unlockedMenu}`,
        logTypes: [ELogType.Clicker],
        notification: true,
        title: t(`notifications:warning.title-not-enough-berries`),
        message: t(`notifications:warning.warning-message-unlock-menu`, { unlockedMenu: unlockedMenu }),
        type: "warning", // 'default', 'success', 'info', 'warning'
      })
    } else {
      dispatch({ type: ActionEnum.Unlock_Menu, payload: { unlockMenu: payloadUnlock } })
      addLog({
        id: `unlockMenu-${price}-${unlockedMenu}`,
        logTypes: [ELogType.Clicker],
        notification: true,
        title: t(`notifications:success.title-unlock-menu`, { unlockedMenu: unlockedMenu }),
        message: t(`notifications:success.message-unlock-menu`, { unlockedMenu: unlockedMenu }),
        type: "success", // 'default', 'success', 'info', 'warning'
      })
    }
  }

  return (
    <>
      <BoatStyled>
        <ImageWrapper>
          <ShipName>{currentShip.name}</ShipName>
          <Hover
            hoverContent={
              <ShipHover>
                <ShipEffects ship={currentShip} />
              </ShipHover>
            }
            vertical="middle"
            horizontal="right"
          >
            <img src={`images/ships/full/${currentShip.thumb}_c.png`} />
          </Hover>
        </ImageWrapper>
        <MenuAndTitleWrapper>
          <h3 style={{ cursor: "pointer" }} onClick={() => setVisibleZoneModal(true)}>
            Zone #{zone.id} : {t(`zones:${zone.id}-${zone.location}`)}
          </h3>
          <Modal type="zone" visible={visibleZoneModal} setVisible={setVisibleZoneModal} />
          <MenuWrapper>
            <MenuButton label={t("game:BoatMenu.Map")} icon="images/icons/winIcon.png" type="map" locked={null} />
            <MenuButton label={t("game:BoatMenu.Boat")} icon="images/icons/boatIcon.png" type="boat" locked={null} />
            <MenuButton label={t("game:BoatMenu.Cards")} icon="images/icons/vivreCardIcon.png" type="cards" locked={null} />
            <MenuButton label={t("game:BoatMenu.Fleet")} icon="images/icons/fleetIcon.png" type="fleet" locked={null} />
            <MenuButton
              label={t("game:BoatMenu.Shop")}
              icon="images/icons/shopIcon.png"
              type="shop"
              locked={
                menuUnlocks.Shop
                  ? null
                  : {
                      unlockFunc: () => {
                        unlockMenu({
                          Shop: true,
                        })
                      },
                      price: menuUnlocksPrices.Shop,
                    }
              }
            />
            <MenuButton
              label={t("game:BoatMenu.Upgrades")}
              icon="images/icons/upgradesIcon.png"
              type="upgrades"
              locked={
                menuUnlocks.Upgrades
                  ? null
                  : {
                      unlockFunc: () => {
                        unlockMenu({
                          Upgrades: true,
                        })
                      },
                      price: menuUnlocksPrices.Upgrades,
                    }
              }
            />
            <MenuButton
              label={t("game:BoatMenu.Mine")}
              icon="images/treasure-game/gems/diamond.png"
              type="mine"
              locked={
                menuUnlocks.Mine
                  ? null
                  : {
                      unlockFunc: () => {
                        unlockMenu({
                          Mine: true,
                        })
                      },
                      price: menuUnlocksPrices.Mine,
                    }
              }
            />
            <MenuButton
              label={t("game:BoatMenu.Training")}
              icon="images/icons/xpIcon.png"
              type="training"
              locked={
                menuUnlocks.Training
                  ? null
                  : {
                      unlockFunc: () => {
                        unlockMenu({
                          Training: true,
                        })
                      },
                      price: menuUnlocksPrices.Training,
                    }
              }
            />
          </MenuWrapper>
        </MenuAndTitleWrapper>
      </BoatStyled>
    </>
  )
}

export default Boat
