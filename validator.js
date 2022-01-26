exports.validateBody = function (schema) {
  return (req, _res, next) => {
    const { body } = req;
    const { error } = schema.validate(body, {});
    if (error) {
      next(error);
    }
    next();
  };
};
