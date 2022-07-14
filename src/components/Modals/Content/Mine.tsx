import { FC, useState } from "react"
import styled from "styled-components"
import TreasureFinder from "../../TreasureGame/TreasureFinder"
import MineMarket from "./MineTabs/MineMarket"
import MineUpgrade from "./MineTabs/MineUpgrade"

const ModalContainerStyled = styled.div`
  width: 645px;
  height: 850px;
  /* padding: 20px 0px ; */
`

const TabButtonsContainer = styled.div`
  width: 645px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`
const TabButton = styled.a<{ active?: boolean }>`
  display: flex;
  padding: 10px;
  border: 2px solid white;
  background: ${(props) => (props.active ? "#e2cd78" : "#f0ebd6")};
  border-radius: 3px;
`

const MineModalContent: FC = () => {
  const [tab, setTab] = useState("mine")

  return (
    <ModalContainerStyled>
      {/* <ModalSubtitle>All members you recruited in your fleet. You can add them to your crew whenever you want.</ModalSubtitle> */}

      <TabButtonsContainer>
        <TabButton active={tab == "mine"} onClick={() => setTab("mine")}>
          Mine
        </TabButton>
        <TabButton active={tab == "upgrade"} onClick={() => setTab("upgrade")}>
          Upgrade
        </TabButton>
        <TabButton active={tab == "market"} onClick={() => setTab("market")}>
          Market
        </TabButton>
      </TabButtonsContainer>
      {tab == "mine" && <TreasureFinder />}
      {tab == "upgrade" && <MineUpgrade />}
      {tab == "market" && <MineMarket />}
    </ModalContainerStyled>
  )
}

export default MineModalContent
