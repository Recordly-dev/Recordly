const asyncWrapper = (asyncFunc) => async (req, res, next) => {
  try {
    await asyncFunc(req, res, next);
  } catch (err) {
    console.error({
      err,
      url: req.url,
      query: req.query,
      params: req.params,
      body: req.body,
      headers: req.headers,
    });
    next(err);
  }
};

export default { asyncWrapper };
