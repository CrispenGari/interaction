import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity({
  tableName: "users",
  comment: "the table that contain users of the application",
})
export class User {
  @PrimaryKey()
  id: number;

  @Property({ type: "text", nullable: false })
  password!: string;

  @Property({ type: "int", default: 0, nullable: false })
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

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date" })
  updatedAt = new Date();
}
