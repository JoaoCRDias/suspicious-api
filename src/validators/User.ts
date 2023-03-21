import Joi from "joi";

export const createUserValidator = Joi.object().keys({
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^\d{11}$/)
    .required(),
  birthDate: Joi.date().required().min("1990-1-1").iso(),
  password: Joi.string().required()
});
