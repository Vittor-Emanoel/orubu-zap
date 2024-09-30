import { connectionWhatsapp } from "../../server";
import { IMessageService } from "./IMessageService";

export class MessageService implements IMessageService {
  async sendMessage(contactNumber: string, textMessage: string): Promise<any> {
    const whatsapp = connectionWhatsapp.getConnection();

    const connection = await whatsapp.sendMessage(contactNumber, {
      text: textMessage,
    });

    return connection;
  }
}
