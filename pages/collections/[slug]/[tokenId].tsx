import { useEffect, useState } from 'react'
import { useMarketplace, useMetamask } from '@thirdweb-dev/react'
import { DocumentTextIcon, IdentificationIcon } from '@heroicons/react/outline'
import { AuctionListing, DirectListing } from '@thirdweb-dev/sdk'
import { ClockLoader } from 'react-spinners'
import { BigNumber } from 'ethers'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'

import ethLogo from '../../../assets/eth.png'
import { client } from '../../../lib/sanity'
import { useWalletContext } from '../../../context/WalletContext'

type Props = {
  collection: Collection
}

const DetailedToken = ({ collection }: Props) => {
  const [listing, setListing] = useState<AuctionListing | DirectListing>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const tokenId = router.query.tokenId
  const marketplace = useMarketplace(collection?.contractAddress)
  // @ts-ignore
  const { currentAccount } = useWalletContext()
  const connectWallet = useMetamask()

  useEffect(() => {
    if (!marketplace || !tokenId) return
    ;(async () => {
      const listing = await marketplace.getListing(BigNumber.from(tokenId))
      setListing(listing)
    })()
  }, [marketplace, tokenId])

  const buyNow = async () => {
    try {
      setIsLoading(true)
      await connectWallet()
      if (!listing || !marketplace) return
      const tx = await marketplace.buyoutListing(listing.tokenId, 1)
      console.log(tx)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto text-white w-screen">
      <div className="mt-8">
        <div className="grid grid-cols-2">
          <img src={listing?.asset?.image?.toString()} className="rounded-lg" />
          <div>
            <p className="text-blue-500 font-semibold tracking-wide">
              {collection.title}
            </p>
            <p className="text-5xl font-bold mt-4">{listing?.asset.name}</p>
            <div className="mt-4 flex gap-x-3">
              <p>
                Owned by{' '}
                <span className="text-blue-500">
                  {listing?.sellerAddress.slice(0, 4)}...
                  {listing?.sellerAddress.slice(-4)}
                </span>
              </p>
              <p>13.2 views</p>
              <p>309 favourites</p>
            </div>
            <div className="bg-primary-dark h-[175px] mt-8 p-4 rounded-md">
              <p className="text-gray-400 text-sm">Current Price</p>
              <p className="font-bold text-2xl flex items-center space-x-2 mt-3">
                <Image
                  src={ethLogo}
                  alt="eth logo"
                  objectFit="contain"
                  height={30}
                  width={30}
                />
                {listing?.buyoutCurrencyValuePerToken.displayValue}
              </p>
              <div className="flex space-x-4 mt-6">
                <button
                  className="border border-black font-bold text-lg py-2 px-8 bg-blue-500  rounded-lg hover:bg-blue-400"
                  onClick={buyNow}
                >
                  {isLoading ? (
                    <div className="relative right-4 bottom-5">
                      <ClockLoader
                        loading={isLoading}
                        size={40}
                        color="white"
                      />
                    </div>
                  ) : (
                    <span>Buy Now</span>
                  )}
                </button>
                <button className="border border-black font-bold text-lg py-2 px-8 bg-gray-500 rounded-lg hover:bg-gray-400">
                  Make Offer
                </button>
              </div>
            </div>
            <div className="rounded-md overflow-hidden mt-3 border border-black">
              <div className="bg-secondary-dark font-bold p-3 flex items-center space-x-2">
                <DocumentTextIcon className="h-6 w-6" />
                <span>Description</span>
              </div>
              <div className="bg-primary-dark p-3 text-gray-400">
                Created By{' '}
                <span className="text-blue-500">{collection.creator}</span>
              </div>
            </div>
            <div className="rounded-md overflow-hidden mt-3 border border-black">
              <div className="bg-secondary-dark font-bold p-3 flex items-center space-x-2">
                <IdentificationIcon className="h-6 w-6" />
                <span>Details</span>
              </div>
              <div className="flex flex-col gap-y-0 bg-primary-dark">
                <div className="flex p-3">
                  <div className="text-gray-400">Created By </div>
                  <span className="text-blue-500 ml-auto">
                    {collection.creator}
                  </span>
                </div>
                <div className="flex p-3">
                  <div className="text-gray-400">Contract Address</div>
                  <span className="text-blue-500 ml-auto">
                    {collection.contractAddress}
                  </span>
                </div>
                <div className="flex p-3">
                  <div className="text-gray-400">Token Id </div>
                  <span className="text-blue-500 ml-auto">{tokenId}</span>
                </div>
                <div className="flex p-3">
                  <div className="text-gray-400">Description </div>
                  <span className="text-blue-500 ml-auto">
                    {listing?.asset.description || 'None'}
                  </span>
                </div>
                <div className="flex p-3">
                  <div className="text-gray-400">Uri </div>
                  <span className="text-blue-500 ml-auto">
                    {listing?.asset.uri || 'None'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailedToken

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const slug = context.params.slug

  const query = `*[_type == "collections" && slug.current == $slug] {
        id,
        title,
        creator,
        slug,
        description,
        bannerImage,
        profileImage,
        coverImage,
        contractAddress
    }`

  const collection = await client.fetch(query, { slug })

  if (!collection.length) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      collection: collection[0],
    },
  }
}
