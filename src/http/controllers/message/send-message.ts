import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeServiceFactory } from "../../../services/factories/make-message-service";

const sendMessageBodySchema = z.object({
  contactNumber: z.string(),
  textMessage: z.string(),
});

export const sendMessageController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { contactNumber, textMessage } = sendMessageBodySchema.parse(
    request.body
  );
  const sendMessageService = MakeServiceFactory.createMessageService();

  try {
    const result = await sendMessageService.sendMessage(
      contactNumber,
      textMessage
    );
    reply.send({ status: "success", message: result });
  } catch (error) {
    console.log(error);

    reply
      .status(500)
      .send({ status: "error", message: "Erro ao enviar mensagem." });
  }
};
