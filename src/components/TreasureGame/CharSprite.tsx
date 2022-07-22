import styled from "styled-components"
import { EBlockState } from "../../lib/treasureGame/gameConfig"

const CharSpriteImage = styled.div<{ width: number }>`
  background-image: url("images/treasure-game/character.png");
  background-size: ${(props) => props.width}px ${(props) => props.width}px;
  display: inline-block;
  background-color: rgb(59, 40, 58);
  height: ${(props) => props.width}px;
  width: ${(props) => props.width}px;
  margin: 0;
  padding: 0;
  border: none;
  position: relative;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid white;
    cursor: pointer;
  }
`

const CharSprite = ({ onClick }: { onClick?: () => void }) => {
  return (
    <>
      <CharSpriteImage width={43} onClick={onClick} />
    </>
  )
}

export default CharSprite
