import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import {
  __cookieAccessTokenName__,
  __cookieRefreshTokenName__,
} from "../constants";
import { User } from "../entities/user/User";

import { generateRefreshToken, generateAccessToken } from "../auth";
import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "../mikro-orm.config";

export const authenticationMiddlewareFn = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { em } = await MikroORM.init(mikroOrmConfig);
  const refreshToken = req.cookies[__cookieRefreshTokenName__];
  const accessToken = req.cookies[__cookieAccessTokenName__];
  if (!refreshToken && !accessToken) {
    return next();
  }
  try {
    const payload = verify(accessToken, process.env.ACCESS_TOKEN_SECRETE!);
    req.uid = (payload as any).uid;
    return next();
  } catch {}

  let data;

  try {
    data = verify(refreshToken, process.env.REFRESH_TOKEN_SECRETE!) as any;
  } catch {
    return next();
  }
  const user = await em.findOne(User, {
    uid: data.uid,
  });
  if (!user || user.tokenVersion !== data.tokenVersion) {
    return next();
  }
  res.cookie(__cookieAccessTokenName__, generateRefreshToken(user));
  res.cookie(__cookieRefreshTokenName__, generateAccessToken(user));
  req.uid = user.uid;
  return next();
};
