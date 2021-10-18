const { Schema, model } = require('mongoose'); //importing things that are exported by mongoose

const bookSchema = new Schema(
  {
    title: String,
    description: String,
    author: String,
    rating: Number
  },
  {
    timestamps: true
  }
);
 
module.exports = model('Book', bookSchema); // Book is a name for the model