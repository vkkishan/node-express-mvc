exports.validator = (schema) => (req, res, next) => {
  try {
    let errorMsg = [];
    for (let data in schema) {
      const { error, value } = schema[data]
        .validate(req[data], { abortEarly: false });
      if (error) {
        const message = error.details.map((ele) => ele.message).join(", ");
        errorMsg.push(message);
      } else {
        next();
      }
    }

    res.status(400).json({ success: false, message: errorMsg.join(", ") });
  } catch (err) {
    console.log("=====err=====", err);
  }
};
