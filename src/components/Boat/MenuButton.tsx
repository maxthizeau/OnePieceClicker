import { Component, FC, useState } from "react"
import styled, { css } from "styled-components"
import { TModalType } from "../Modals/IModalProps"
import MapModal from "../Modals/Content/Map"
import Modal from "../Modals/Modal"
import { BerryIcon } from "../styled/Globals"
import { nFormatter } from "../../lib/utils"

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
  z-index: 2;

  & img {
    width: 32px;
    height: 32px;
    transition: 0.1s;
  }
`

const ButtonStyled = styled.a<{ locked?: boolean }>`
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
  flex: 1 1 45%;
  align-self: flex-start;
  cursor: pointer;
  &:hover ${IconWrapper} {
    /* top: -11.5px; */
    img {
      width: 38px;
      height: 38px;
    }
  }
  @media only screen and (min-width: 992px) {
    flex-basis: 30%;
  }
  @media only screen and (min-width: 1200px) {
    flex-basis: 30%;
  }
`

const LockedDiv = styled.div<{ locked?: boolean }>`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  background-color: #373737dc;
`

const LabelStyled = styled.span``

interface IMenuButtonProps {
  label: string
  icon: string
  type: TModalType
  locked: {
    unlockFunc: () => void
    price: number
  } | null
}

const MenuButton: FC<IMenuButtonProps> = ({ label, icon, type, locked }) => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <ButtonStyled
        onClick={() => {
          locked !== null ? locked.unlockFunc() : setVisible(true)
        }}
      >
        <IconWrapper>
          <img src={icon} />
        </IconWrapper>
        <LabelStyled>{label}</LabelStyled>
        {locked !== null && (
          <LockedDiv>
            <BerryIcon width={20} marginRight={10} /> {nFormatter(locked.price, 3)}
          </LockedDiv>
        )}
      </ButtonStyled>
      {locked === null && <Modal type={type} visible={visible} setVisible={setVisible} />}
    </>
  )
}

export default MenuButton
