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
  const zone = zones[zoneId]
  const [visibleZoneModal, setVisibleZoneModal] = useState(false)
  const { currentShip } = useShip()
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
            <MenuButton label="Map" icon="images/icons/winIcon.png" type="map" />
            <MenuButton label="Boat" icon="images/icons/boatIcon.png" type="boat" />
            <MenuButton label="Cards" icon="images/icons/vivreCardIcon.png" type="cards" />
            <MenuButton label="Fleet" icon="images/icons/fleetIcon.png" type="fleet" />
            <MenuButton label="Shop" icon="images/icons/shopIcon.png" type="shop" />
            <MenuButton label="Upgrades" icon="images/icons/upgradesIcon.png" type="upgrades" />
            <MenuButton label="Mine" icon="images/treasure-game/gems/diamond.png" type="mine" />
            <MenuButton label="Training" icon="images/icons/xpIcon.png" type="training" />
          </MenuWrapper>
        </MenuAndTitleWrapper>
      </BoatStyled>
    </>
  )
}

export default Boat
