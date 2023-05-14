import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  background: #ffffff;
  box-shadow: 0px 0px 20px 20px rgba(0, 0, 0, 0.1);
  border-radius: 13px;
  padding: 20px;
  margin: 16px;

  .message {
    display: flex;
    width: 100%;
    div {
      display: flex;
      width: 100%;
      margin-bottom: 0;
    }
  }

  div:first-child {
    width: 100%;
  }

  div {
    margin-bottom: 20px;
  }

  input {
    margin-bottom: 20px;
  }

  button {
    max-width: 250px;
    width: 100%;
  }

  @media only screen and (min-width: 768px) {
    margin: 20px auto;
  }
`;
