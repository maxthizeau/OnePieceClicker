import { possibleGems } from "../data/treasureGame"
import { hardCopy } from "../utils"
import { BLOCK_PER_ROW, EBlockState, IGem, InitLevel, IPattern } from "./gameConfig"
import patternList from "./patterns"

/**
 * Function that search where to place a pattern in the level array.
 * @param    {number[][]} level    level 2dim array
 * @param    {IPattern} pattern    the pattern you want to add in level
 * @param    {boolean} randomIndex randomize location true/false
 * @param    {number} maximumTry maximum try if randomIndex is set. So we don't do an infinite loop for a unplaceable pattern
 * @return   {number|null}    null if
 */
function searchEmptySpaceForPattern(level: number[][], pattern: IPattern, randomIndex: boolean = false, maximumTry = 10) {
  const getRandomIndex = () => Math.floor(Math.random() * level.length)
  const startIndex = randomIndex ? getRandomIndex() : 0
  let tryCount = 0
  for (let index = startIndex; index < level.length; index++) {
    let valid = true
    for (let j = 0; j < pattern.pattern.length; j++) {
      // If pattern width + current X > BLOCK PER ROW, it doesnt fit, so break it
      if ((index % BLOCK_PER_ROW) + pattern.width > BLOCK_PER_ROW) {
        valid = false
        break
      }
      const levelIndex = BLOCK_PER_ROW * Math.floor(j / pattern.width) + index + (j % pattern.width)
      const [x, y] = level[levelIndex]

      // If not [1,1], break
      if (x != 1 || y != 1) {
        valid = false
        break
      }
    }
    if (valid) {
      return index
    }
    if (randomIndex) {
      if (tryCount < maximumTry) {
        tryCount++
        index = getRandomIndex()
      } else {
        return null
      }
    }
  }
  return null
}

export function generateLevel(): number[][] {
  console.log("Generate new level")

  const patterns = patternList
  const level: number[][] = hardCopy(InitLevel)
  let currentColumn = 1
  let currentRow = 1

  for (let i = 0; i < patterns.length; i++) {
    //   console.log("TESTING PATTERN : ", i + 1)
    const pattern = patterns[i]
    const startIndex = searchEmptySpaceForPattern(level, pattern, true, 10)
    if (!startIndex) {
      console.log("No room for this pattern")
      continue
    }

    for (let j = 0; j < pattern.width * pattern.height; j++) {
      level[BLOCK_PER_ROW * Math.floor(j / pattern.width) + startIndex + (j % pattern.width)] = pattern.pattern[j]
    }
  }

  // let lastMaxHeightPattern = 0
  // for (let k = 0; k < level.length; k++) {
  //   const element = level[k]
  //   if (element[0] != 1 || element[1] != 1) {
  //     lastMaxHeightPattern += 1
  //   }
  // }
  // console.log(`${lastMaxHeightPattern} / ${level.length}`)
  return level
}

export function generateGemsArray(level: number[][], gemCount: number): IGem[] {
  const gems: IGem[] = []
  for (let i = 0; i < gemCount; i++) {
    const randomIndex = Math.floor(Math.random() * (level.length - BLOCK_PER_ROW))
    for (let j = randomIndex; j < level.length; j++) {
      if (level[j][0] == 1 && level[j][1] == 1) {
        const randomGem = possibleGems[Math.floor(Math.random() * possibleGems.length)]
        const xyBlock = [j % BLOCK_PER_ROW, Math.floor(j / BLOCK_PER_ROW)]
        if (gems.findIndex((x) => x.x == xyBlock[0] && x.y == xyBlock[1]) == -1) {
          gems.push({
            stone: randomGem,
            x: xyBlock[0],
            y: xyBlock[1],
            collected: false,
          })
          break
        }
      }
    }
  }
  return gems
}

export function getXYBlockFromIndex(index: number): { x: number; y: number } {
  const xyBlock = { x: index % BLOCK_PER_ROW, y: Math.floor(index / BLOCK_PER_ROW) }
  return xyBlock
}
export function getIndexFromXYBlock(x: number, y: number): number {
  const index = y * BLOCK_PER_ROW + x
  return index
}

export function isBorder(index: number, levelLength: number) {
  return (
    index % BLOCK_PER_ROW == 0 ||
    Math.floor(index / BLOCK_PER_ROW) == 0 ||
    Math.floor(index / BLOCK_PER_ROW) == Math.floor(levelLength / BLOCK_PER_ROW) - 1 ||
    index % BLOCK_PER_ROW == BLOCK_PER_ROW - 1
  )
}
