export default {
  name: 'collections',
  title: 'Collections',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'creator',
      title: 'Creator',
      type: 'string'
    },
    {
      name: 'bannerImage',
      title: 'Banner image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'profileImage',
      title: 'Profile image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'contractAddress',
      title: 'Contract address',
      type: 'string',
    }
  ]
}
