import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { client, urlFor } from '../lib/sanity'

type Props = {
  collections: Collection[]
}

const Explore = ({ collections }: Props) => {
  const router = useRouter()

  return (
    <div className="max-w-7xl mx-auto text-white mt-8">
      <h2 className="text-6xl font-bold text-center">Explore Collections</h2>
      <main className="flex gap-4 mt-8 flex-wrap">
        {collections?.map((collection) => (
          <div
            className="w-[400px] h-[500px] bg-primary-dark rounded-md overflow-hidden cursor-pointer"
            onClick={() =>
              router.push(`/collections/${collection.slug.current}`)
            }
          >
            <img
              src={urlFor(collection.coverImage).url()}
              className="w-full h-2/3 object-cover"
            />
            <div className="flex justify-center flex-col">
              <img
                src={urlFor(collection.profileImage).url()}
                alt="icon"
                className="h-12 w-12 relative bottom-6 mx-auto rounded-full border-primary-dark border-2"
              />
              <div className="text-center px-8 relative bottom-4">
                <p className="font-bold text-md">{collection.title}</p>
                <p>
                  by <span className="text-blue-500">{collection.creator}</span>
                </p>
                <p className="text-gray-400 truncate mt-4">
                  {collection.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}

export default Explore

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collections"] {
        id,
        title,
        creator,
        slug,
        description,
        bannerImage,
        coverImage,
        profileImage,
    }`

  const collections = await client.fetch(query)

  return {
    props: {
      collections,
    },
  }
}
