import { NonEmptyArray } from "type-graphql";
import { CreateContactResolver } from "./private/CreateContactResolver";
import { UserLoginResolver } from "./user/UserLoginResolver";
import { UserLogoutResolver } from "./user/UserLogoutResolver";
import { UserRegisterResolver } from "./user/UserRegisterResolver";
import { UserResolver } from "./user/UserResolver";
import { UsersResolver } from "./user/UsersResolver";
import { UserInvalidateTokenResolver } from "./user/UserTokenInvalidationResolver";

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  UserRegisterResolver,
  UserResolver,
  UserLoginResolver,
  UserLogoutResolver,
  UserInvalidateTokenResolver,
  CreateContactResolver,
  UsersResolver,
];
