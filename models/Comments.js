const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const CommentSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  belongs_to: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  created_at: {
    type: Number,
    default: new Date().getTime(),
  },
  votes: {
    type: Number,
    default: 0,
  },
  created_by: {
    type: String,
    required: true,
    default: 'northcoder',
  },
});

module.exports = mongoose.model('Comments', CommentSchema);
