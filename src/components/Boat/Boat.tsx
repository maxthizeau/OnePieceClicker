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
// import { TInstance } from "../../lib/types"

const BoatStyled = styled.div`
  padding: 20px;

  border-radius: 3px;
  border: 3px solid #b9896e;
  outline: 2px solid black;
  background: #eee2ba;
  display: flex;
  /* max-width: 100%; */
`

const ImageWrapper = styled.div`
  width: 250px;

  padding: 20px;

  border-radius: 3px;
  border: 3px solid #b9896e;
  outline: 2px solid black;
  background: white;
  text-align: center;

  & img {
    width: 150px;
  }
`

const ShipName = styled.div`
  margin-bottom: 20px;
  width: 170px;
  font-size: 0.8em;
`

const MenuWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
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

interface IBoatProps {}

const ShipEffects = ({ ship }: { ship: IShip }) => {
  return (
    <ShipEffectList>
      {getShipEffects(ship).map((x, index) => {
        return (
          <ShipEffect key={`effect-${ship.name}-${index}`}>
            <span className="name-effect">{x.toString} : </span>
            <span className="value-effect">+ {x.value} %</span>
          </ShipEffect>
        )
      })}
    </ShipEffectList>
  )
}

const Boat: FC<IBoatProps> = ({}) => {
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
        title: "Not enough berries",
        message: `You don't have enough berries to unlock "${unlockedMenu}"`,
        type: "warning", // 'default', 'success', 'info', 'warning'
      })
    } else {
      dispatch({ type: ActionEnum.Unlock_Menu, payload: { unlockMenu: payloadUnlock } })
      addLog({
        id: `unlockMenu-${price}-${unlockedMenu}`,
        logTypes: [ELogType.Clicker],
        notification: true,
        title: `[${unlockedMenu}] unlocked !`,
        message: `You can now access to ${unlockedMenu}`,
        type: "success", // 'default', 'success', 'info', 'warning'
      })
    }
  }

  return (
    <>
      <BoatStyled>
        <ImageWrapper>
          <ShipName>{currentShip.name}</ShipName>
          <img src={`images/ships/full/${currentShip.thumb}_c.png`} />
          {/* <ShipEffects ship={currentShip} /> */}
        </ImageWrapper>
        <MenuAndTitleWrapper>
          <h3 style={{ cursor: "pointer" }} onClick={() => setVisibleZoneModal(true)}>
            Zone #{zone.id} : {zone.location}
          </h3>
          <Modal type="zone" visible={visibleZoneModal} setVisible={setVisibleZoneModal} />
          <MenuWrapper>
            <MenuButton label="Map" icon="images/icons/winIcon.png" type="map" locked={null} />
            <MenuButton label="Boat" icon="images/icons/boatIcon.png" type="boat" locked={null} />
            <MenuButton label="Cards" icon="images/icons/vivreCardIcon.png" type="cards" locked={null} />
            <MenuButton label="Fleet" icon="images/icons/fleetIcon.png" type="fleet" locked={null} />
            <MenuButton
              label="Shop"
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
              label="Upgrades"
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
              label="Mine"
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
              label="Training"
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
