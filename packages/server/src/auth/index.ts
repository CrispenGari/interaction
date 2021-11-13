import { sign } from "jsonwebtoken";
import { User } from "../entities/user/User";
import { Response } from "express";
import {
  __cookieAccessTokenName__,
  __cookieRefreshTokenName__,
} from "../constants";
export const generateAccessToken = (user: User): string => {
  return sign(
    { uid: user.uid, username: user.username },
    process.env.ACCESS_TOKEN_SECRETE!,
    {
      expiresIn: "10m",
    }
  );
};
export const generateRefreshToken = (user: User): string => {
  return sign(
    { uid: user.uid, username: user.username, version: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRETE!,
    { expiresIn: "7d" }
  );
};

export const storeRefreshToken = (res: Response, token: string): void => {
  res.cookie(__cookieRefreshTokenName__, token, {
    httpOnly: true,
    // path: "/refresh-token",
  });
};

export const storeAccessToken = (res: Response, token: string): void => {
  res.cookie(__cookieAccessTokenName__, token, {
    httpOnly: true,
    // path: "/refresh-token",
  });
};
