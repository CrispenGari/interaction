import { Message } from "../entities/messages/Message";
import { PrivateChat } from "../entities/private/PrivateChat";
import { User } from "../entities/user/User";

export const _get_messages_for_a_chat = async (
  em: any,
  chatId: string
): Promise<any> => {
  return await em.findOne(
    PrivateChat,
    {
      chatId,
    },
    ["users", "messages"]
  );
};

export const _send_message_and_get_response = async (
  em: any,
  chatId: string,
  senderId: string,
  message: string
): Promise<any> => {
  const chat = await em.findOne(
    PrivateChat,
    {
      chatId,
    },
    ["messages"]
  );
  if (!chat) return;
  const sender = await em.findOne(User, {
    uid: senderId.trim(),
  });
  if (!sender) return;
  const msg = await em.create(Message, {
    text: message,
    senderId: sender.uid,
  });
  chat.messages = [...chat.messages, msg];
  await em.persistAndFlush(chat);

  return await em.findOne(
    PrivateChat,
    {
      chatId,
    },
    ["users", "messages"]
  );
};
