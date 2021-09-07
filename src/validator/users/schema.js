const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.String().required(),
  fullname: Joi.string().required(),
});

module.exports = UserPayloadSchema;
