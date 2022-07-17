import { FC, useState } from "react"
import styled from "styled-components"
import TreasureFinder from "../../TreasureGame/TreasureFinder"
import MineMarket from "./MineTabs/MineMarket"
import MineUpgrade from "./MineTabs/MineUpgrade"
import useTranslation from "next-translate/useTranslation"

const ModalContainerStyled = styled.div`
  width: 645px;
  height: 850px;
  /* padding: 20px 0px ; */
  & h5 {
    margin: 10px;
  }
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
  const { t } = useTranslation()
  const [tab, setTab] = useState("mine")

  return (
    <ModalContainerStyled>
      {/* <ModalSubtitle>All members you recruited in your fleet. You can add them to your crew whenever you want.</ModalSubtitle> */}

      <TabButtonsContainer>
        <TabButton active={tab == "mine"} onClick={() => setTab("mine")}>
          {t("game:Modals.Mine.mine-label")}
        </TabButton>
        <TabButton active={tab == "upgrade"} onClick={() => setTab("upgrade")}>
          {t("game:Modals.Mine.upgrade-mine-label")}
        </TabButton>
        <TabButton active={tab == "market"} onClick={() => setTab("market")}>
          {t("game:Modals.Mine.market-mine-label")}
        </TabButton>
      </TabButtonsContainer>
      {tab == "mine" && <TreasureFinder />}
      {tab == "upgrade" && <MineUpgrade />}
      {tab == "market" && <MineMarket />}
    </ModalContainerStyled>
  )
}

export default MineModalContent
