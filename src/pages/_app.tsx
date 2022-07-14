import "../styles/globals.css"
import type { AppProps } from "next/app"
import { GlobalStyle } from "../components/styled/Globals"
import { ThemeProvider } from "styled-components"
import { ApolloProvider } from "@apollo/client"
import { client } from "../lib/apollo"
import { GameProvider } from "../lib/hooks/GameContext"
import "react-notifications-component/dist/theme.css"
import { ReactNotifications } from "react-notifications-component"
import { TreasureGameProvider } from "../lib/hooks/TreasureGameContext"

interface ThemeInterface {
  colors: {
    primary: string
    secondary: string
    white: string
    black: string
    background: string
  }
}

const theme: ThemeInterface = {
  colors: {
    primary: "#0070f3",
    secondary: "#aa1c1c",
    white: "#f3f3f3",
    black: "#131313",
    background: "#633e3e",
  },
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <GameProvider>
          <TreasureGameProvider>
            <ReactNotifications className="notifications" />
            <Component {...pageProps} />
          </TreasureGameProvider>
        </GameProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default MyApp
