exports.validator = (schema) => (req, res, next) => {
  try {
    const { body, params, query } = schema;

    const { error, value } = body.prefs({ abortEarly: false }).validate(
      req.body
      //     {
      //   username: "abc",
      //   birth_year: 1994,
      // }
    );

    if (error) {
      const message = error.details.map((ele) => ele.message).join(", ");
      res.status(404).json({ message });
    } else {
      next();
    }
  } catch (err) {
    console.log("=====err=====", err);
  }
};
