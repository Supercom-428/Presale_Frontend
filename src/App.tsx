import React, { useCallback, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { UseWalletProvider } from '@binance-chain/bsc-use-wallet'
import * as bsc from '@binance-chain/bsc-use-wallet'
import MobileMenu from './components/MobileMenu'
import TopBar from './components/TopBar'
import ModalsProvider from './contexts/Modals'
import PresaleProvider from './contexts/PresaleProvider'
import {lightTheme} from './theme'
import Home from './views/Home'
import backgroundImg from "./assets/img/background.png";

const GlobalStyle = createGlobalStyle`
  body {
    background: ${(props: any) => props.theme.backgroundColor};
    color: ${(props: any) => props.theme.bodycolor};
    // margin: 0;
  }
`;
const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  return (
    <Providers>
      <Router>
        <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
        <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </Providers>
  )
}

const Providers: React.FC = ({ children }) => {
  return (
    // <div style={{ backgroundImage: `url(${backgroundImg})` }}>
      <ThemeProvider theme={lightTheme}>
      <GlobalStyle/>
        <UseWalletProvider
          // chainId={56}
          // connectors={{
          //   walletconnect: { rpcUrl: 'https://bsc-dataseed.binance.org/' },
          // }}
          chainId={3}
          connectors={{
            walletconnect: { rpcUrl: 'https://ropsten.infura.io/v3/09f83bea7fbc4b3d805873592177712b' },
          }}
        >
          <PresaleProvider>
            <ModalsProvider>{children}</ModalsProvider>
          </PresaleProvider>
        </UseWalletProvider>
      </ThemeProvider>
    // </div>
  )
}

export default App
