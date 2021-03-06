/* eslint-disable comma-dangle */
const { Articles, Comments } = require('../models/models');

exports.getArticles = (req, res) => {
  Articles.find()
    .then((articles) => {
      if (articles.length === 0) res.status(404).json({ message: 'no articles ah ah ah!' });
      res.json({
        articles,
      });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

exports.getArticleComments = (req, res) => {
  Comments.find({ belongs_to: req.params.article_id })
    .then((comments) => {
      if (comments.length === 0) res.status(404).json({ message: 'no comments ah ah ah!' });
      res.status(200).json({
        comments,
      });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

exports.putAlterVotes = (req, res) => {
  let voteValue = 0;
  if (req.query.vote === 'up') voteValue = 1;
  if (req.query.vote === 'down') voteValue = -1;

  Articles.findOneAndUpdate(
    { _id: req.params.article_id },
    { $inc: { votes: voteValue } },
    { new: true }
  )
    .then((article) => {
      res.status(200).json(article);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

exports.postNewComment = (req, res) => {
  const newComment = new Comments({
    belongs_to: req.params.article_id,
    body: req.body.body || 'empty',
  });
  newComment
    .save((err, comment) => {
      if (err) res.json(err);
      res.json({ newComment: comment });
    })
    .catch((err) => {
      res.json({ message: 'could not create', err });
    });
};

exports.getArticleById = (req, res) => {
  Articles.findById(req.params.article_id)
    .then((article) => {
      if (!article) res.status(404).json({ message: 'no article found!' });
      res.status(200).json({
        article,
      });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};
