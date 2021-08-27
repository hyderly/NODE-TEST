import jwt from "jsonwebtoken";

const generateWebToken = (id) => {
  const token = jwt.sign({ id }, "abc123", { expiresIn: "24h" });

  return token;
};

export default generateWebToken;
