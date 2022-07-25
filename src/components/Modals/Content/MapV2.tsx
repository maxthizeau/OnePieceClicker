import { FC } from "react"
import styled from "styled-components"
import Map from "../../Map/MapFunctionnal"

const MapWrapper = styled.div`
  overflow: hidden;
`

const MapV2ModalContent: FC = () => {
  return (
    <>
      <MapWrapper>
        <Map />
      </MapWrapper>
    </>
  )
}

export default MapV2ModalContent
