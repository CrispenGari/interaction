import { PrivateChat } from "../../../entities/private/PrivateChat";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
class CreateContactError {
  @Field(() => String)
  field: string;

  @Field(() => String)
  message: string;
}

@ObjectType()
export class CreateChatObjectType {
  @Field(() => PrivateChat, { nullable: true })
  chat?: PrivateChat;

  @Field(() => CreateContactError, { nullable: true })
  error?: CreateContactError;
}
