type Collection = {
  id: string
  title: string
  creator: string
  slug: Slug
  description: string
  bannerImage: Image
  coverImage: Image
  profileImage: Image
  contractAddress: string
}

type Image = {
  asset: {
    _ref: string
    _type: string
  }
  type: string
}

type Slug = {
  current: string
}

type Token = {
  asset: {
    name: string
    description: string
    image: string
    id: BigNumber
  }
  buyoutCurrencyValuePerToken: {
    displayValue: string
  }
  tokenId: BigNumber
}
