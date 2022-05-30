import Image from 'next/image'
import {
  SearchIcon,
  UserCircleIcon,
  CurrencyEuroIcon,
} from '@heroicons/react/outline'

import logo from '../assets/logo.png'
import Link from 'next/link'
import { useWalletContext } from '../context/WalletContext'

const Header = () => {
  // @ts-ignore
  const { connectWallet, currentAccount, disconnectWallet } = useWalletContext()
  return (
    <div className="bg-[rgb(7,17,28)] py-4 shadow-md px-4 flex space-x-5 w-screen sticky z-20 top-0 text-white">
      <Link href="/">
        <div className="flex items-center space-x-2 lg:mr-44 cursor-pointer">
          <Image
            src={logo}
            objectFit="cover"
            alt="logo"
            height={40}
            width={40}
          />
          <span className="font-bold text-xl tracking-wider">Opensea</span>
        </div>
      </Link>

      <div className="flex items-center bg-primary-dark rounded-lg p-2 flex-1">
        <SearchIcon className="h-6 w-6 text-gray-400 mr-2" />
        <input
          className="bg-transparent outline-none flex-1"
          placeholder="Search collections, items and accounts"
          type="text"
        />
      </div>

      <div className="flex space-x-8 items-center text-gray-300 font-bold">
        <Link href="/explore">
          <span className="cursor-pointer hover:text-white">Explore</span>
        </Link>
        <span className="cursor-pointer hover:text-white">Stats</span>
        <span className="cursor-pointer hover:text-white">Resources</span>
        <span className="cursor-pointer hover:text-white">Create</span>
      </div>

      <div className="items-center flex space-x-3 justify-end">
        {currentAccount ? (
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => disconnectWallet()}
          >
            {currentAccount.slice(0, 4)}...
            {currentAccount.slice(-4)}
          </span>
        ) : (
          <UserCircleIcon
            onClick={connectWallet}
            className="h-10 w-10 text-gray-400  cursor-pointer hover:text-white"
          />
        )}
        <CurrencyEuroIcon className="h-10 w-10 text-gray-400 cursor-pointer hover:text-white" />
      </div>
    </div>
  )
}

export default Header
