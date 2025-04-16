import { Router } from 'express'
import {
  getPostsController,
  getPostByIdController,
  createPostController,
  deletePostController,
  updatePostController,
} from '../controllers/posts.controllers'
import { authAdminMiddleware } from '../../../auth/auth-admin-middleware'
import { postInputValidations } from '../validation/post.input-dto.validation'
import { inputValidationResultMiddleware } from '../../../core/middlewares/validation/input-validation-result.middleware'

export const postsRouter = Router()

postsRouter.get('', getPostsController)

postsRouter.get('/:id', getPostByIdController)

postsRouter.post(
  '',
  authAdminMiddleware,
  postInputValidations,
  inputValidationResultMiddleware,
  createPostController,
)

postsRouter.delete('/:id', authAdminMiddleware, deletePostController)

postsRouter.put(
  '/:id',
  authAdminMiddleware,
  postInputValidations,
  inputValidationResultMiddleware,
  updatePostController,
)
