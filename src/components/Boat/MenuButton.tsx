import { Component, FC, useState } from "react"
import styled from "styled-components"
import { TModalType } from "../Modals/IModalProps"
import MapModal from "../Modals/Content/Map"
import Modal from "../Modals/Modal"

const IconWrapper = styled.div`
  position: absolute;
  left: -45px;
  top: -9.5px;
  width: 68px;
  height: 68px;
  border: 6px solid #b9896e;
  background: #fff5d6;
  border-radius: 99px;
  box-shadow: 2px 2px 2px black;
  transition: 0.1s;
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    width: 32px;
    height: 32px;
    transition: 0.1s;
  }
`

const ButtonStyled = styled.a`
  padding: 15px 45px;
  border-radius: 3px;
  border: 3px solid #eee2ba;
  outline: 2px solid black;
  background: #b9896e;
  color: white;
  text-transform: uppercase;
  text-shadow: 2px 2px 0px black;
  position: relative;
  font-size: 1.2em;
  margin-left: 45px;
  display: flex;
  flex: 1 1 30%;
  align-self: flex-start;
  cursor: pointer;

  &:hover ${IconWrapper} {
    /* top: -11.5px; */
    img {
      width: 38px;
      height: 38px;
    }
  }
`

const LabelStyled = styled.span``

interface IMenuButtonProps {
  label: string
  icon: string
  type: TModalType
}

const MenuButton: FC<IMenuButtonProps> = ({ label, icon, type }) => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <ButtonStyled
        onClick={() => {
          setVisible(true)
        }}
      >
        <IconWrapper>
          <img src={icon} />
        </IconWrapper>
        <LabelStyled>{label}</LabelStyled>
      </ButtonStyled>
      <Modal type={type} visible={visible} setVisible={setVisible} />
    </>
  )
}

export default MenuButton
