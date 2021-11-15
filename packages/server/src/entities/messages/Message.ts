import { Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { PrivateChat } from "../private/PrivateChat";
import { SharedFields } from "../shared/Shared";

@ObjectType()
@Entity({ tableName: "messages" })
export class Message extends SharedFields {
  @PrimaryKey()
  id: number;

  @Field(() => String, { nullable: false })
  @Property({ nullable: false, type: "text" })
  text: string;

  @Field(() => String, { nullable: false })
  @Property({ nullable: false, type: "text" })
  senderId: string;

  @ManyToOne(() => PrivateChat)
  private_chat!: PrivateChat;
}
