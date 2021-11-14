const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user_id: {
    type: String,
    require: true
  },
  
  content: {
    type: String,
  },

  media: {
    type: String,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },

  like: {
    type: Array,
    default: []
  },

});

const postModel = mongoose.model('post', postSchema);

module.exports = postModel;
