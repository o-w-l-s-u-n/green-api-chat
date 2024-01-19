import { styled } from "styled-components";

export const AuthorizationScreen = styled.div`
  width: 100%;
  height: 100%;
  z-index: 999;
  position: fixed;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const AuthorizationForm = styled.form`
  padding: 43px 100px 20px 100px;
  background: #01a783;
  border-radius: 20px;
  color: #ffffff;
  width: 588px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const AuthorizationHeader = styled.h1`
  font-size: 30px;
  margin: 0 0 40px 0;
`;

export const Input = styled.input<{ $chatsCol?: boolean }>`
  width: 90%;
  height: 24px;
  border: none;
  border-radius: 20px;
  background: #2a3942;
  font-size: 20px;
  color: white;
  text-align: start;
  margin: ${(props) =>
    props.$chatsCol ? "130px 10px 20px 10px" : " 20px 10px 20px 10px"};
  padding: 16px;
`;

export const Button = styled.button`
  width: 90%;
  height: 64px;
  margin: 20px 10px 20px 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 20px;
  text-align: center;

  color: white;
  background: #026577;
  transition: transform 0.3s ease-out;

  &:hover,
  &:focus-visible {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(1.05);
  }
`;
