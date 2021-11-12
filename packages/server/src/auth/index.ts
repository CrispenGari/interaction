import { sign } from "jsonwebtoken";
import { User } from "../entities/user/User";
export const generateAccessToken = (user: User): string => {
  return sign(
    { uid: user.uid, username: user.username },
    process.env.ACCESS_TOKEN_SECRETE!
  );
};
export const generateRefreshToken = (user: User): string => {
  return sign(
    { uid: user.uid, username: user.username, version: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRETE!
  );
};
