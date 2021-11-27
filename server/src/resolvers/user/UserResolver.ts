import { CtxType } from "../../types";
import { Ctx, Query, Resolver } from "type-graphql";
import { UserObjectType } from "./ObjectTypes";
import { User } from "../../entities/user/User";
@Resolver()
export class UserResolver {
  @Query(() => UserObjectType)
  async user(@Ctx() { em, req }: CtxType): Promise<UserObjectType> {
    if (!(req as any).uid) {
      return {
        user: undefined,
        error: {
          message: "unauthorized user",
          field: "uid",
        },
        accessToken: "",
      };
    }
    return {
      user: (await em.findOne(User, { uid: (req as any).uid })) as any,
      accessToken: "hidden-when-user-is-authenticated",
    };
  }
}
