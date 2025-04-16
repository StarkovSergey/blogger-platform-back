import { Router } from 'express'
import { blogInputValidations } from '../validation/blog.input-dto.validation'
import { inputValidationResultMiddleware } from '../../../core/middlewares/validation/input-validation-result.middleware'
import { authAdminMiddleware } from '../../../auth/auth-admin-middleware'

import {
  getBlogByIdController,
  createBlogController,
  deleteBlogController,
  updateBlogController,
  getBlogsController,
} from './controllers/blogs.controllers'

export const blogsRouter = Router()

blogsRouter.get('', getBlogsController)

blogsRouter.get('/:id', getBlogByIdController)

blogsRouter.post(
  '',
  authAdminMiddleware,
  blogInputValidations,
  inputValidationResultMiddleware,
  createBlogController,
)

blogsRouter.delete('/:id', authAdminMiddleware, deleteBlogController)

blogsRouter.put('/:id', authAdminMiddleware, updateBlogController)
