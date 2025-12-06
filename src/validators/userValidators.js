import { body, param } from 'express-validator';

export const validateCreateUser = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email')
    .normalizeEmail()
    .isEmail().withMessage('Valid email is required'),
  body('age')
    .optional()
    .isInt({ min: 0 }).withMessage('Age must be a non-negative integer')
];

export const validateUpdateUser = [
  param('id').isUUID().withMessage('Invalid user id'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email')
    .optional()
    .normalizeEmail()
    .isEmail().withMessage('Email must be valid'),
  body('age')
    .optional()
    .isInt({ min: 0 }).withMessage('Age must be a non-negative integer')
];

export const validateUserIdParam = [
  param('id').isUUID().withMessage('Invalid user id')
];
