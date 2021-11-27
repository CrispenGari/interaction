import { Request, Response, Router } from "express";
import { __cookieRefreshTokenName__ } from "../constants";
import { verify } from "jsonwebtoken";
import {
  storeRefreshToken,
  generateAccessToken,
  generateRefreshToken,
} from "../auth";
import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "../mikro-orm.config";
import { User } from "../entities/user/User";
const router: Router = Router();

router.post("/refresh-token", async (req: Request, res: Response) => {
  const { em } = await MikroORM.init(mikroOrmConfig);
  const token = req.cookies[__cookieRefreshTokenName__];
  if (!token) {
    return res.status(401).send({
      code: 401,
      message: "UnAuthorized",
      ok: false,
      accessToken: "",
    });
  }
  let payload: any = null;
  try {
    let tokenToVerify: string =
      String(token).split(" ").length > 1 ? token.split(" ")[1] : token;
    payload = verify(tokenToVerify, process.env.REFRESH_TOKEN_SECRETE!);
  } catch (error) {
    return res.status(403).send({
      code: 403,
      message: "Forbidden",
      ok: false,
      accessToken: "",
    });
  }

  const user = await em.findOne(User, {
    uid: payload.uid,
  });

  console.log("user from routes index.ts", user);

  if (!user) {
    return res.status(403).send({
      code: 403,
      message: "Forbidden",
      ok: false,
      accessToken: "",
    });
  }

  console.log("payload from routes index.ts", payload);
  if (user.tokenVersion !== payload.version) {
    return res.status(403).send({
      code: 403,
      message: "Forbidden",
      ok: false,
      accessToken: "",
    });
  }
  storeRefreshToken(res, generateRefreshToken(user));
  return res.status(200).send({
    code: 200,
    message: "ok",
    ok: true,
    accessToken: generateAccessToken(user),
  });
});

export default router;
