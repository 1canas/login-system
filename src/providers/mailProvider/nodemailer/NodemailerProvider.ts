import IMailProvider, { IMessage } from "../IMailProvider";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export class NodemailerProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "bfd43f58fd8530",
        pass: "f156b4d2446d4e",
      }
    });
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
        to: message.to,
        from: message.from,
        subject: message.subject,
        html: message.body
    })
  }
}