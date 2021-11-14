import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { Message } from "./entities/messages/Message";
import { PrivateChat } from "./entities/private/PrivateChat";
import { User } from "./entities/user/User";

export default {
  entities: [User, PrivateChat, Message],
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[t|j]s$/,
  },
  dbName: "interaction",
  password: "root",
  user: "postgres",
  port: 5432,
  debug: process.env.NODE_ENV !== "production",
  type: "postgresql",
} as Parameters<typeof MikroORM.init>[0];
