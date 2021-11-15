import "reflect-metadata";
import cors from "cors";
import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./mikro-orm.config";
import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { __port__ } from "./constants";
import { Server, Socket } from "socket.io";
import { createServer, Server as S } from "http";
import { resolvers } from "./resolvers";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import router from "./routes";
import cookieParser from "cookie-parser";
import { authenticationMiddlewareFn } from "./middlewares";

interface User {
  __typename: string;
  username: string;
  gender: string;
  uid: string;
}
interface DataType {
  chatId: string;
  user: User;
}

(async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();
  const { em } = orm;

  const app: Application = express();
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();
  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
  app.use(express.json());
  app.use(
    session({
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      saveUninitialized: false,
      secret: "secret",
      resave: false,
      name: "user",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        secure: false, // https when true
        sameSite: "lax",
      },
    })
  );
  app.use(authenticationMiddlewareFn);
  app.use(router);

  const server: S = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket: Socket) => {
    console.log("new connection", socket.id);

    /*
      when the user is connected keep the socket connection open (take variables from the handshake)
      1. listen for events and broadcast/emit events
    */
    socket.on("join-room", (_data: DataType) => {
      //  determine if public or private chat
      console.log(_data);
      socket.join(_data.chatId); // join them to the same chat
      // socket.on(`messages-${_data.chaId}`, ())
      socket.to(_data.chatId).emit(`new-message-${_data.chatId}`, _data);
      socket.broadcast.to(_data.chatId).emit("user-back-in-the-chat");
    });

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers,
    }),
    context: ({ req, res }) => ({ em, req, res, io }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/", cors: false });
  server.listen(__port__, () =>
    console.log("The server has started at port: %d", __port__)
  );
})()
  .then(() => {})
  .catch((error) => console.error(error));
