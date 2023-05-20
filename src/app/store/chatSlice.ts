import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import {
    IChatState,
    IIncomingMessage,
    IMessage,
    IOutgoingMessageStatus,
} from "./interfaces";
import { act } from "react-dom/test-utils";

const initialState: IChatState = {
    loginStatus: false,
    accountState: "idle",
    id: "",
    token: "",
    chats: [],
    phoneInput: "",
    newMessageInput: "",
    sendingStatus: "idle",
    recievingStatus: "idle",
    getAccountStateStatus: "idle",
    recieptIds: [],
};

export const getAccountState = createAsyncThunk(
    "chat/getAccState",
    async (state: IChatState) => {
        try {
            const response = await fetch(
                `https://api.green-api.com/waInstance${state.id}/getStateInstance/${state.token}`
            );
            const json = await response.json();
            return json;
        } catch (error) {
            return error;
        }
    }
);

export const sendMes = createAsyncThunk(
    "chat/sendMessage",
    async (state: IChatState) => {
        const chatToSendMessage = state.chats.find(
            (chat) => chat.current === true
        );
        try {
            const response = await fetch(
                `https://api.green-api.com/waInstance${state.id}/sendMessage/${state.token}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        chatId: chatToSendMessage?.phone + "@c.us",
                        message: state.newMessageInput,
                    }),
                }
            );
            console.log(response);
            const json = await response.json();
            if (!response.ok) console.error("Failed to send message");
            return json;
        } catch (error) {
            return error;
        }
    }
);

export const recieveMes = createAsyncThunk(
    "chat/recieveMessage",
    async (state: IChatState) => {
        try {
            const response =
                await fetch(`https://api.green-api.com/waInstance${state.id}/ReceiveNotification/${state.token}
            `);
            const json = await response.json();
            return json;
        } catch (error) {
            return error;
        }
    }
);

export const deleteNotification = createAsyncThunk(
    "chat/deleteNotification",
    async ({
        id,
        token,
        receiptId,
    }: {
        id: string;
        token: string;
        receiptId: number;
    }) => {
        try {
            const response = await fetch(
                `https://api.green-api.com/waInstance${id}/DeleteNotification/${token}/${receiptId}
            `,
                {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json",
                    },
                }
            );
            const json = await response.json();
            return json;
        } catch (error) {
            return error;
        }
    }
);

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        doLogin: (
            state,
            action: PayloadAction<{ id: string; token: string }>
        ) => {
            state.id = action.payload.id;
            state.token = action.payload.token;
            state.loginStatus = true;
        },
        changePhoneInput: (state, action: PayloadAction<string>) => {
            state.phoneInput = action.payload;
        },
        addChat: (state, action: PayloadAction<string>) => {
            state.chats = state.chats.map((chat) => {
                chat.current = false;
                return chat;
            });
            state.chats?.push({
                id: action.payload + "@c.us",
                phone: action.payload,
                messages: { sended: [], received: [] },
                current: true,
                senderName: "",
            });
            state.phoneInput = "";
        },
        changeNewMessageInput: (state, action: PayloadAction<string>) => {
            state.newMessageInput = action.payload;
        },
        selectChat: (state, action: PayloadAction<string>) => {
            state.chats = state.chats.map((chat) => {
                if (chat.id === action.payload) {
                    chat.current = true;
                } else {
                    chat.current = false;
                }
                return chat;
            });
        },
        clearReceiptsIds: (state) => {
            state.recieptIds = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAccountState.pending, (state) => {
            state.getAccountStateStatus = "recieving";
        });
        builder.addCase(getAccountState.rejected, (state) => {
            state.getAccountStateStatus = "error";
        });
        builder.addCase(getAccountState.fulfilled, (state, action) => {
            state.getAccountStateStatus = "success";
            state.accountState = action.payload.stateInstance;
        });
        builder.addCase(sendMes.pending, (state) => {
            state.sendingStatus = "sending";
        });
        builder.addCase(sendMes.rejected, (state) => {
            state.sendingStatus = "error";
        });
        builder.addCase(
            sendMes.fulfilled,
            (state, action: PayloadAction<{ idMessage: string }>) => {
                state.sendingStatus = "success";
                state.chats = state.chats.map((chat) => {
                    if (chat.current === true) {
                        chat.messages.sended.push({
                            id: action.payload.idMessage,
                            content: state.newMessageInput,
                            time: new Date().getTime(),
                            type: "sended",
                            status: "",
                        });
                    }
                    return chat;
                });
                state.newMessageInput = "";
            }
        );
        builder.addCase(recieveMes.pending, (state) => {
            state.recievingStatus = "recieving";
        });
        builder.addCase(recieveMes.rejected, (state) => {
            state.recievingStatus = "error";
        });
        builder.addCase(
            recieveMes.fulfilled,
            (
                state,
                action: PayloadAction<IIncomingMessage | IOutgoingMessageStatus>
            ) => {
                state.recievingStatus = "success";
                if (action.payload) {
                    const body = action.payload.body;

                    const receiptId = action.payload.receiptId;
                    let messageToAdd: IMessage;
                    if (body.typeWebhook === "incomingMessageReceived") {
                        const textContent =
                            body.messageData.textMessageData.textMessage;
                        const chatId = body.senderData.chatId;
                        messageToAdd = {
                            id: body.idMessage,
                            content: textContent,
                            time: body.timestamp * 1000,
                            type: "recieved",
                            status: "",
                        };
                        if (!state.chats.find((chat) => chat.id === chatId)) {
                            state.chats.push({
                                id: chatId,
                                phone: chatId.slice(0, -5),
                                messages: {
                                    sended: [],
                                    received: [messageToAdd],
                                },
                                current: false,
                                senderName: body.senderData.senderName,
                            });
                        } else {
                            state.chats = state.chats.map((chat) => {
                                if (chat.id === chatId) {
                                    chat.messages.received.push(messageToAdd);
                                }
                                return chat;
                            });
                        }
                        if (
                            !state.recieptIds.find(
                                (id) => id.receiptId === receiptId
                            )
                        ) {
                            state.recieptIds.push({
                                receiptId: receiptId,
                                type: "incomingMessageReceived",
                            });
                        }
                    } else if (body.typeWebhook === "outgoingMessageStatus") {
                        state.chats.map((chat) => {
                            if (chat.id === body.chatId) {
                                chat.messages.sended.map((message) => {
                                    if (message.id === body.idMessage) {
                                        message.status = body.status;
                                    }
                                    return message;
                                });
                            }
                            return chat;
                        });
                        if (
                            !state.recieptIds.find(
                                (id) => id.receiptId === receiptId
                            )
                        ) {
                            state.recieptIds.push({
                                receiptId: receiptId,
                                type: "outgoingMessageStatus",
                            });
                        }
                    }
                }
            }
        );
    },
});

export const {
    doLogin,
    changePhoneInput,
    addChat,
    changeNewMessageInput,
    selectChat,
    clearReceiptsIds,
} = chatSlice.actions;

export const selectLoginStatus = (state: RootState) => state.chat.loginStatus;
export const selectAccountState = (state: RootState) => state.chat.accountState;
export const selectChatState = (state: RootState) => state.chat;
export const selectId = (state: RootState) => state.chat.id;
export const selectToken = (state: RootState) => state.chat.token;
export const selectPhoneInput = (state: RootState) => state.chat.phoneInput;
export const selectChats = (state: RootState) => state.chat.chats;
export const selectReceiptIds = (state: RootState) => state.chat.recieptIds;
export const selectNewMessageInput = (state: RootState) =>
    state.chat.newMessageInput;

export default chatSlice.reducer;
