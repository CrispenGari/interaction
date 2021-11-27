import { User } from "../../entities/user/User";
import { Ctx, Query, Resolver } from "type-graphql";
import { CtxType } from "src/types";

@Resolver()
export class UsersResolver {
  @Query(() => [User], { nullable: false })
  async users(@Ctx() { em }: CtxType): Promise<User[]> {
    return await em.find(User, {}, ["chats"]);
  }
}
