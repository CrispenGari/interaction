import { InputType, Field } from "type-graphql";

@InputType()
export class UserLoginInput {
  @Field(() => String, { nullable: false })
  username: string;

  @Field(() => String, { nullable: false })
  password: string;
}

@InputType()
export class UserRegisterInput extends UserLoginInput {
  @Field(() => String, { nullable: false })
  gender: string;
}
