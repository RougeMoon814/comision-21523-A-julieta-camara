import { body } from "express-validator";

export const createTaskSchema = [
    body('title')
        .isString().withMessage('Debe ser string')
        .notEmpty().withMessage('No debe ser vacio'),
    body('description')
        .optional()
        .isString().withMessage('Debe ser string'),
    body('poster')
        .optional({nullable: true})
        .isURL().withMessage('Ingrese una url valida')
,
]

export const editTaskSchema = [
    body('title')
        .optional()
        .isString().withMessage('Debe ser string')
        .notEmpty().withMessage('No debe ser vacio'),
    body('description')
        .optional()
        .isString().withMessage('Debe ser string'),
    body('poster')
        .optional({nullable: true})
        .isURL().withMessage('Ingrese una url valida')
        .notEmpty().withMessage('No debe ser vacio'),
]