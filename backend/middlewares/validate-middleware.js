const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (e) {
    const status = 422;
    const message = "Validation Failed.";
    const extraDetails = "Fill the details correctly.";
    if (e.errors && e.errors.length > 0) {
      extraDetails = e.errors[0].message;
    }
    const error = { status, message, extraDetails };
    console.log("Error: ", error);
    next(error);
  }
};

export default validate;
