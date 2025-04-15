import { body } from 'express-validator'

const nameValidation = body('name')
  .isString()
  .withMessage('Name should be a string')
  .trim()
  .notEmpty()
  .withMessage('Name should not be empty')
  .isLength({ min: 1, max: 15 })
  .withMessage('Name should be less than 15 characters')

const descriptionValidation = body('description')
  .isString()
  .withMessage('Description should be a string')
  .trim()
  .notEmpty()
  .withMessage('Description should not be empty')
  .isLength({ min: 1, max: 500 })
  .withMessage('Description should be less than 500 characters')

const websiteUrlValidation = body('websiteUrl')
  .isString()
  .withMessage('Website URL should be a string')
  .trim()
  .notEmpty()
  .withMessage('Website URL should not be empty')
  .isLength({ min: 1, max: 100 })
  .withMessage('Website URL should be less than 100 characters')
  .isURL()
  .withMessage('Website URL should be a valid URL')

export const blogInputValidations = [
  nameValidation,
  descriptionValidation,
  websiteUrlValidation,
]
