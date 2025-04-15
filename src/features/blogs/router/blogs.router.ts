import { Router, Request, Response } from 'express'
import { blogsRepository } from '../repository/blogs.repository'
import { HttpStatus } from '../../../core/types/http-statuses'
import { blogInputValidations } from '../validation/blog.input-dto.validation'
import { inputValidationResultMiddleware } from '../../../core/middlewares/validation/input-validation-result.middleware'

export const blogsRouter = Router()

blogsRouter.get('', (req, res) => {
  const blogs = blogsRepository.findAll()

  res.status(200).send(blogs)
})

blogsRouter.post(
  '',
  blogInputValidations,
  inputValidationResultMiddleware,
  (req: Request, res: Response) => {
    const newBlog = blogsRepository.create(req.body)
    res.status(HttpStatus.Created).send(newBlog)
  },
)
