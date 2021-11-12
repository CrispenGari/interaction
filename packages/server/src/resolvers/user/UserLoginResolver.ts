import { CtxType } from "../../types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { UserLoginInput } from "./InputTypes";
import { UserObjectType } from "./ObjectTypes";
import { compare } from "bcryptjs";
import { User } from "../../entities/user/User";
import {
  __cookieAccessTokenName__,
  __cookieRefreshTokenName__,
} from "../../constants";
import { generateAccessToken, generateRefreshToken } from "../../auth";

@Resolver()
export class UserLoginResolver {
  @Mutation(() => UserObjectType)
  async login(
    @Arg("input", () => UserLoginInput, { nullable: false })
    { password, username }: UserLoginInput,
    @Ctx() { em, res }: CtxType
  ): Promise<UserObjectType> {
    username = username.trim().toLocaleLowerCase();
    password = password.trim();

    const user = await em.findOne(User, { username });
    if (!user) {
      return {
        error: {
          message: "invalid username",
          field: "username",
        },
      };
    }

    const isValid: boolean = await compare(password, user.password);
    if (!isValid) {
      return {
        error: {
          message: "invalid password",
          field: "password",
        },
      };
    }
    // jwt tokens magic goes here
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    // put them to the cookie
    res.cookie(__cookieRefreshTokenName__, refreshToken);
    res.cookie(__cookieAccessTokenName__, accessToken);
    return {
      user,
    };
  }
}
