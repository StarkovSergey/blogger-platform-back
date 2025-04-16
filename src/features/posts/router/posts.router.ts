import { Router } from 'express'
import {
  getPostsController,
  getPostByIdController,
  createPostController,
  deletePostController,
  updatePostController,
} from '../controllers/posts.controllers'
import { authAdminMiddleware } from '../../../auth/auth-admin-middleware'
import {
  blogIdValidation,
  postInputValidations,
} from '../validation/post.input-dto.validation'
import { inputValidationResultMiddleware } from '../../../core/middlewares/validation/input-validation-result.middleware'

export const postsRouter = Router()

postsRouter.get('', blogIdValidation, getPostsController)

postsRouter.get('/:id', blogIdValidation, getPostByIdController)

postsRouter.post(
  '',
  authAdminMiddleware,
  blogIdValidation,
  postInputValidations,
  inputValidationResultMiddleware,
  createPostController,
)

postsRouter.delete(
  '/:id',
  authAdminMiddleware,
  blogIdValidation,
  deletePostController,
)

postsRouter.put(
  '/:id',
  authAdminMiddleware,
  blogIdValidation,
  postInputValidations,
  inputValidationResultMiddleware,
  updatePostController,
)
