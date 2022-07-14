import { FC } from "react"
import { getBerryRewardFromUnit, getHPLossFromUnit, getXPGainFromUnit } from "../../lib/clickerFunctions"
import { EInstance } from "../../lib/enums"
import { TUnit, IDungeonState } from "../../lib/types"
import { DebugText } from "./ClickerStyles"

interface IDebugProps {
  debug: boolean
  unit: TUnit
  instance: EInstance
  dungeon: IDungeonState | null
}

const Debug: FC<IDebugProps> = ({ debug, unit, instance, dungeon }) => {
  if (!debug) return null
  return (
    <DebugText>
      <p>ID : {unit.id}</p>
      <p>ATK: {getHPLossFromUnit({ unit, hp: 0 })}</p>
      <p>Stars: {unit.stars}</p>
      <p>Cost: {unit.cost}</p>
      <p>Reward: {getBerryRewardFromUnit(unit)}</p>
      <p>XP: {getXPGainFromUnit({ unit, hp: 0 })}</p>
      <p>Instance : {instance}</p>
      {dungeon && dungeon.isDungeon && <p>[DUNGEON - {dungeon.state}]</p>}
      {dungeon && (
        <p>
          [{dungeon.currentUnitIndex + 1} / {dungeon.dungeonUnits.length}]
        </p>
      )}
    </DebugText>
  )
}

export default Debug
