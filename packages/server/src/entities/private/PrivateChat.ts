import {
  Entity,
  Property,
  PrimaryKey,
  ManyToOne,
  OneToMany,
} from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { Message } from "../messages/Message";
import { SharedFields } from "../shared/Shared";
import { User } from "../user/User";

@ObjectType()
@Entity({
  tableName: "chats",
  comment: "private chats table which contains all the private chats",
})
export class PrivateChat extends SharedFields {
  @PrimaryKey({ type: "uuid", defaultRaw: "uuid_generate_v4()" })
  id: string;

  @Field(() => String, { nullable: false })
  @Property({ nullable: false, type: "text", columnType: "text" })
  chatId: string;

  @ManyToOne(() => User, { mapToPk: true })
  user!: User;

  @Field(() => [Message], { nullable: false })
  @OneToMany(() => Message, (msg) => msg.private_chat)
  messages: Message[];
}
