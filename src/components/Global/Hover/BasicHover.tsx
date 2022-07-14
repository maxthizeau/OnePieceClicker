import styled from "styled-components"

const BoxStyled = styled.div`
  background: #fafafaf4;
  padding: 5px;
  color: #252525;
  font-family: "Open Sans", "arial";
  border-radius: 3px;
  border: 1px solid #ccc;
  font-size: 0.8em;
  width: 200px;
`

const BasicHover = ({ content }: { content: string }) => {
  return <BoxStyled>{content}</BoxStyled>
}

export default BasicHover
