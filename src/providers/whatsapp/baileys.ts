import { Boom } from "@hapi/boom";
import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  type WASocket,
} from "@whiskeysockets/baileys";
import path from "node:path";

export class BaileysConnection {
  private sock: WASocket;

  constructor() {
    this.conn();
  }

  private async conn() {
    try {
      const { state, saveCreds } = await useMultiFileAuthState(
        path.resolve(__dirname, "../", "tokens")
      );

      this.sock = makeWASocket({
        printQRInTerminal: true,
        auth: state,
      });

      this.sock.ev.on("creds.update", saveCreds);
      this.sock.ev.on("connection.update", this.handleConnectionUpdate());

      console.log("Conexão estabelecida com sucesso.");
    } catch (err) {
      console.error("Erro ao conectar ao WhatsApp:", err);
    }
  }

  private handleConnectionUpdate() {
    return (update) => {
      const { connection, lastDisconnect } = update;

      if (connection === "close") {
        const shouldReconnect =
          (lastDisconnect?.error as Boom)?.output?.statusCode !==
          DisconnectReason.loggedOut;

        console.log(
          "Conexão fechada devido a",
          lastDisconnect?.error,
          ", reconectar:",
          shouldReconnect
        );

        if (shouldReconnect) {
          this.conn();
        }
      } else if (connection === "open") {
        console.log("Conexão aberta com sucesso");
      }
    };
  }

  private handleUpdateMessage() {
    return (update) => {
      const { connection, lastDisconnect } = update;

      if (connection === "close") {
        const shouldReconnect =
          (lastDisconnect?.error as Boom)?.output?.statusCode !==
          DisconnectReason.loggedOut;

        console.log(
          "Conexão fechada devido a",
          lastDisconnect?.error,
          ", reconectar:",
          shouldReconnect
        );

        if (shouldReconnect) {
          this.conn();
        }
      } else if (connection === "open") {
        console.log("Conexão aberta com sucesso");
      }
    };
  }

  public getConnection() {
    return this.sock;
  }
}
