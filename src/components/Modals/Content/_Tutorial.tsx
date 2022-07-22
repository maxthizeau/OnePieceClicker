import { FC, useState } from "react"
import styled from "styled-components"
import tutorialSteps from "../../../lib/data/tutorial"
import { useTutorial } from "../../../lib/hooks/TutorialContext"

const ExtraModalStyles = styled.div`
  width: 800px;
  font-family: Open Sans, Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1.2em;

  & .isImage {
    margin: 20px auto;
    text-align: center;

    & img {
      max-width: 500px;
    }
  }

  & h3 {
    text-align: center;
  }
`

const ModalButton = styled.button`
  border: 3px solid #eee2ba;
  outline: 2px solid black;
  border-radius: 3px;
  padding: 5px 20px;
  margin: 20px auto;
  text-align: center;
  cursor: pointer;
  background-color: white;
  display: block;
  /* transition: 0.2s; */
  &:hover {
    background-color: #eee2ba;
  }
`

// const TutorialGoal = styled.div`
//   font-size: 1.2em;
//   font-weight: bold;
//   color: #e8f2d9;
//   text-align: center;
//   margin-top: 20px;
// `

// const ContentWithImages = ({ stepId, content }: { stepId: number; content: string }) => {
//   const contentWithLineBreak = content.replaceAll("\n", "\n\n\n")
//   const contentArray = contentWithLineBreak.split(/(\<img\>)/).filter(String)
//   //   const arr = "asdf a  b c2 "
//   let imgCount = 0
//   return (
//     <div>
//       {contentArray.map((x, index) => {
//         const isImage = x == "<img>"
//         imgCount = isImage ? imgCount + 1 : imgCount
//         return (
//           <div key={index} className={isImage ? "isImage" : ""}>
//             {isImage ? <img src={`images/tutorial/${stepId}/${imgCount}.jpg`} /> : x} <br />
//           </div>
//         )
//       })}
//     </div>
//   )
// }

const TutorialModalContent: FC = () => {
  // const { state, dispatch } = useTutorial()
  // const currentStep = tutorialSteps[state.step]
  // console.log("STATE: ", state)
  // if (!currentStep) return null
  // return (
  //   <ExtraModalStyles>
  //     {/* <ModalSubtitle>All members you recruited in your fleet. You can add them to your crew whenever you want.</ModalSubtitle> */}
  //     <h3>Tutorial</h3>
  //     <h3>{currentStep.title}</h3>
  //     {/* <div>{currentStep.content}</div> */}
  //     <ContentWithImages stepId={currentStep.stepId} content={currentStep.content} />
  //     {currentStep.goal && <TutorialGoal>{currentStep.goal}</TutorialGoal>}
  //     <ModalButton
  //       onClick={() => {
  //         dispatch.clickCloseModal()
  //       }}
  //     >
  //       OK
  //     </ModalButton>
  //   </ExtraModalStyles>
  // )
  return null
}

export default TutorialModalContent
