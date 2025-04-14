import { Router } from 'express'
import { blogsRepository } from '../repository/blogs.repository'

export const blogsRouter = Router()

blogsRouter.get('', (req, res) => {
  const blogs = blogsRepository.findAll()

  res.status(200).send(blogs)
})
