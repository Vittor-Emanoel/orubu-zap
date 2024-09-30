import { IMessageService } from "../message/IMessageService";
import { MessageService } from "../message/send-message-service";

export class MakeServiceFactory {
  static createMessageService(): IMessageService {
    return new MessageService();
  }
}
