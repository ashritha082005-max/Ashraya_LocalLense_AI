export function notFound(
  req,
  res
) {
  res.status(404).json({
    success: false,
    message:
      `Route not found: ${req.originalUrl}`
  });
}

export function errorHandler(
  error,
  req,
  res,
  next
) {
  console.error(error);

  res.status(
    error.statusCode || 500
  ).json({
    success: false,
    message:
      error.message ||
      "Internal server error."
  });
}
