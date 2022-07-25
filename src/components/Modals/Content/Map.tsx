import useTranslation from "next-translate/useTranslation"
import { FC } from "react"
import styled from "styled-components"
import useStatePersistInCookie from "../../../lib/hooks/useStatePersistsInCookie"
import Hover from "../../Global/Hover"
import BasicHover from "../../Global/Hover/BasicHover"
import MapV1ModalContent from "./MapV1"
import MapV2ModalContent from "./MapV2"

const ModalWrapper = styled.div`
  display: flex;
  width: 988px;
  height: 650px;
`
const ZonesListWrapper = styled.div`
  padding: 10px;
`

const ChooseMapTypeButton = styled.div`
  display: inline-block;
  padding: 5px 10px;
  background: white;
  border-radius: 5px;
  border: 3px solid #d3af85;
  outline: 1px solid #2c2c2c;
  margin: 0px 20px;
  cursor: pointer;
`

const TextStyled = styled.span`
  font-family: "Press Start 2P", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
    sans-serif;
  font-size: 0.9em;
`

const MapModalContent: FC = () => {
  const [mapV2, setMapV2] = useStatePersistInCookie("mapType", false)
  const { t } = useTranslation()

  return (
    <>
      <h3>
        <ChooseMapTypeButton onClick={() => setMapV2(true)}>
          <Hover
            vertical="bottom"
            horizontal="center"
            offset={{ x: 0, y: 20 }}
            delayOpen={200}
            hoverContent={<BasicHover content={t("common:Map.map-view")} />}
          >
            <TextStyled>{t("common:Map.Map")}</TextStyled>
          </Hover>
        </ChooseMapTypeButton>
        <ChooseMapTypeButton onClick={() => setMapV2(false)}>
          {" "}
          <Hover
            vertical="bottom"
            horizontal="center"
            offset={{ x: 0, y: 20 }}
            delayOpen={200}
            hoverContent={<BasicHover content={t("common:Map.list-view")} />}
          >
            <TextStyled>{t("common:Map.List")}</TextStyled>
          </Hover>
        </ChooseMapTypeButton>
      </h3>
      <ModalWrapper>{mapV2 ? <MapV2ModalContent /> : <MapV1ModalContent />}</ModalWrapper>
    </>
  )
}

export default MapModalContent
