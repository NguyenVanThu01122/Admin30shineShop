import { styled } from "styled-components";
import { CommonModal } from "../../../../components/Ui/modal";

export const StyledCommonModal = styled(CommonModal)`
  height: 400px;
  .ant-modal-content {
    padding-top: 50px !important;
  }
  .ant-form-item-label {
    margin-right: 30px !important;
    display: flex;
    color: red;
  }
  .ant-form-item-label > label {
    color: gray;
    font-size: 15px;
    font-weight: bold;
  }
  .ant-form-item-explain-error {
    font-style: italic;
  }
`;
export const GroupButton = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  .button-cancel:hover {
    background-color: red;
    color: white;
    cursor: pointer;
  }
  .button-add {
    cursor: pointer;
    color: white;
    background-color: orange;
  }
`;
