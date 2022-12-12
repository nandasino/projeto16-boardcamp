import joi from "joi";

export const gameSchema = joi.object({
  name: joi.string().required().empty(),
  image: joi.string().uri().required().empty(),
  stockTotal: joi.number().min(1).required(),
  categoryId: joi.number().required(),
  pricePerDay: joi.number().min(1).required(),
})