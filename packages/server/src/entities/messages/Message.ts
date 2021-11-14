import { Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { PrivateChat } from "../private/PrivateChat";
import { SharedFields } from "../shared/Shared";

@ObjectType()
@Entity({ tableName: "messages" })
export class Message extends SharedFields {
  @PrimaryKey({ type: "uuid", defaultRaw: "uuid_generate_v4()" })
  id: string;

  @Field(() => String, { nullable: false })
  @Property({ nullable: false, type: "text" })
  text: string;

  @Field(() => String, { nullable: false })
  @Property({ nullable: false, type: "text" })
  senderId: string;

  @ManyToOne(() => PrivateChat, { mapToPk: true })
  private_chat!: PrivateChat;
}
