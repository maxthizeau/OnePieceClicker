import { FC, useCallback, useState, useEffect } from "react"
import styled from "styled-components"
import { zoneIdVar } from "../../../lib/cache"
import { zones } from "../../../lib/data/zones"
import { EInstance } from "../../../lib/enums"
import useInstance from "../../../lib/hooks/useInstance"
import { IModalProps } from "../IModalProps"
import { CloseModalIcon, ModalButtonStyled, ModalContainer, ModalStyled, ModalSubtitle } from "../ModalStyles"
import { intWithSpaces } from "../../../lib/clickerFunctions"
import useUpgrades from "../../../lib/hooks/useUpgrades"
import useItems, { TItemKey } from "../../../lib/hooks/useItems"
import { defaultItemsList, TItem } from "../../../lib/data/items"

const ShopWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 800px;
  justify-content: center;
`

const ItemShopBoxStyled = styled.div<{ selected: boolean }>`
  padding: 20px;

  border-radius: 3px;
  border: 3px solid ${(props) => (props.selected ? "#a34343" : "#b9896e")};
  outline: 2px solid black;
  background: ${(props) => (props.selected ? "#e2e194" : "#eee2ba")};

  width: 27%;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ItemShopIcon = styled.div`
  & img {
    width: 70px;
    height: 70px;
  }
  margin-bottom: 10px;
`

const ItemShopTitle = styled.div``

const ItemShopPrice = styled.div`
  font-family: "Open Sans";
  padding: 5px;
`

const ItemShopButtonStyled = styled.a`
  cursor: pointer;
  background: white;
  border: 3px solid #eee2ba;
  outline: 2px solid black;
  border-radius: 3px;
  padding: 5px;
  text-align: center;
  font-size: 0.8em;
`

const ShopFormWrapper = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #c8c2a0;
`

const ShopItemSelected = styled.div`
  img {
    width: 30px;
    height: 30px;
  }

  span {
    margin-left: 20px;
    font-size: 0.9em;
  }
`
const ShopForm = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;

  gap: 10px;
  justify-content: center;
`

const ShopFormInput = styled.input`
  font-family: inherit;
  color: #353535;
`

const ShopBuyButton = styled.button`
  cursor: pointer;
  background: #eee2ba;
  border: 3px solid #a16e52;
  color: #312819;
  outline: 2px solid black;
  border-radius: 3px;
  padding: 8px;
  text-align: center;
  font-size: 0.9em;

  .price-text {
    font-family: "Open Sans", "Arial";
    display: block;
    margin: 5px 5px 0px 5px;
    font-size: 1.1em;
  }
`

interface IItemShopBoxProps {
  icon: string
  title: string
  price: number
  onClick: () => void
  selected?: boolean
}

const ItemShopBox: FC<IItemShopBoxProps> = ({ icon, title, price, onClick, selected = false }) => {
  return (
    <ItemShopBoxStyled onClick={onClick} selected={selected}>
      <ItemShopIcon>
        <img src={icon} />
      </ItemShopIcon>

      <ItemShopTitle>{title}</ItemShopTitle>
      <ItemShopPrice>฿ {intWithSpaces(price)}</ItemShopPrice>
    </ItemShopBoxStyled>
  )
}

const ShopModalContent: FC = () => {
  const { items, addItem: buyItem } = useItems()
  const [selected, setSelected] = useState<number>(0)
  const [amount, setAmount] = useState<number>(1)

  return (
    <>
      <h3>Shop</h3>
      <ModalSubtitle>Select the item you want to buy</ModalSubtitle>
      <ShopWrapper>
        {defaultItemsList.map((item, index) => {
          return (
            <ItemShopBox
              key={`item-shop-${index}`}
              icon={item.icon}
              title={item.title}
              price={item.price}
              onClick={() => {
                setSelected(index)
              }}
              selected={index == selected}
            />
          )
        })}

        <ShopFormWrapper>
          <ShopItemSelected>
            <img src={defaultItemsList[selected].icon} />
            <span>{defaultItemsList[selected].title} </span>
          </ShopItemSelected>
          <ShopForm>
            <ItemShopButtonStyled onClick={() => setAmount(1)}>Reset</ItemShopButtonStyled>
            <ShopFormInput
              value={amount}
              onChange={(e) => {
                const value = e.target.value != "" ? parseInt(e.target.value) : 0
                setAmount(value)
              }}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
            />

            <ItemShopButtonStyled onClick={() => setAmount(amount + 1)}>+ 1</ItemShopButtonStyled>
            <ItemShopButtonStyled onClick={() => setAmount(amount + 10)}>+ 10</ItemShopButtonStyled>
            <ItemShopButtonStyled onClick={() => setAmount(amount + 100)}>+ 100</ItemShopButtonStyled>
          </ShopForm>
          <ShopBuyButton
            onClick={() => {
              buyItem(defaultItemsList[selected].itemKey, amount)
              setAmount(1)
            }}
          >
            Buy <span className="price-text">(฿ {intWithSpaces(amount * defaultItemsList[selected].price)})</span>
          </ShopBuyButton>
        </ShopFormWrapper>
      </ShopWrapper>
    </>
  )
}

export default ShopModalContent
