import { createContext, useContext, useEffect, useState } from 'react'

let metamask: any
if (typeof window !== 'undefined') {
  metamask = window.ethereum
}

const WalletContext = createContext({})

const WalletContextProvider = ({ children }: any) => {
  const [currentAccount, setCurrentAccount] = useState<string>('')

  const connectWallet = async () => {
    if (!metamask) return
    try {
      const accounts = await metamask.request({
        method: 'eth_requestAccounts',
      })

      if (accounts.length) {
        setCurrentAccount(accounts[0])
      }
    } catch (error) {
      console.error(error)
    }
  }

  const checkIfWalletIsConnected = async () => {
    if (!metamask) return
    try {
      const accounts = await metamask.request({
        method: 'eth_accounts',
      })

      if (accounts.length) {
        setCurrentAccount(accounts[0])
      }
    } catch (error) {
      console.error(error)
    }
  }

  const disconnectWallet = () => {
    setCurrentAccount('')
  }

  useEffect(() => {
    ;(async () => {
      await checkIfWalletIsConnected()
    })()
  }, [])

  return (
    <WalletContext.Provider
      value={{ connectWallet, currentAccount, disconnectWallet }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export default WalletContextProvider

export const useWalletContext = () => useContext(WalletContext)
