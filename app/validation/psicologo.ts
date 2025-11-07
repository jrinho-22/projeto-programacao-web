import { body, ValidationChain } from "express-validator";

export const psicologoValidation = [
  body("usuario").notEmpty().withMessage("Usuario é obrigatorio"),
  body("senha").notEmpty().withMessage("Password é obrigatorio"),
  body("nome").notEmpty().withMessage("Nome é obrigatorio"),
  body("crp")
    .matches(/^\d{4,6}\/[A-Z]{2}$/)
    .withMessage(
      "CRP deve estar no formato 123456/UF, com UF sendo a sigla do estado"
    ),
  body("especialidadeId").notEmpty().withMessage("Especialidade é obrigatório"),
  body("valorHora").notEmpty().withMessage("Valor Hora é obrigatório"),
  body("email")
    .notEmpty()
    .withMessage("Email é obrigatório")
    .isEmail()
    .withMessage("Formato de email inválido")
    .toLowerCase(),
];
