const mongoose = require('mongoose');
const { framework } = require('passport');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  confirm_password: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true
  }
},{
  timestamps: true
}
);

module.exports = mongoose.model('users', userSchema); 
