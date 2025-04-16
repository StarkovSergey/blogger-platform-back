import { body } from 'express-validator'
import { blogsRepository } from '../../blogs/repository/blogs.repository'

const titleValidation = body('title')
  .isString()
  .withMessage('Title should be a string')
  .trim()
  .notEmpty()
  .withMessage('Title should not be empty')
  .isLength({ min: 1, max: 30 })
  .withMessage('Title should be less than 30 characters')

const shortDescriptionValidation = body('shortDescription')
  .isString()
  .withMessage('Short description should be a string')
  .trim()
  .notEmpty()
  .withMessage('Short description should not be empty')
  .isLength({ min: 1, max: 100 })
  .withMessage('Short description should be less than 100 characters')

const contentValidation = body('content')
  .isString()
  .withMessage('Content should be a string')
  .trim()
  .notEmpty()
  .withMessage('Content should not be empty')
  .isLength({ min: 1, max: 1000 })
  .withMessage('Content should be less than 1000 characters')

const blogIdValidation = body('blogId')
  .isString()
  .withMessage('Blog ID should be a string')
  .trim()
  .notEmpty()
  .withMessage('Blog ID should not be empty')
  .custom(async (blogId) => {
    const blog = await blogsRepository.findById(blogId)
    return Boolean(blog)
  })
  .withMessage('Blog not found')

export const postInputValidations = [
  titleValidation,
  shortDescriptionValidation,
  contentValidation,
  blogIdValidation,
]

export const blogIdValidation = body('blogId')
  .isString()
  .withMessage('Blog ID should be a string')
  .trim()
  .notEmpty()
  .withMessage('Blog ID should not be empty')
  .custom(async (blogId) => {
    const blog = await blogsRepository.findById(blogId)
    return Boolean(blog)
  })
  .withMessage('Blog not found')
