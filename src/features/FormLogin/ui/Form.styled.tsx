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

  button {
    max-width: 250px;
    width: 100%;
    margin-top: 10px;
  }

  @media only screen and (min-width: 768px) {
    margin: 20px auto;
  }
`;

export const Block = styled.div`
  margin: 10px 0;
  width: 100%;
`;

export const TextForm = styled.div`
  margin: 15px 0 0;
`;
