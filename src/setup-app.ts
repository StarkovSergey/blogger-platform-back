import express, { Express } from 'express'
import { blogsRouter } from './features/blogs/router/blogs.router'
import { postsRouter } from './features/posts/router/posts.router'
import { testingRouter } from './features/testing/routers/testing.router'
import { Paths } from './core/paths/paths'

export const setupApp = (app: Express) => {
  app.use(express.json())

  app.get(Paths.ROOT, (req, res) => {
    res.status(200).send('hello world!')
  })

  app.use(Paths.BLOGS, blogsRouter)
  app.use(Paths.POSTS, postsRouter)
  app.use(Paths.TESTING, testingRouter)
  return app
}
