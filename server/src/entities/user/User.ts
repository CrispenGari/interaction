import { Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field } from "type-graphql";
import { PrivateChat } from "../private/PrivateChat";
import { SharedFields } from "../shared/Shared";

@ObjectType()
@Entity({
  tableName: "users",
  comment: "the table that contain users of the application",
})
export class User extends SharedFields {
  @PrimaryKey()
  id: number;

  @Property({ type: "text", nullable: false })
  password!: string;

  @Property({ columnType: "int", default: 0, nullable: false })
  tokenVersion: number;

  @Field(() => String)
  @Property({ type: "text", unique: true, nullable: false })
  username!: string;

  @Field(() => String)
  @Property({ type: "text", unique: false, nullable: false })
  gender!: string;

  @Field(() => String)
  @Property({ unique: true, nullable: false, type: "text" })
  uid!: string;

  @Field(() => [PrivateChat], { nullable: true })
  @ManyToMany(() => PrivateChat, (chat) => chat.users)
  chats!: PrivateChat[];
}
