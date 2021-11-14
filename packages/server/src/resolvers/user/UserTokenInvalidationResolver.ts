import { User } from "../../entities/user/User";
import { CtxType } from "../../types";
import { Ctx, Mutation, Resolver } from "type-graphql";

@Resolver()
export class UserInvalidateTokenResolver {
  @Mutation(() => Boolean)
  async invalidateToken(@Ctx() { req, em }: CtxType): Promise<boolean> {
    if (!req.uid) return false;
    const user = await em.findOne(User, {
      uid: req.uid,
    });
    if (!user) return false;
    let _version: number = user.tokenVersion;
    _version = _version += 1;
    user.tokenVersion = _version;
    await em.persist(user).flush();
    return true;
  }
}
