import { Message } from "../../entities/messages/Message";
import { PrivateChat } from "../../entities/private/PrivateChat";
import { User } from "../../entities/user/User";
import { CtxType } from "../../types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";

@ObjectType()
class SendMessageObjectType {
  @Field(() => Boolean, { nullable: true })
  sent?: boolean;

  @Field(() => Message, { nullable: true })
  message?: Message;

  @Field(() => String, { nullable: false })
  reason_or_message: string;
}
@InputType()
class SendMessageInputType {
  @Field(() => String, { nullable: false })
  message: string;

  @Field(() => String, { nullable: false })
  chatId: string;

  @Field(() => String, { nullable: false })
  senderId: string;
}
@Resolver()
export class SendMessageResolver {
  @Mutation(() => SendMessageObjectType)
  async sendMessage(
    @Ctx() { em }: CtxType,
    @Arg("input", () => SendMessageInputType, { nullable: false })
    { message, senderId, chatId }: SendMessageInputType
  ): Promise<SendMessageObjectType> {
    const chat = await em.findOne(
      PrivateChat,
      {
        chatId,
      },
      ["messages"]
    );
    if (!chat) {
      return {
        sent: false,
        reason_or_message: "the chat id does not exists.",
      };
    }
    const sender = await em.findOne(User, {
      uid: senderId.trim(),
    });
    if (!sender) {
      return {
        sent: false,
        reason_or_message: "the sender id is invalid",
      };
    }

    const msg = await em.create(Message, {
      text: message,
      senderId: sender.uid,
    });
    // pesisting to the database will save all the entities
    chat.messages = [...chat.messages, msg];
    await em.persistAndFlush(chat);
    return {
      message: msg,
      sent: true,
      reason_or_message: "message was sent",
    };
  }
}
