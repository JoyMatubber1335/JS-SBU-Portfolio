import type { RequiredDataFromCollectionSlug } from 'payload'

// Used for pre-seeded content so that the homepage is not empty
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  hero: {
    type: 'teamImpact',
    richText: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'In Need of Highly Skilled Developers at a Lower Cost?',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h1',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'We provide you with a dedicated remote development team with some of the top developers in Bangladesh!',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    links: [
      {
        link: {
          type: 'custom',
          appearance: 'default',
          label: "Let's talk development",
          url: '/contact',
        },
      },
    ],
    // Note: You'll need to upload an image via the Payload admin panel
    // and then assign its ID to this hero after the first run.
    // For now, we'll set it to null and Payload will handle this in the UI
    media: null,
  },
  meta: {
    description: 'Remote development teams from Bangladesh at affordable costs.',
    title: 'JS-SBU Portfolio - Expert Development Teams',
  },
  title: 'Home',
  layout: [],
}
