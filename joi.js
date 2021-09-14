const Joi = require('joi');

const schema = Joi.object({
  username: Joi.string().alphanum().min(5).max(10)
    .required(),
  password: Joi.string().min(8).max(20).required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password')),
  email: Joi.string().email().required(),
});

const validationSchema = schema.validate({
  username: 'harry',
  password: 'supersecretpassword',
  repeatPassword: 'supersecretpassword',
  email: 'harry@potter.com',
});

if (validationSchema.error != undefined) {
  console.log(`Validation error: ${validationSchema.error.message}`);
} else {
  console.log('validasi berhasil');
}

// if (validationSchema.error) {
//   console.log(`Validation error: ${validationSchema.error.message}`);
// } else {
//   console.log('Validasi berhasil');
// }
