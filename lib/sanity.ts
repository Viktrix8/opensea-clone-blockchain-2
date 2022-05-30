import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const settings = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: 'v1',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  dataset: 'production',
}

export const client = sanityClient(settings)

const builder = imageUrlBuilder(client)

export const urlFor = (src: any) => builder.image(src)
