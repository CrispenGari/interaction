import { CtxType } from "../../types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateContactObjectType } from "./ObjectTypes/CreateContactObjectType";
import { PrivateChat } from "../../entities/private/PrivateChat";
import { User } from "../../entities/user/User";
import { CreateContactInputType } from "./InputTypes/CreateContactInputType";

@Resolver()
export class CreateContactResolver {
  @Mutation(() => CreateContactObjectType)
  async createContact(
    @Ctx() { em, req }: CtxType,
    @Arg("input") { friendId, uid }: CreateContactInputType
  ): Promise<CreateContactObjectType> {
    console.log(req.uid);
    const chatId: string = `${uid}-${friendId}`;
    const user = await em.findOne(User, {
      uid: friendId.trim(),
    });
    if (!user) {
      return {
        error: {
          message: "invalid user uid",
          field: "user",
        },
      };
    }
    const chat = await em.create(PrivateChat, {
      chatId,
    });
    chat.user = user;
    try {
      await em.persistAndFlush(chat);
      return {
        chat,
      };
    } catch (error) {
      console.log(error);

      return {
        error: {
          message: "an error occured while creating the chat",
          field: "chat",
        },
      };
    }
  }
}
