import { FC, useState } from "react"
import styled from "styled-components"
import useShip from "../../../lib/hooks/useShip"
import Hover from "../../Global/Hover"
import BasicHover from "../../Global/Hover/BasicHover"
import Map from "../../Map/MapFunctionnal"
import { ModalSubtitle, SearchInput, TableFilters } from "../ModalStyles"
import { EShipEffect, IShip } from "../../../lib/types"
import { getShipEffects } from "../../../lib/clickerFunctions"

const ModalWrapper = styled.div`
  /* min-height: 700px !important; */
`

const Ship = styled.div`
  width: 100px;
  height: 100px;
  & img {
    width: 100px;
    height: 100px;
  }
  cursor: pointer;
`
const ShipWrapper = styled.div`
  width: 700px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  /* overflow: scroll; */
`

const ShipHoverStyled = styled.div`
  background-color: white;
  width: 220px;
  padding: 10px;
  border-radius: 3px;
  text-align: left;
`

const ShipEffectItem = styled.div`
  display: flex;
  text-align: left;
  margin-bottom: 5px;
  padding: 2px;

  &:nth-child(even) {
    background: #f2f1f1;
  }

  & .name-effect {
    width: 150px;
    /* background-color: red; */
  }
  & .value-effect {
    width: 65px;
    margin-left: auto;
    align-self: center;
    flex-wrap: nowrap;
    /* background-color: blue; */
  }
`

const Filters = styled.div`
  display: flex;
  font-family: Open Sans, Verdana, Geneva, Tahoma, sans-serif;
  justify-content: center;
  margin-bottom: 20px;
`

const ResetButton = styled.button`
  border: 5px solid #7e593a;
  cursor: pointer;
`

const FiltersColumns = styled.div`
  width: 450px;
  background-color: #7e593a;
  display: flex;
  flex-direction: column;

  border-radius: 3px;

  & input {
    padding: 5px;
    margin: 5px;
  }

  & select {
    margin: 5px;
    padding: 5px;
  }
`

const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  & * {
    flex: 1;
  }
`

const YourShip = styled.div`
  padding: 10px;
  display: flex;
  border-radius: 3px;
  border: 3px solid #b9896e;
  outline: 2px solid black;
  background: #eee2ba;

  align-items: center;
`
const ShipImage = styled.div`
  margin-right: 20px;
  & img {
    width: 80px;
    height: 80px;
  }
`

const ShipDescription = styled.div`
  font-family: Open Sans, Verdana, Geneva, Tahoma, sans-serif;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  & ${ShipEffectItem} {
    background: none;
    /* width: 50%; */
    flex: 1 1 0 !important;

    &:nth-child(odd):not(:last-child) {
      border-right: 2px solid black;
      margin-right: 20px;
    }

    & .name-effect {
      flex: 1;
      font-weight: bold;
    }
    & .name-effect::before {
      content: "💢 ";
    }
    & .value-effect {
    }
  }
`

const FilterButton = styled.button`
  margin-bottom: 20px;
  font-family: Open Sans, Verdana, Geneva, Tahoma, sans-serif;
`

const ShipHover = ({ ship }: { ship: IShip }) => {
  const effects = getShipEffects(ship)
  //   console.log(ship.name)
  return (
    <ShipHoverStyled>
      <b>
        {ship.name} ({ship.id})
      </b>
      {effects.map((x, index) => (
        <ShipEffectItem key={`effect-${ship.name}-${index}`}>
          <span className="name-effect">{x.toString}</span>
          <span className="value-effect">+ {x.value} %</span>
        </ShipEffectItem>
      ))}
    </ShipHoverStyled>
  )
}

const BoatModalContent: FC = () => {
  const { currentShip, unlockedShips, changeShip, getShipFromId } = useShip()
  const [showFilters, setShowFilters] = useState(false)
  const [searchName, setSearchName] = useState("")
  const [searchEffect, setSearchEffect] = useState(-1)
  const [searchMinimumEffect, setSearchMinimumEffect] = useState(0)
  let shipsShown = 0
  return (
    <ModalWrapper>
      <h3>Your ship</h3>
      <YourShip>
        <ShipImage>
          <img src={`images/ships/icon/${currentShip.thumb}_t2.png`} />
        </ShipImage>
        <ShipDescription>
          {" "}
          {getShipEffects(currentShip).map((x, index) => {
            return (
              <ShipEffectItem key={`effect-${currentShip.name}-${index}`}>
                <span className="name-effect">{x.toString}</span>
                <span className="value-effect">+ {x.value} %</span>
              </ShipEffectItem>
            )
          })}
        </ShipDescription>
      </YourShip>
      <h3>All ships</h3>

      <FilterButton onClick={() => setShowFilters(!showFilters)}>{showFilters ? "Hide Filters" : "Show Filters"}</FilterButton>
      {showFilters && (
        <Filters>
          <FiltersColumns>
            <SearchInput placeholder="Search by name" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
            <FormWrapper>
              <select value={searchEffect} onChange={(e) => setSearchEffect(parseInt(e.target.value))}>
                <option value={-1}>Filter by effect...</option>
                <option value={EShipEffect.CREW_POWER}>Crew Power</option>
                <option value={EShipEffect.CLICK_POWER}> Click Power</option>
                <option value={EShipEffect.LOOT_CHANCE}> Vivre Card</option>
                <option value={EShipEffect.XP_GAIN}> XP earned</option>
                <option value={EShipEffect.BERRY}> Berries earned</option>
                <option value={EShipEffect.CAPTAIN_BOOST}> Captain Boost</option>
                <option value={EShipEffect.MINE_ENERGY}> Mine Energy Refill</option>
                <option value={EShipEffect.MINE_DOUBLELOOT_CHANCE}> Mine Double Loot</option>
                <option value={EShipEffect.TRAINING_SPEED}> Training Speed</option>
                <option value={EShipEffect.ITEM_DURATION}> Item Duration</option>
              </select>
              <SearchInput
                placeholder="Mininimum value (%)"
                value={searchMinimumEffect}
                onChange={(e) => setSearchMinimumEffect(e.target.value == "" ? 0 : parseInt(e.target.value.replace(/\D/g, "")))}
              />
            </FormWrapper>
          </FiltersColumns>
          <ResetButton
            onClick={() => {
              setSearchName("")
              setSearchEffect(-1)
              setSearchMinimumEffect(0)
            }}
          >
            Reset
          </ResetButton>
        </Filters>
      )}
      <ShipWrapper>
        {unlockedShips.map((x) => {
          const ship = getShipFromId(x)
          if (!ship) return null
          const shipEffects = getShipEffects(ship)
          let show = true
          if (!ship.name.toLowerCase().includes(searchName.toLowerCase())) {
            show = false
          }
          const searchedEffect = shipEffects.find((y) => y.effect == searchEffect)

          if (searchEffect != -1 && (!searchedEffect || (searchedEffect && searchedEffect.value < searchMinimumEffect))) {
            show = false
          }
          if (!show) return null
          const firstInRow = shipsShown % 6 == 0
          const lastInRow = shipsShown % 6 == 5
          const offsetX = firstInRow ? 60 : lastInRow ? -60 : 0
          shipsShown++

          return (
            <Ship key={x} onClick={() => changeShip(ship.id)}>
              <Hover hoverContent={<ShipHover ship={ship} />} vertical="top" horizontal="center" offset={{ x: offsetX, y: 10 }}>
                <img src={`images/ships/icon/${ship.thumb}_t2.png`} />
              </Hover>
            </Ship>
          )
        })}
      </ShipWrapper>
    </ModalWrapper>
  )
}

export default BoatModalContent
