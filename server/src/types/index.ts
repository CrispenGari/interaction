import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import express from "express";
import { Server } from "socket.io";
import { Redis } from "ioredis";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
export type CtxType = {
  em: EntityManager<IDatabaseDriver<Connection>>;
  req: express.Request & { session?: any; uid: string };
  res: express.Response;
  redis: Redis;
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>;
};
