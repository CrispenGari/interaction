import {
  Entity,
  Property,
  PrimaryKey,
  OneToMany,
  ManyToMany,
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
  @PrimaryKey()
  id: number;

  @Field(() => String, { nullable: false })
  @Property({ nullable: false, type: "text", columnType: "text", unique: true })
  chatId: string;

  @Field(() => [User], { nullable: false })
  @ManyToMany(() => User)
  users: User[];

  @Field(() => [Message], { nullable: false })
  @OneToMany(() => Message, (msg) => msg.private_chat)
  messages: Message[];
}
