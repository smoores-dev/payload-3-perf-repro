import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'
import { CardsBlock } from './CardsBlock'

export const PageContentBlock: Block = {
  slug: 'page-content',
  fields: [
    {
      name: 'hero',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      admin: {
        description: 'Adds extra vertical spacing to make this panel stand out visually.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features({ defaultFeatures }) {
          return defaultFeatures
            .filter(({ key }) => key !== 'blockquote')
            .concat(
              BlocksFeature({
                blocks: [CardsBlock],
              }),
            )
        },
      }),
      required: true,
    },
  ],
  interfaceName: 'PageContentBlockData',
}
