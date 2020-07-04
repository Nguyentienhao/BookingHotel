const Validator = require('validator');

module.exports = function (data) {
  let errors = {}

  if (Validator.isEmpty(data.number_phone) === true) {
    errors.number_phone = "phone number field is required";
  }

  if (Validator.isEmpty(data.email) === true) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "password must between 6 and 30 characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }

  if (Validator.isEmpty(data.confirm_password)) {
    errors.email = "confirm_password is required";
  }

  if (!Validator.equals(data.password, data.confirm_password)) {
    errors.confirm_password = "Password must match";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}
