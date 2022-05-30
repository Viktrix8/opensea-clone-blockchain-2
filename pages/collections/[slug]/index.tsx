import { useMarketplace } from '@thirdweb-dev/react'
import { AuctionListing, DirectListing } from '@thirdweb-dev/sdk'
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'

import { client, urlFor } from '../../../lib/sanity'
import ethLogo from '../../../assets/eth.png'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  collection: Collection
}

const CollectionDetail = ({ collection }: Props) => {
  const [listings, setListings] = useState<(AuctionListing | DirectListing)[]>()
  const marketplace = useMarketplace(collection?.contractAddress)

  useEffect(() => {
    if (!marketplace) return
    ;(async () => {
      const listings = await marketplace.getAllListings()
      setListings(listings)
    })()
  }, [marketplace])

  return (
    <div className="w-screen text-white min-h-screen">
      <img
        src={urlFor(collection.bannerImage).url()}
        alt="banner"
        className="w-full h-[400px] object-cover"
      />

      <main className="mx-auto max-w-7xl h-full">
        <img
          src={urlFor(collection.profileImage).url()}
          alt="icon"
          className="h-42 w-42 rounded-md border-2 border-primary-dark relative bottom-40"
        />

        <div className="relative bottom-32">
          <h4 className="text-4xl font-semibold tracking-wide">
            {collection.title}
          </h4>
          <p className="text-md mt-2">
            By <span className="font-bold">{collection.creator}</span>
          </p>
          <p className="mt-4 text-gray-400">{collection.description}</p>
          <div className="flex flex-wrap gap-4 mt-4">
            {listings?.map((listing) => (
              <Link
                href={`/collections/${
                  collection.slug.current
                }/${listing.tokenId.toString()}`}
              >
                <div
                  key={listing.tokenId.toString()}
                  className="w-[300px] h-[400px] bg-primary-dark rounded-md"
                >
                  <img
                    src={String(listing?.asset?.image)}
                    alt="nft image"
                    className="h-[80%] mx-auto"
                  />
                  <div className="px-4 py-2 flex">
                    <div>
                      <p className="text-xs text-gray-400">
                        {collection.title}
                      </p>
                      <p className="font-bold">{listing.asset.name}</p>
                    </div>
                    <div className="ml-auto">
                      <p className="text-xs text-gray-400">Price</p>
                      <p className="font-bold text-sm flex items-center mt-1">
                        <Image
                          src={ethLogo}
                          width={20}
                          height={20}
                          objectFit="contain"
                        />
                        {listing.buyoutCurrencyValuePerToken.displayValue}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default CollectionDetail

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
