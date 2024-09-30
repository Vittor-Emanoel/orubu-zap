import Fastify from "fastify";
import z from "zod";
import { BaileysConnection } from "./baileys-connection";

//melhorar isso aqui
const baileys = new BaileysConnection();

const app = Fastify();

//ele nn entende o '+'
const params = z.object({
  contactNumber: z.string(),
  textMessage: z.string(),
});

app.post("/send-message", async (request, reply) => {
  const { contactNumber, textMessage } = params.parse(request.body);

  console.log("to aqui", contactNumber, textMessage);
  try {
    const whatsAppSocket = await baileys.getConnection();

    console.log(whatsAppSocket);
    const oi = await whatsAppSocket.sendMessage(contactNumber, {
      text: textMessage,
    });

    console.log(oi);
    reply.send({ status: "success", message: "mensagem enviada com successo" });
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    reply
      .status(500)
      .send({ status: "error", message: "Erro ao enviar mensagem." });
  }
});

app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});
