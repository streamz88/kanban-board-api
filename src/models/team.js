import Joi from "joi";

const getTaskSchema = () => {
  return Joi.object({
    title: Joi.string(),
    stageId: Joi.number()
      .positive()
      .required(),
    description: Joi.string()
  });
};

const getUserSchema = () => {
  return Joi.object({
    id: Joi.number()
      .positive()
      .required(),
    name: Joi.object({
      first: Joi.string(),
      last: Joi.number(),
      username: Joi.string()
    }),
    tasks: Joi.array().items(getTaskSchema())
  });
};

const TeamValidationSchema = Joi.object().keys({
  id: Joi.number()
    .positive()
    .required(),
  name: Joi.string().required(),
  users: Joi.array().items(getUserSchema())
});

export default TeamValidationSchema;
