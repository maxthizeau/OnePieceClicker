import styled from "styled-components"
import { BLOCK_PER_ROW, InitLevel, IPattern } from "../../lib/treasureGame/gameConfig"
import patternList from "../../lib/treasureGame/patterns"

const GameContainer = styled.div`
  display: grid;
  width: 430px;
  height: 258px;
  grid-template-columns: repeat(13, 43px);
  background: red;
`

function hardCopy<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

// const ShowAllSprites = () => {
//   const arr = Array(60).fill(undefined)
//   return (
//     <>
//       {arr.map((x, index) => {
//         return <BlockSprite key={index} x={index % 10} y={Math.floor(index / 10)} blockState={EBlockState.HIDDEN} />
//       })}
//     </>
//   )
// }

// const ShowFirstLevel = () => {
//   return (
//     <>
//       {FirstLevel.map((block, index) => {
//         return <BlockSprite key={index} x={block[0]} y={block[1]} blockState={EBlockState.SHOW} />
//       })}
//     </>
//   )
// }

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

const ShowAllPaterns = () => {
  console.log("SHOW ALL")
  // const pat = hardCopy(pattern2)
  // const patterns = [pattern2]

  const patterns = patternList
  const level: number[][] = hardCopy(InitLevel)
  let currentColumn = 1
  let currentRow = 1

  // console.log("Pattern 1 can be placed at index : ", searchEmptySpaceForPattern(level, pattern1))

  for (let i = 0; i < patterns.length; i++) {
    console.log("TESTING PATTERN : ", i + 1)
    const pattern = patterns[i]
    const startIndex = searchEmptySpaceForPattern(level, pattern, true, 10)
    if (!startIndex) {
      console.log("No room for this pattern")
      continue
    }

    for (let j = 0; j < pattern.width * pattern.height; j++) {
      level[BLOCK_PER_ROW * Math.floor(j / pattern.width) + startIndex + (j % pattern.width)] = pattern.pattern[j]
      // console.log("j:", j, "index:", BLOCK_PER_ROW * Math.floor(j / pattern.width) + startIndex + (j % pattern.width))
    }
  }

  let lastMaxHeightPattern = 0
  for (let k = 0; k < level.length; k++) {
    const element = level[k]
    if (element[0] != 1 || element[1] != 1) {
      lastMaxHeightPattern += 1
    }
  }

  console.log(`${lastMaxHeightPattern} / ${level.length}`)

  return (
    <>
      {level.map((block, index) => {
        const isBorder =
          index % BLOCK_PER_ROW == 0 ||
          Math.floor(index / BLOCK_PER_ROW) == 0 ||
          Math.floor(index / BLOCK_PER_ROW) == Math.floor(level.length / BLOCK_PER_ROW) - 1 ||
          index % BLOCK_PER_ROW == BLOCK_PER_ROW - 1
        // const state = isBorder ? EBlockState.SHOW : EBlockState.HIDDEN
        // const blockToShow = state == EBlockState.SHOW ? block : [1, 1]
        const blockToShow = block
        const state = EBlockState.SHOW
        return (
          <BlockSprite
            onClick={() => {
              console.log(index)
            }}
            key={index}
            x={blockToShow[0]}
            y={blockToShow[1]}
            blockState={state}
          />
        )
      })}
    </>
  )
}

const TreasureFinder = () => {
  return (
    <GameContainer>
      {/* <ShowAllSprites /> */}
      {/* <ShowFirstLevel /> */}
      <ShowAllPaterns />

      {/* <BlockSprite x={1} y={0} />
      <BlockSprite x={2} y={0} />
      <BlockSprite x={3} y={0} />
      <BlockSprite x={4} y={0} />
      <BlockSprite x={5} y={0} /> */}

      {/* <img src="images/treasure-game/sprite-elements.png" /> */}
    </GameContainer>
  )
}

export default TreasureFinder
