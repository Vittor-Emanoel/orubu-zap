import { FastifyInstance } from "fastify";
import { sendMessageController } from "./send-message";

export async function messagesRoutes(app: FastifyInstance) {
  app.post("/send-message", sendMessageController);
}
