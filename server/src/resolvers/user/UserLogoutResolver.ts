import { CtxType } from "../../types";
import { Ctx, Mutation, Resolver } from "type-graphql";
import {
  __cookieAccessTokenName__,
  __cookieRefreshTokenName__,
} from "../../constants";
@Resolver()
export class UserLogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: CtxType): Promise<Boolean> {
    res.clearCookie(__cookieAccessTokenName__);
    res.clearCookie(__cookieRefreshTokenName__);
    return true;
  }
}
