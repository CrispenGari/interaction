import { User } from "../../entities/user/User";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
class Error {
  @Field(() => String, { nullable: false })
  field: string;

  @Field(() => String, { nullable: false })
  message: string;
}
@ObjectType()
export class UserObjectType {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Error, { nullable: true })
  error?: Error;
}
