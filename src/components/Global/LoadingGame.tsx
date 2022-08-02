import { FC } from "react"
import styled from "styled-components"

const Spinner = styled.div`
  display: flex;
  width: 100%;
  height: 400px;
  padding: 20px;
  margin: -16px 0px 0px 0px;
  border-radius: 3px;
  border: 3px solid #b9896e;
  outline: 2px solid black;
  background: #f4f4f4;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #2a2a2a;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`

interface ILoadingGameProps {
  value: React.ReactNode
  maxValue: number
}

const LoadingGame: FC<ILoadingGameProps> = ({ value, maxValue }) => {
  return (
    <>
      <Spinner>
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>Loading Units</div>
        <div>
          {value} / {maxValue}
        </div>
      </Spinner>
      {/* <div class="progress-bar">
				<span class="progress-bar-fill" style="width: 70%;"></span>
			</div> */}
    </>
  )
}

export default LoadingGame
