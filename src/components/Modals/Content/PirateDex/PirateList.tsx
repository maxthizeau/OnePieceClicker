import { FC } from "react"
import styled from "styled-components"
import { getThumbImageSrc } from "../../../../lib/clickerFunctions"
import useCards from "../../../../lib/hooks/useCards"
import { TUnit } from "../../../../lib/types"

const PirateUnit = styled.div`
  margin: 10px;

  & img {
    width: 60px;
    height: 60px;
    &.not-owned {
      filter: grayscale(1) contrast(2) brightness(0.4);
    }
  }
`

interface IPirateListProps {
  units: TUnit[]
  showOwned: boolean
}

const PirateList: FC<IPirateListProps> = ({ units, showOwned }) => {
  const [cards] = useCards()
  return (
    <>
      {units.map((unit) => {
        const owned = cards.find((y) => y.id == unit.id)
        if (!showOwned && owned) {
          return null
        }
        return (
          <PirateUnit key={`pirateunit-${unit.id}`}>
            <img src={getThumbImageSrc(unit.id)} className={owned ? "" : "not-owned"} />
          </PirateUnit>
        )
      })}
    </>
  )
}

export default PirateList
