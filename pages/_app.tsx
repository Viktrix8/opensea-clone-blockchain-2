import type { AppProps } from 'next/app'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'

import Header from '../components/Header'
import WalletContextProvider from '../context/WalletContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
      <WalletContextProvider>
        <Header />
        <Component {...pageProps} />
      </WalletContextProvider>
    </ThirdwebProvider>
  )
}

export default MyApp
