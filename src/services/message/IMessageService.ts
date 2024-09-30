export interface IMessageService {
  sendMessage(contactNumber: string, textMessage: string): Promise<any>;
}
