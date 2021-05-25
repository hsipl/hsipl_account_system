const apiErrorHandler = (err, req, res, next) => {
  res.status(err.statusCode).json({ msg: err.msg });
};

module.exports = apiErrorHandler