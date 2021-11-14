import { CtxType } from "../../types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { UserRegisterInput } from "./InputTypes";
import { UserObjectType } from "./ObjectTypes";
import { v4 as uuid_v4 } from "uuid";
import { hash } from "bcryptjs";
import { User } from "../../entities/user/User";
import {
  __cookieAccessTokenName__,
  __cookieRefreshTokenName__,
} from "../../constants";
import {
  generateAccessToken,
  generateRefreshToken,
  storeAccessToken,
  storeRefreshToken,
} from "../../auth";

@Resolver()
export class UserRegisterResolver {
  @Mutation(() => UserObjectType)
  async register(
    @Arg("input", () => UserRegisterInput, { nullable: false })
    { gender, password, username }: UserRegisterInput,
    @Ctx() { em, res }: CtxType
  ): Promise<UserObjectType> {
    if (username.trim().length < 3) {
      return {
        error: {
          message: "username must be at least 3 characters",
          field: "username",
        },
      };
    }
    if (password.trim().length < 5) {
      return {
        error: {
          message: "password must be at least 5 characters",
          field: "password",
        },
      };
    }
    const hashed: string = await hash(password.trim(), 10);
    const uid: string = uuid_v4();

    const user = await em.create(User, {
      username: username.trim().toLowerCase(),
      password: hashed,
      uid,
      gender,
    });

    try {
      await em.persist(user).flush();
    } catch (error) {
      if (String(error.detail).includes("already exists")) {
        return {
          error: {
            message: "username is taken by someone else",
            field: "username",
          },
        };
      }
    }

    // jwt tokens magic goes here

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    // put them to the cookie

    storeRefreshToken(res, refreshToken);
    storeAccessToken(res, accessToken);
    return {
      user,
      accessToken,
    };
  }
}
