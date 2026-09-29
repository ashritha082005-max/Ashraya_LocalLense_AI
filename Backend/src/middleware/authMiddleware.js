import jwt from "jsonwebtoken";

export function protect(
  req,
  res,
  next
) {
  try {
    const header =
      req.headers.authorization;

    if (!header) {
      return next();
    }

    const token =
      header.startsWith("Bearer ")
        ? header.split(" ")[1]
        : null;

    if (!token) {
      return next();
    }

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message:
        "Invalid authentication token."
    });
  }
}