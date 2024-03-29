import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { locales } from "../../../i18n"
import Modal from "../Modals/Modal"

const NavContainer = styled.div<{ show: boolean }>`
  width: 230px;
  position: fixed;
  height: 100%;
  background: #ad6a54;
  padding: 20px;
  z-index: 1000;
  /* overflow: scroll; */

  /* box-shadow: 2px 0px 5px #ad6a54; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  ${(props) => !props.show && "transform: translateX(calc(-102%));"} /* transform: translateX(calc(-102%)); */
  transition: transform 0.3s;

  & a {
    cursor: pointer;
    transition: color 0.2s;
    &:hover {
      color: #fff9c8;
    }
  }
`

const MenuButton = styled.div`
  &::after {
    content: "MENU";
    display: flex;
    justify-content: center;
    letter-spacing: 4px;
    writing-mode: vertical-rl;
    text-orientation: upright;
    position: absolute;
    right: -30px;
    /* padding: 3px 10px 5px 10px; */
    padding: 10px 5px;
    top: 0px;
    /* font-size: 2em; */
    /* transform: translateY(-50%); */
    background-color: #ad6a54;
    /* box-shadow: 2px 0px 5px #ad6a54; */
    color: #e2d8ba;
    width: 20px;
    cursor: pointer;
  }
`

const Nav = styled.nav`
  margin-bottom: 30px;
  overflow: hidden;
  & ul li {
    list-style: none;
    margin: 15px 0px 15px 10px;
  }
`

const NavTitle = styled.div`
  font-family: "Press Start 2P";
  text-align: center;
  color: #fff9c8;
  font-size: 1.2em;
`

const GitHubIcon = styled.a`
  position: relative;
  /* background: white; */
  height: 30px;
  width: 30px;
  margin: 0px auto;
  cursor: pointer;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    background-image: url("images/icons/GitHub-Mark-64px.png");
    background-size: contain;
    width: 30px;
    height: 30px;
  }
`

function usePersistLocaleCookie() {
  const { locale, defaultLocale } = useRouter()

  useEffect(persistLocaleCookie, [locale, defaultLocale])
  function persistLocaleCookie() {
    if (locale !== defaultLocale) {
      const date = new Date()
      const expireMs = 100 * 24 * 60 * 60 * 1000 // 100 days
      date.setTime(date.getTime() + expireMs)
      document.cookie = `NEXT_LOCALE=${locale};expires=${date.toUTCString()};path=/`
    }
  }
}

const Navigation: FC = () => {
  const [show, setShow] = useState(false)
  const wrapperRef = useRef(null)
  const { t, lang } = useTranslation()
  const [visibleSavesModal, setVisibleSavesModal] = useState(false)
  const [visibleGuideModal, setVisibleGuideModal] = useState(false)
  usePersistLocaleCookie()

  useEffect(() => {
    /**
     * Handle Click Outside to hide the menu
     */
    function handleClickOutside(event) {
      if (show && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShow(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [wrapperRef, show])

  return (
    <>
      <NavContainer show={show} ref={wrapperRef}>
        <Nav>
          <NavTitle>Menu</NavTitle>
          <ul>
            <li>
              <a onClick={() => setVisibleGuideModal(true)}>{t(`common:navigation.guide`)}</a>
            </li>
            <li>
              <a onClick={() => setVisibleSavesModal(true)}> {t(`common:navigation.saveImport`)}</a>
            </li>
          </ul>
        </Nav>
        <Nav>
          <NavTitle>{t(`common:navigation.language`)}</NavTitle>
          <ul>
            {locales.map((lng) => {
              return (
                <li key={lng}>
                  <Link href="#" locale={lng}>
                    {`${lng === lang ? "➡" : ""} ${t(`languages:${lng}`)}`}
                  </Link>
                </li>
              )
            })}
          </ul>
        </Nav>
        <MenuButton onClick={() => setShow(!show)} />
        <GitHubIcon target="_blank" href="https://github.com/maxthizeau/OnePieceClicker" />
      </NavContainer>

      <Modal type="saves" visible={visibleSavesModal} setVisible={setVisibleSavesModal} />
      <Modal type="guide" visible={visibleGuideModal} setVisible={setVisibleGuideModal} />
    </>
  )
}

export default Navigation
