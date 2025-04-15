import { Router, Request, Response } from 'express'
import { blogsRepository } from '../repository/blogs.repository'
import { HttpStatus } from '../../../core/types/http-statuses'
import { blogInputValidations } from '../validation/blog.input-dto.validation'
import { inputValidationResultMiddleware } from '../../../core/middlewares/validation/input-validation-result.middleware'
import { authAdminMiddleware } from '../../../auth/auth-admin-middleware'

export const blogsRouter = Router()

blogsRouter.get('', (req, res) => {
  const blogs = blogsRepository.findAll()

  res.status(200).send(blogs)
})

blogsRouter.get('/:id', (req: Request, res: Response) => {
  const blog = blogsRepository.findById(req.params.id)

  if (!blog) {
    res.sendStatus(HttpStatus.NotFound)
    return
  }

  res.send(blog)
})

blogsRouter.post(
  '',
  authAdminMiddleware,
  blogInputValidations,
  inputValidationResultMiddleware,
  (req: Request, res: Response) => {
    const newBlog = blogsRepository.create(req.body)
    res.status(HttpStatus.Created).send(newBlog)
  },
)

blogsRouter.delete(
  '/:id',
  authAdminMiddleware,
  (req: Request, res: Response) => {
    const id = req.params.id
    const blog = blogsRepository.findById(id)

    if (!blog) {
      res.sendStatus(HttpStatus.NotFound)
      return
    }

    blogsRepository.delete(id)
    res.sendStatus(HttpStatus.NoContent)
  },
)

blogsRouter.put('/:id', authAdminMiddleware, (req: Request, res: Response) => {
  const id = req.params.id

  const blog = blogsRepository.findById(id)

  if (!blog) {
    res.sendStatus(HttpStatus.NotFound)
    return
  }

  blogsRepository.update(id, req.body)
  res.sendStatus(HttpStatus.NoContent)
})
