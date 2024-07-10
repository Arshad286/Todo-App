import jwt from "jsonwebtoken";

export const authenticationToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({
      message: "Authorization denied",
    });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    console.log("Token verified successfully, user:", user);
    req.user = user;
    next();
  });
};
