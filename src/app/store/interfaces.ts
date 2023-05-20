export interface IMessage {
    id: string;
    content: string;
    time: any;
    type: "sended" | "recieved";
    status: string;
}

export interface IReceiptIds {
    receiptId: number;
    type: string;
}

export interface IChat {
    id: string;
    phone: string;
    messages: {
        sended: IMessage[];
        received: IMessage[];
    };
    current: boolean;
    senderName: string;
}

export interface IChatState {
    loginStatus: boolean;
    id: string;
    token: string;
    chats: IChat[];
    phoneInput: string;
    newMessageInput: string;
    sendingStatus: "sending" | "error" | "success" | "idle";
    recievingStatus: "recieving" | "error" | "success" | "idle";
    recieptIds: IReceiptIds[];
}

export interface IIncomingMessage {
    receiptId: number;
    body: {
        typeWebhook: "incomingMessageReceived";
        instanceData: {
            idInstance: number;
            wid: string;
            typeInstance: "whatsapp";
        };
        timestamp: number;
        idMessage: string;
        senderData: {
            chatId: string;
            sender: string;
            senderName: string;
        };
        messageData: {
            typeMessage: "textMessage";
            textMessageData: {
                textMessage: string;
            };
        };
    };
}

export interface IOutgoingMessageStatus {
    receiptId: number;
    body: {
        typeWebhook: "outgoingMessageStatus";
        chatId: string;
        instanceData: {
            idInstance: number;
            wid: string;
            typeInstance: "whatsapp";
        };
        timestamp: number;
        idMessage: string;
        status:
            | "sent"
            | "delivered"
            | "read"
            | "failed"
            | "noAccount"
            | "notInGroup";
        sendByApi: boolean;
    };
}
