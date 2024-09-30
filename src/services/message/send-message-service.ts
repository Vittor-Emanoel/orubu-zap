import { connectionWhatsapp } from "../../server";
import { IMessageService } from "./IMessageService";

/**
 * Por enquanto so envia texto (feat: add type message in request body)
 * 
 {
    "contactNumber": "551100000000@s.whatsapp.net",
    "textMessage": "sua mensagem"
}
 * 
 */
export class MessageService implements IMessageService {
  async sendMessage(contactNumber: string, textMessage: string): Promise<any> {
    const whatsapp = connectionWhatsapp.getConnection();

    const connection = await whatsapp.sendMessage(contactNumber, {
      text: textMessage,
    });

    return connection;
  }
}
