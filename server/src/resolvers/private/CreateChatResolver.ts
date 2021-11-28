import { CtxType } from "../../types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateChatObjectType } from "./ObjectTypes/CreateContactObjectType";
import { PrivateChat } from "../../entities/private/PrivateChat";
import { User } from "../../entities/user/User";
import { CreateChatInputType } from "./InputTypes/CreateContactInputType";

@Resolver()
export class CreateChatResolver {
  @Mutation(() => CreateChatObjectType)
  async createChat(
    @Ctx() { em }: CtxType,
    @Arg("input") { friendId, uid }: CreateChatInputType
  ): Promise<CreateChatObjectType> {
    const user_1 = await em.findOne(User, {
      uid: friendId.trim(),
    });

    const chatId: string = [uid.trim(), friendId.trim()]
      .sort((a: string, b: string) => a.localeCompare(b))
      .join("-");

    if (!user_1) {
      return {
        error: {
          message: "invalid friend user id",
          field: "uid",
        },
      };
    }

    const user_2 = await em.findOne(User, {
      uid: uid.trim(),
    });
    if (!user_2) {
      return {
        error: {
          message: "your user id is invalid",
          field: "uid",
        },
      };
    }
    const chat = await em.create(PrivateChat, {
      chatId,
      users: [user_1, user_2],
    });
    try {
      await em.persistAndFlush(chat);
      return {
        chat,
      };
    } catch (error) {
      console.log(error);
      return {
        error: {
          message: error.detail.includes("exists")
            ? "chat with this user already exists."
            : "an error occurred while creating the chat.",
          field: "chat",
        },
      };
    }
  }
}
