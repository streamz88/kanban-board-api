import Joi from "joi";
import TeamValidationSchema from "../models/team";

("use strict");

let validators = {
  Team: { TeamValidationSchema }
};

const scopeExists = (validator, scope) => {
  return Object.keys(validator.scopes).find(key => key === scope) != undefined;
};

const getSchema = (model, scope) => {
  let validator = validators[model];
  if (!validator) {
    throw new Error("Validator does not exist");
  }

  if (validator.scopes) {
    if (scope) {
      if (scope) {
        if (!scopeExists(validator, scope)) {
          throw new Error(
            `Scope ${scope} does not exist in ${model} validator`
          );
        } else {
          return validator.scopes[scope];
        }
      }
    } else {
      return validator.scopes.default;
    }
  } else {
    return validator;
  }
};

const validate = (model, object, scope) => {
  return Joi.validate(object, getSchema(model, scope), { allowUnknown: true });
};

const ValidatonMiddleware = (model, scope) => {
  return (req, res, next) => {
    const validationResult = validate(model, req.body, scope);
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    } else {
      next();
    }
  };
};

export default ValidatonMiddleware;
