import { FC } from "react"
import styled from "styled-components"
import Map from "../../Map/MapFunctionnal"

const MapWrapper = styled.div`
  overflow: hidden;
  height: 650px;
  width: 1000px;
`

const MapV2ModalContent: FC = () => {
  return (
    <>
      <MapWrapper>
        <h3>Map v2</h3>
        {/* <ModalSubtitle>Select the item you want to buy</ModalSubtitle> */}
        <Map />
      </MapWrapper>
    </>
  )
}

export default MapV2ModalContent
