import useTranslation from "next-translate/useTranslation"
import { FC, useState } from "react"
import styled from "styled-components"
import useSave from "../../../lib/hooks/useSave"

const ModalExtraStyles = styled.div`
  & *:not(h3) {
    font-family: Open Sans, Verdana, Geneva, Tahoma, sans-serif;
  }
`

const ImportForm = styled.form`
  & label {
    width: 100%;
    font-weight: bold;
  }
  & input,
  textarea {
    width: 100%;
  }
`

const FormButton = styled.button`
  width: 100%;
  padding: 5px 10px;
  text-align: center;
  margin: 10px 0px;
  cursor: pointer;
`

const ORText = styled.div`
  margin: 10px 0px;
  font-size: 1.2em;
  text-align: center;
`

const ResultMessage = styled.div<{ type: "success" | "error" }>`
  padding: 5px;
  /* border: 2px solid white; */
  border-radius: 3px;
  background: ${({ type }) => (type == "success" ? "#99e0af" : "#fdaeae")};
  color: ${({ type }) => (type == "success" ? "#134422" : "#561717")};
  margin: 10px 0px;
  &::before {
    content: ${({ type }) => (type == "success" ? `"✅ Success : "` : `"❌ Error : "`)};

    margin-right: 5px;
  }
`

const ImportExportModalContent: FC = () => {
  const [save, reset, downloadSave, importSave] = useSave()
  const [saveText, setSaveText] = useState("")
  const [resultMessage, setResultMessage] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const { t } = useTranslation()
  const resetSave = () => {
    const confirmed = confirm(t("common:Saves.confirm-reset"))
    if (confirmed) {
      reset()
    }
  }

  const userImportSave = (e) => {
    e.preventDefault()
    const result = importSave(saveText)
    if (result) {
      setResultMessage({ type: "success", message: t("common:Saves.save-imported") })
    } else {
      setResultMessage({ type: "error", message: t("common:Saves.unknown-save") })
    }
  }

  const onChangeFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => {
      const text = e.target.result as string
      setSaveText(text)
    }
    reader.readAsText(e.target.files[0])
  }

  return (
    <ModalExtraStyles>
      <h3>{t("common:Saves.export-your-save")}</h3>
      {resultMessage && <ResultMessage type={resultMessage.type}>{resultMessage.message}</ResultMessage>}
      <FormButton onClick={() => downloadSave()}>{t("common:Saves.download-save")}</FormButton>
      <hr />
      <h3>{t("common:Saves.import-a-save")}</h3>
      <ImportForm>
        <label>
          <div>{t("common:Saves.import-file")}</div>
          <input type="file" onChange={(e) => onChangeFile(e)} />
        </label>
        <ORText>{t("common:Saves.or")}</ORText>
        <label>
          <div>{t("common:Saves.paste-your-save")}</div>
          <textarea value={saveText} onChange={(e) => setSaveText(e.target.value)} />
        </label>
        <FormButton onClick={(e) => userImportSave(e)}>{t("common:Saves.import")}</FormButton>
      </ImportForm>
      <div style={{ marginBottom: "10px" }}>
        <i style={{ color: "#f3cdcd", fontWeight: "bold" }}>{t("common:Saves.warning-import")}</i>
      </div>
      <hr />
      <h3>{t("common:Saves.erase-current-save")}</h3>
      <FormButton onClick={() => resetSave()}>{t("common:Saves.start-over")}</FormButton>
      <i style={{ color: "#f3cdcd", fontWeight: "bold" }}>{t("common:Saves.warning-reset")}</i>
    </ModalExtraStyles>
  )
}

export default ImportExportModalContent
