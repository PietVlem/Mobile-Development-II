const Post = require('../models/post');
const Category = require('../models/category');
const errorHandler = require('../utilities/errorHandler');

/*
Get all posts
*/
exports.get_posts = function (req, res, next) {
  const query = Post.find().populate('_category').populate('blogs');
  query.sort({ created_at: -1 });
  query.exec((err, posts) => {
    if (err) return errorHandler.handleAPIError(500, err.message || 'Some error occurred while retrieving posts', next);
    if (!posts) {
      return errorHandler.handleAPIError(404, `Posts not found`, next);
    }
    return res.json(posts);
  });
}

/*
Get a certain post
*/
exports.get_post = function (req, res, next) {
  const id = req.params.postId;
  const query = Post.findById(id);
  query.exec((err, post) => {
    if (err) return errorHandler.handleAPIError(500, `Could not get the post with id: ${id}`, next);
    if (!post) {
      return errorHandler.handleAPIError(404, `Post not found with id: ${id}`, next);
    }
    return res.json(post);
  });
}

/*
Create a post
*/
exports.create_post = function (req, res, next) {
  if (!req.body || !req.body.title || !req.body.synopsis || !req.body.body || !req.body._category) {
      return errorHandler.handleAPIError(400, `Post must have a title, synopsis, body and _category`, next);
  }
  const newPost = new Post({
      title: req.body.title,
      synopsis: req.body.synopsis,
      prologue: req.body.prologue,
      body: req.body.body,
      postImage: req.file.path,
      _blog: '5b42070bc822e77affae18ef',
      _category: req.body._category,
      _user: req.body._user,
  });
  newPost.save((err, post) => {
      if (err) return errorHandler.handleAPIError(500, `Could not save the new post`, next);
      res.status(201).json(post);
  });
}

/*
Delete a Post
*/
exports.delete_post = function (req, res, next) {
  const id = req.params.postId;
  Post.findByIdAndRemove(id)
    .then(post => {
      if (!post) {
        return errorHandler.handleAPIError(404, `Post not found with id: ${id}`, next);
      }
      res.status(200).json({ action: 'DELETE', message: `Post width id: ${id} deleted successfully!` });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return errorHandler.handleAPIError(404, `Post not found with id: ${id}`, next);
      }
      return errorHandler.handleAPIError(500, `Could not delete post with id: ${id}`, next);
    });
}