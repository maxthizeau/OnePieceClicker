import { FC, useState } from "react"
import styled from "styled-components"
import { guideSteps } from "../../../lib/data/guide"
import useTranslation from "next-translate/useTranslation"

const ExtraModalStyles = styled.div`
  width: 800px;
  height: 700px;
  font-size: 1.2em;
  & h2,
  h3 {
    text-align: center;
  }

  & p {
    margin-bottom: 20px;
    margin-top: 10px;
  }

  & .image-container {
    text-align: center;
    & img {
      border: 8px solid #ffdc9a;
      max-width: 55%;
    }
  }
`

const SelectHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: Open Sans, Verdana, Geneva, Tahoma, sans-serif;
  margin-top: 10px;
`

const SelectGuideStep = styled.select`
  margin-left: 20px;
  margin-right: 20px;
`

const GuideContent = styled.div`
  font-family: Open Sans, Verdana, Geneva, Tahoma, sans-serif;
`

const SelectButton = styled.button``

const GuideModalContent: FC = () => {
  const { t } = useTranslation()
  const [step, setStep] = useState(0)
  return (
    <ExtraModalStyles>
      <h2>Guide</h2>
      <SelectHeader>
        <SelectButton onClick={() => step > 0 && setStep(step - 1)}>{t("common:Previous")}</SelectButton>
        <SelectGuideStep value={step} onChange={(e) => setStep(parseInt(e.target.value))}>
          {guideSteps.map((x, index) => (
            <option value={index} key={x.title}>
              {t(`tutorial:Guide.${x.title}-title`)}
            </option>
          ))}
        </SelectGuideStep>
        <SelectButton onClick={() => step < guideSteps.length - 1 && setStep(step + 1)}>{t("common:Next")}</SelectButton>
      </SelectHeader>
      {guideSteps[step] !== undefined && (
        <GuideContent>
          <h3>{t(`tutorial:Guide.${guideSteps[step].title}-title`)}</h3>
          <div>{guideSteps[step].content}</div>
        </GuideContent>
      )}
    </ExtraModalStyles>
  )
}

export default GuideModalContent
