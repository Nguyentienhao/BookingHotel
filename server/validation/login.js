const Validator = require('validator');

module.exports = function(data) {
  let errors = {}

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (!Validator.isLength(data.password, {min: 6, max: 30})) {
    errors.password = "password must between 6 and 30 characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}
