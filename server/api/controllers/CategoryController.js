const Category = require('../models/category');
const errorHandler = require('../utilities/errorHandler');

exports.get_categories = function (req, res, next) {
    const query = Category.find();
    query.sort({ created_at: -1 });
    query.exec((err, blogs) => {
        if (err) return next(err);
        if (blogs == null) {
            return errorHandler.handleAPIError(`Blogs not found!`, next);
        }
        return res.json(blogs);
    });
}