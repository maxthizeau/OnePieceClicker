import { NextPage } from "next"
import React, { FC, useEffect } from "react"
import useTranslation from "next-translate/useTranslation"
import i18nConfig from "../../i18n"
import Link from "next/link"
import { useRouter } from "next/router"
import Navigation from "../components/Global/Navigation"

const { locales } = i18nConfig

const ChangeLanguage: FC = () => {
  const { t, lang } = useTranslation()

  return (
    <>
      {locales.map((lng) => {
        if (lng === lang) return null

        return (
          <Link href="#" locale={lng} key={lng}>
            {t(`languages:${lng}`)}
          </Link>
        )
      })}
    </>
  )
}

const TestPage: NextPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Navigation />
      <h2>{t("languages:fr")}</h2>
      <h2>{t("languages:en")}</h2>

      <ChangeLanguage />
    </>
  )
}

export default TestPage
