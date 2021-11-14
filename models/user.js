const mongoose = require("mongoose");
// const bcrypt = require('bcrypt');
//const valid = require('validator');

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
    //validate: [] 
  },
  hashPassword: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default:''
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  // token: {
  //   type: String,
  //   default: ''
  // },
  
  friend: {
    type:Number,
    enum: [1, 2, 3],
  }
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
