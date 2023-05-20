import { FC, useCallback, useEffect } from "react";
import {
    Chat,
    ChatHeader,
    Chats,
    ChatsColumn,
    CheckContainer,
    Dialog,
    LastMessage,
    MessageField,
    MessageInputForm,
    MessageText,
    MessageTime,
    PhoneForm,
    SendedMessage,
    SenderName,
    Wrapper,
} from "./style";
import { useSelector } from "react-redux";
import {
    addChat,
    changeNewMessageInput,
    changePhoneInput,
    clearReceiptsIds,
    deleteNotification,
    recieveMes,
    selectChat,
    selectChats,
    selectId,
    selectLoginStatus,
    selectNewMessageInput,
    selectPhoneInput,
    selectReceiptIds,
    selectToken,
    sendMes,
} from "../../store/chatSlice";
import { Authorization } from "./Authorization";
import { Input } from "./Authorization/style";
import { useAppDispatch } from "../../store/store";
import { Clock, Done, DoneAll } from "./icons";
import { IChat, IReceiptIds } from "../../store/interfaces";

export const MessengerWindow: FC = () => {
    const status: boolean = useSelector(selectLoginStatus);
    const phoneInput: string = useSelector(selectPhoneInput);
    const chats: IChat[] = useSelector(selectChats);
    const newMessage: string = useSelector(selectNewMessageInput);
    const receiptIds: IReceiptIds[] = useSelector(selectReceiptIds);
    const id: string = useSelector(selectId);
    const token: string = useSelector(selectToken);
    const dispatch = useAppDispatch();

    const autoResize = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (newMessage.length > 100) {
            event.target.style.height = "auto";
            event.target.style.height = `${event.target.scrollHeight}px`;
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            if (newMessage)
                dispatch(
                    sendMes({
                        id: id,
                        token: token,
                        chats: chats,
                        newMessageInput: newMessage,
                    })
                );
        }
    };

    const chatsToogles = useCallback(() => {
        return chats?.map((chat) => {
            return (
                <>
                    <Chat
                        $selected={chat.current}
                        onClick={() => dispatch(selectChat(chat.id))}
                        key={chat.id}
                    >
                        <SenderName>{chat.senderName}</SenderName>
                        <LastMessage>{chat?.phone}</LastMessage>
                    </Chat>
                </>
            );
        });
    }, [chats, dispatch]);

    const messeges = useCallback(() => {
        const recieved = chats.find((chat) => chat.current === true)?.messages
            .received;
        const sended = chats.find((chat) => chat.current === true)?.messages
            .sended;
        let allMessagesSorted;
        if (recieved && sended)
            allMessagesSorted = sended
                ?.concat(recieved)
                .sort((a, b) => b.time - a.time);
        return (
            <>
                {allMessagesSorted?.map((message) => {
                    const time = new Date(message.time);
                    const hours = time.getHours().toString().padStart(2, "0");
                    const minutes = time
                        .getMinutes()
                        .toString()
                        .padStart(2, "0");
                    const formattedTime = `${hours}:${minutes}`;
                    return (
                        <SendedMessage key={message.id} $type={message.type}>
                            <MessageText $messageType={message.type}>
                                {message.content}
                            </MessageText>
                            <MessageTime $messageType={message.type}>
                                {formattedTime}
                            </MessageTime>
                            <CheckContainer>
                                {message.status === "sent" ? (
                                    <Done></Done>
                                ) : message.status === "delivered" ||
                                  message.status === "read" ? (
                                    <DoneAll
                                        messageStatus={message.status}
                                    ></DoneAll>
                                ) : (
                                    message.type === "sended" && <Clock></Clock>
                                )}
                            </CheckContainer>
                        </SendedMessage>
                    );
                })}
            </>
        );
    }, [chats]);

    useEffect(() => {
        for (let rid of receiptIds) {
            dispatch(
                deleteNotification({
                    id: id,
                    token: token,
                    receiptId: rid.receiptId,
                })
            );
            dispatch(clearReceiptsIds());
        }
    }, [dispatch, id, token, receiptIds]);

    useEffect(() => {
        let intId: NodeJS.Timer;
        if (status) {
            intId = setInterval(() => {
                dispatch(recieveMes({id: id, token: token}));
            }, 5000);
        }

        return () => {
            clearInterval(intId);
        };
    }, [status, id, token, dispatch]);

    return (
        <Wrapper>
            {!status && <Authorization></Authorization>}
            <ChatsColumn>
                <ChatHeader $position="chatsList">
                </ChatHeader>
                <PhoneForm
                    onSubmit={(e) => {
                        e.preventDefault();
                        dispatch(addChat(phoneInput));
                    }}
                >
                    <Input
                        type="text"
                        name="phone"
                        placeholder="enter phone number"
                        value={phoneInput}
                        onChange={(e) =>
                            dispatch(changePhoneInput(e.target.value))
                        }
                    ></Input>
                </PhoneForm>

                <Chats>{chatsToogles()}</Chats>
            </ChatsColumn>
            <Dialog>
                <ChatHeader $position="dialog"></ChatHeader>
                {messeges()}

                <MessageInputForm>
                    <MessageField
                        name="message"
                        placeholder="enter new message"
                        value={newMessage}
                        onChange={(e) => {
                            dispatch(changeNewMessageInput(e.target.value));
                        }}
                        onInput={autoResize}
                        onKeyDown={handleKeyDown}
                    ></MessageField>
                </MessageInputForm>
            </Dialog>
        </Wrapper>
    );
};
