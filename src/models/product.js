'use strict'

const moongose = require('moongose')
const Schema = moongose.Schema

const schema = new Schema({
  title: {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      index: true,
      unique: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    active: {
      type: Boolean,
      required: true,
      default: true
    },
    tags: [
      {
        type: String,
        required: true
      }
    ]
  }
})

module.exports = moongose.model('Product', schema)
