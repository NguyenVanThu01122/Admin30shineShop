import { styled } from "styled-components";

export const WrapperDialog = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  .confirmation-icon {
    width: 50px;
    height: 50px;
    margin: auto;
  }
`;
export const ConfirmationMessage = styled.div`
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
  font-size: large;
`;
