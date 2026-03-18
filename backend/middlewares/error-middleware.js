const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Error From Backend";
  const extraDetails = err.extraDetails || "Internal Server Error";
  return res.status(statusCode).json({ message, extraDetails });
};

export default errorMiddleware;
