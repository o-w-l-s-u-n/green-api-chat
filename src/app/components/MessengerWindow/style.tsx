import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;
export const ChatsColumn = styled.div`
  background: #0e171d;
  width: 30%;
  color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden;
  &:hover {
    overflow-y: scroll;
  }
`;
export const ChatHeader = styled.div<{ $position: "dialog" | "chatsList" }>`
  background: #1f2c33;
  width: ${(props) => (props.$position === "dialog" ? "70%" : "30%")};
  height: 70px;
  position: fixed;
  top: 0px;
  z-index: 999;
`;
export const Chats = styled.div`
  background: #0e171d;
  width: 100%;
  height: 100%;
  margin-top: 170px;
`;
export const Chat = styled.div<{ $selected: boolean }>`
  background: ${(props) => (props.$selected ? "#27353e" : "#0e171d")};
  width: 95%;
  height: 40px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  border-bottom: 2px solid #222d34;
  &:hover {
    background: ${(props) => !props.$selected && "#1e2b32"};
  }
`;

export const LastMessage = styled.p`
  color: #8697a0;
`;

export const SenderName = styled.p`
  margin: 0;
`;
export const Dialog = styled.div`
  background: #0b141a;
  width: 70%;
  max-height: 100vh;
  display: flex;
  flex-direction: column-reverse;
  align-items: end;
  margin: 65px 0 115px 0;
  padding-bottom: 40px;
  overflow: hidden;
  &:hover {
    overflow-y: scroll;
  }
`;

export const MessageInputForm = styled.form`
  background: #1f2c33;
  width: 70%;
  height: auto;
  position: fixed;
  bottom: 0px;
  display: flex;
  justify-content: center;
`;
export const MessageField = styled.textarea`
  width: 90%;
  height: auto;
  min-height: 50px;
  resize: none;
  border: none;
  border-radius: 20px;
  background: #2a3942;
  font-size: 20px;
  color: white;
  text-align: start;
  margin: 20px 10px 20px 10px;
  padding: 16px;
`;

export const PhoneForm = styled.form`
  display: flex;
  justify-content: center;
  width: 30%;
  flex-wrap: wrap;
  background: #0e171d;
  position: fixed;
  top: 70px;
`;

export const SendedMessage = styled.div<{ $type?: "sended" | "recieved" }>`
  max-width: 40%;
  margin: 10px 80px 0 80px;
  border-radius: 10px;
  align-self: ${(props) => props.$type === "recieved" && "start"};
  height: auto;
  background: ${(props) => (props.$type === "sended" ? "#015c4b" : "#2a3942")};
  padding: 5px;
  color: white;
  display: flex;
  position: relative;
`;
export const MessageText = styled.p<{ $messageType: "sended" | "recieved" }>`
  line-height: 20px;
  margin: ${(props) =>
    props.$messageType === "sended" ? "0 60px 5px 5px" : "0 40px 5px 5px"};
`;

export const MessageTime = styled.p<{ $messageType: string }>`
  position: absolute;
  font-size: 12px;
  margin: 0;
  bottom: 4px;
  right: ${(props) => (props.$messageType === "sended" ? "27px" : "7px")};
  color: #a3beb7;
`;
export const CheckContainer = styled.div`
  position: absolute;
  bottom: -2px;
  right: 5px;
`;

export const MessegesContainer = styled.div`
  max-width: 100%;
  margin: 10px 10px;
  border-radius: 20px;
  height: auto;
  background: red;
  padding: 5px;
  color: white;
`;

export const AccountStateDisplay = styled.div<{ $accountState: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #8697a0;
`;
