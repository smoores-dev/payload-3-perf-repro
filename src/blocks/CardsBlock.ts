import { Block } from 'payload'

export const CardsBlock: Block = {
  slug: 'cards',
  labels: {
    singular: 'Cards',
    plural: 'Cards blocks',
  },
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'horizontal',
      options: ['horizontal', 'vertical', 'grid'],
    },
    {
      name: 'cards',
      type: 'array',
      fields: [
        {
          name: 'cardColor',
          type: 'select',
          defaultValue: 'skyBlue',
          options: ['white', 'skyBlue', 'blue', 'blue-darker', 'blue-darkest', 'navy', 'tan'],
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
      ],
    },
  ],
  interfaceName: 'CardsBlockData',
}
