import { Field, InputType } from "type-graphql";

@InputType()
export class CreateChatInputType {
  @Field(() => String, { nullable: false })
  uid: string;

  @Field(() => String, { nullable: false })
  friendId: string;
}
