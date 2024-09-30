import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeServiceFactory } from "../../../services/factories/make-message-service";
import { BaileysWhatsAppSuffix } from "../../../utils/BaileysWhatsAppSuffix";

const sendMessageBodySchema = z
  .object({
    contactNumber: z.number(),
    textMessage: z.string(),
  })
  .transform((body) => {
    const { contactNumber, textMessage } = body;

    const contactNumberFormatted = `${contactNumber}${BaileysWhatsAppSuffix}`;

    return {
      contactNumber: contactNumberFormatted,
      textMessage,
    };
  });

/**
 *
 * @param request telefone nesse formato: PAÍS/DD/NUMERO e mensagem de texto
 * @param reply void
 */
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
    reply.send({ status: "success", messageId: result });
  } catch (error) {
    console.log(error);

    reply
      .status(500)
      .send({ status: "error", message: "Erro ao enviar mensagem." });
  }
};
