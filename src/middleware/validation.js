exports.validator = (schema) => (req, res, next) => {
  try {
    const { body, params, query } = schema;

    // console.log("=====req.body=====", req.body);
    // console.log("=====req.params=====", req.params);

    let errorMsg = [];
    for (let data in schema) {
      console.log("=====data=====", data);
      const { error, value } = params
        .prefs({ abortEarly: false })
        .validate(req.params);

      if (error) {
        const message = error.details.map((ele) => ele.message).join(", ");

        errorMsg.push(message);

        // res.status(404).json({ message });
      } else {
        next();
      }
    }

    console.log("=====errorMsg=====", errorMsg);
  } catch (err) {
    console.log("=====err=====", err);
  }
};
