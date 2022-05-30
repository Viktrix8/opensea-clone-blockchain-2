import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className="text-white">
      <Head>
        <title>Opensea Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className='bg-[url("https://openseauserdata.com/files/spacedrip_launch_image_4x3.jpg")] bg-no-repeat bg-cover w-screen h-[80vh]'>
          <div className="w-full h-full bg-[rgba(0,0,0,0.85)]">
            <div className="lg:grid-cols-2 grid-cols-1 grid h-full mx-auto max-w-7xl justify-end items-center gap-[150px]">
              <div>
                <h1 className="text-6xl font-bold">
                  Discover, collect, and sell extraordinary NFTs
                </h1>
                <p className="text-2xl text-gray-400 my-8">
                  OpenSea is the world's first and largest <br /> NFT
                  marketplace
                </p>

                <div className="flex items-center space-x-4">
                  <Link href="/explore">
                    <button
                      type="button"
                      className="text-white border border-black bg-blue-500 rounded-lg px-12 py-[12px] font-bold hover:bg-blue-400"
                    >
                      Explore
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="text-white border border-black bg-primary-dark rounded-lg px-12 py-[12px] font-bold hover:bg-gray-500"
                  >
                    Create
                  </button>
                </div>
              </div>

              <div className="w-full rounded-xl overflow-hidden flex flex-col justify-center bg-primary-dark h-min">
                <img
                  src="https://openseauserdata.com/files/spacedrip_launch_image_4x3.jpg"
                  className="rounded-t-xl"
                />
                <div className="p-2 flex space-x-2 items-center">
                  <img
                    src="https://openseauserdata.com/files/spacedrip_launch_creator_image.svg"
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="font-bold">
                      RTFKT Space Drip x Nike Air Force 1
                    </p>
                    <p className="text-sm">RTFKT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
