import { NonEmptyArray } from "type-graphql";
import { UserLoginResolver } from "./user/UserLoginResolver";
import { UserRegisterResolver } from "./user/UserRegisterResolver";
import { UserResolver } from "./user/UserResolver";

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  UserRegisterResolver,
  UserResolver,
  UserLoginResolver,
];
