import { FC } from "react"
import { IDungeonState } from "../../lib/types"
import { DungeonUnitIndicator, DungeonUnitIndicatorWrapper } from "./ClickerStyles"

interface IDungeonIndicator {
  dungeon: IDungeonState | null
}

const DungeonIndicator: FC<IDungeonIndicator> = ({ dungeon }) => {
  return (
    <>
      {dungeon && dungeon.state === "inprogress" && (
        <DungeonUnitIndicatorWrapper>
          {dungeon.dungeonUnits.map((_, index) => {
            const status = index == dungeon.currentUnitIndex ? "active" : index < dungeon.currentUnitIndex ? "down" : "up"
            const isBoss = index == dungeon.dungeonUnits.length - 1
            return <DungeonUnitIndicator key={index} status={status} isBoss={isBoss} />
          })}
        </DungeonUnitIndicatorWrapper>
      )}
    </>
  )
}

export default DungeonIndicator
