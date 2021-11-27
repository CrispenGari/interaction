import { Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class SharedFields {
  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date" })
  updatedAt = new Date();
}
