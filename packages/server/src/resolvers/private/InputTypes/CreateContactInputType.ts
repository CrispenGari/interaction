import { Field, InputType } from "type-graphql";

@InputType()
export class CreateContactInputType {
  @Field(() => String, { nullable: false })
  uid: string;

  @Field(() => String, { nullable: false })
  friendId: string;
}
