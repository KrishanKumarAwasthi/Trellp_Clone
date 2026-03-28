const validateRequest = (schema) => {
  return (req, res, next) => {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params
    });
    next();
  };
};

module.exports = validateRequest;
