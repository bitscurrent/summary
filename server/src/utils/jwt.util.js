import jwt from "jsonwebtoken";
import { secretKey } from "../../constant.js";


const generateJWT = (user) => {
  if (!secretKey) {
    throw new Error("Secret key is undefined or not provided");
  }

  const jwtToken = jwt.sign({ email: user.email }, secretKey, {
    expiresIn: "7d",
  });

  // Decode the token to inspect its contents
  const decodedToken = jwt.decode(jwtToken);

  return jwtToken;
};

export default generateJWT;