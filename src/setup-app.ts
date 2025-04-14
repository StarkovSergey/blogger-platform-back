import express, { Express } from 'express'
import { blogsRouter } from './features/blogs/router/blogs.router'
import { postsRouter } from './features/posts/router/posts.router'
import { testingRouter } from './features/testing/routers/testing.router'

export const setupApp = (app: Express) => {
  app.use(express.json())

  app.get('/', (req, res) => {
    res.status(200).send('hello world!')
  })

  app.use('/blogs', blogsRouter)
  app.use('/posts', postsRouter)
  app.use('/testing', testingRouter)
  return app
}
