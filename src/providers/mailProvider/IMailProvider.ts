export interface IAddress {
    name: string;
    address: string;
}

export interface IMessage {
    to: IAddress;
    from: IAddress;
    subject: string;
    body: string;
}

export default interface IMailProvider {
    sendMail(message: IMessage): Promise<void>;
}