import { PrivateChat } from "../../entities/private/PrivateChat";
import {
  Arg,
  Ctx,
  Field,
  Int,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { CtxType } from "../../types";

@ObjectType()
class ChatMessagesObjectType {
  @Field(() => Int, { nullable: true })
  n_messages?: number;

  @Field(() => Int, { nullable: true })
  n_participants?: number;

  @Field(() => PrivateChat, { nullable: true })
  chat?: PrivateChat;
}

@Resolver()
export class ChatMessagesResolver {
  @Query(() => ChatMessagesObjectType)
  async getChat(
    @Ctx() { em }: CtxType,
    @Arg("chatId", () => String, { nullable: false }) chatId: string
  ): Promise<ChatMessagesObjectType> {
    const chat = await em.findOne(
      PrivateChat,
      {
        chatId,
      },
      ["users", "messages"]
    );
    if (!chat) {
      return {
        n_messages: 0,
        n_participants: 0,
      };
    }
    return {
      n_messages: chat.messages.length,
      n_participants: chat.users.length,
      chat,
    };
  }
}
