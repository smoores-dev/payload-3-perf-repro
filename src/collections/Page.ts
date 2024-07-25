import type { CollectionConfig, CollectionAfterChangeHook } from 'payload'
import type { Page as PageType } from '@/payload-types'
import { revalidatePath } from 'next/cache'
import { PageContentBlock } from '../blocks/PageContent'
import { draftMode } from 'next/headers'

const afterChangeHook: CollectionAfterChangeHook<PageType> = ({ doc }) => {
  if (typeof doc.path === 'string') revalidatePath(doc.path)
}

export const Page: CollectionConfig = {
  slug: 'page',
  access: {
    read: ({ req }) => {
      // If there is a user logged in,
      // let them retrieve all documents
      if (req.user || draftMode().isEnabled) return true

      // If there is no user,
      // restrict the documents that are returned
      // to only those where `_status` is equal to `published`
      return {
        _status: {
          equals: 'published',
        },
      }
    },
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  admin: { useAsTitle: 'header' },
  fields: [
    {
      name: 'header',
      type: 'text',
    },
    {
      name: 'panels',
      type: 'blocks',
      blocks: [PageContentBlock],
      minRows: 1,
      required: true,
    },
    {
      name: 'path',
      type: 'text',
      validate: (value: string) =>
        /^\/(?!.*\/\/)([/a-zA-Z0-9.\-_~!$&'()*+,;=:@]*)$/.test(value) ||
        'Must be a valid URL path, beginning with `/`',
      required: true,
    },
  ],
  hooks: {
    afterChange: [afterChangeHook],
  },
}
