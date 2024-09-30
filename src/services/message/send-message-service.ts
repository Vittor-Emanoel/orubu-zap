import { connectionWhatsapp } from "../../server";
import { IMessageService } from "./IMessageService";

/**
 * Por enquanto so envia texto (feat: add type message in request body)
 *
 */
export class MessageService implements IMessageService {
  async sendMessage(contactNumber: string, textMessage: string): Promise<any> {
    const whatsapp = connectionWhatsapp.getConnection();

    const messageId = await whatsapp.sendMessage(contactNumber, {
      text: textMessage,
    });

    return messageId.key.id;
  }
}
