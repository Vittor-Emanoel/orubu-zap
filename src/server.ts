import Fastify from "fastify";
import { messagesRoutes } from "./http/controllers/message/routes";
import { BaileysConnection } from "./providers/whatsapp/baileys";

export const connectionWhatsapp = new BaileysConnection();
const app = Fastify();

app.register(messagesRoutes);

app.listen({ port: 3333 }).then(() => {
  console.log("🚀 HTTP Server Running!");
});
