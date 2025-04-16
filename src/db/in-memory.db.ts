import { BlogViewModel } from '../features/blogs/types/blogs.types'
import { PostViewModel } from '../features/posts/types/posts.types'

export const db: {
  blogs: BlogViewModel[]
  posts: PostViewModel[]
} = {
  blogs: [
    {
      id: '1',
      name: 'React',
      description:
        'React is a JavaScript library for building user interfaces.',
      websiteUrl: 'https://react.dev',
    },
    {
      id: '2',
      name: 'Node.js',
      description: 'Node.js is a runtime for JavaScript and TypeScript.',
      websiteUrl: 'https://nodejs.org',
    },
    {
      id: '3',
      name: 'Express',
      description: 'Express is a web framework for Node.js.',
      websiteUrl: 'https://expressjs.com',
    },
  ],
  posts: [],
}
