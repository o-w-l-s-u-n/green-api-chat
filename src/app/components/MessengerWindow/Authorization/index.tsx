import { FC, useEffect } from "react";
import {
    AuthorizationHeader,
    AuthorizationScreen,
    AuthorizationForm,
    Input,
    Button,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import {
    changeIdInput,
    changeTokenInput,
    selectIdInput,
    selectTokenInput,
} from "../../../store/authSlice";
import {
    doLogin,
    getAccountState,
    selectChatState,
    selectId,
    selectToken,
} from "../../../store/chatSlice";
import { useAppDispatch } from "../../../store/store";

export const Authorization: FC = () => {
    const idInput = useSelector(selectIdInput);
    const tokenInput = useSelector(selectTokenInput);
    const chatState = useSelector(selectChatState);
    const token = useSelector(selectToken);
    const idInstance = useSelector(selectId);
    const dispatch = useAppDispatch();
    useEffect(() => console.log(idInput, tokenInput), [idInput, tokenInput]);
    return (
        <AuthorizationScreen>
            <AuthorizationForm
                onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(doLogin({ id: idInput, token: tokenInput }));
                    dispatch(getAccountState(chatState));
                    console.log(idInput);
                }}
            >
                <AuthorizationHeader>Авторизируйся</AuthorizationHeader>
                <Input
                    type="text"
                    name="id"
                    placeholder="idInstance"
                    value={idInput}
                    onChange={(e) => dispatch(changeIdInput(e.target.value))}
                ></Input>
                <Input
                    type="text"
                    name="token"
                    placeholder="apiTokenInstance"
                    value={tokenInput}
                    onChange={(e) => dispatch(changeTokenInput(e.target.value))}
                ></Input>
                <Button type="submit">отправить</Button>
            </AuthorizationForm>
        </AuthorizationScreen>
    );
};
