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
export class CreateContactObjectType {
  @Field(() => PrivateChat, { nullable: true })
  chat?: PrivateChat;

  @Field(() => CreateContactError)
  error?: CreateContactError;
}
