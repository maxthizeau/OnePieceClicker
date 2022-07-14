import { useReactiveVar } from "@apollo/client"
import { Fragment, useState } from "react"
import styled from "styled-components"
import { zoneIdVar } from "../../../../lib/cache"
import useUnitData from "../../../../lib/hooks/useUnitData"
import { zones } from "../../../../lib/data/zones"
import PirateList from "./PirateList"

const PiratedexWrapper = styled.div`
  padding: 10px 20px;

  width: 700px;
`

const PiratesListStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Title = styled.div`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 99px;
  background-color: #ffffff;
  border: 3px solid #ddc987;
  text-align: center;
  font-size: 1.3em;
  letter-spacing: 5px;
  margin-top: 20px;
`

const Filters = styled.div`
  padding: 20px;
  /* border: 2px solid #ddc987; */
  font-family: "Open Sans", "arial";
  font-size: 0.8em;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-direction: row;

  & button {
    padding: 5px 10px;
    cursor: pointer;
    margin-left: 10px;
  }
`

const InputField = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  & select {
    padding: 5px 10px;
  }
`

const Label = styled.div``

const Piratedex = () => {
  const [data, dataByRarity] = useUnitData()
  const zoneId = useReactiveVar(zoneIdVar)
  const zone = zones[zoneId]
  const [rarity, setRarity] = useState(dataByRarity[0].stars)
  const [showOwned, setShowOwned] = useState(true)
  return (
    <PiratedexWrapper>
      <h3>{zone.location}</h3>
      <Filters>
        {/* <InputField>
          <Label>Rarity :</Label>
          <select
            onChange={(e) => {
              setRarity(parseInt(e.target.value))
            }}
          >
            {dataByRarity.map((x) => {
              const zoneUnitsLenght = x.units.filter((y) => y.zone == zoneId).length
              if(zoneUnitsLenght <= 0) { return null}
              const rarityString = new Array(x.stars + 1).join(`⭐`)
              return <option value={}>{rarityString}</option>
            })}
          </select>
        </InputField> */}
        <InputField>
          <Label>Show looted cards : </Label>
          <button onClick={() => setShowOwned(!showOwned)}> {showOwned ? `✅ Yes` : `🚫 No`}</button>
        </InputField>
      </Filters>
      {dataByRarity.reverse().map((rarity) => {
        console.log(rarity)
        let rarityStars = ""
        for (let i = 1; i <= rarity.stars; i++) {
          rarityStars += `⭐`
        }
        const zoneUnits = rarity.units.filter((x) => x.zone == zoneId)
        if (zoneUnits.length <= 0) {
          return null
        }
        return (
          <Fragment key={`rarity-${rarity.stars}`}>
            <Title> {rarityStars} </Title>
            <PiratesListStyled>
              <PirateList units={zoneUnits} showOwned={showOwned} />
            </PiratesListStyled>
          </Fragment>
        )
      })}
    </PiratedexWrapper>
  )
}

export default Piratedex
