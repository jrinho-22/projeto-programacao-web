import { body } from "express-validator";

export const avaliacaoValidation = [
    body('consultaId').notEmpty().withMessage('consulta Id é obrigatorio'),
    body('avaliacao').notEmpty().withMessage('Avaliacao é obrigatorio'),
    body('comentario').notEmpty().withMessage('Comentario é obrigatorio'),
]