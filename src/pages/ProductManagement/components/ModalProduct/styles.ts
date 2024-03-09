import { styled } from "styled-components";
import { FormGeneral } from "../../../../components/Ui/form";
import { CommonModal } from "../../../../components/Ui/modal";

export const StyledCommonModal = styled(CommonModal)`
  .ant-modal-body {
    padding-top: 30px;
    .ant-form-item-label {
      text-align: left;
      * {
        font-weight: bold;
        font-size: 17px;
      }
    }
    .ant-input-affix-wrapper-lg {
      padding: 10px 11px;
      font-size: 16px;
      line-height: 1.5;
      border-radius: 8px;
    }
  }
`;

export const StyledFormGeneral = styled(FormGeneral)`
  .ant-form-item-explain-error {
    // class xử lý lỗi hiện thỉ text lỗi của ant
    color: #ff4d4f;
    font-style: italic;
  }
  .formItem {
    .input {
      height: 45px;
    }
    .inputFile {
      cursor: pointer;
      border: 1px dashed orange;
    }
  }
  .ant-select-selector {
    height: 50px !important;
  }
  .add-image {
    width: 20%;
    border: 1px dashed gray;
  }
`;

export const GroupButton = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  .cancel-button:hover {
    color: white;
    background-color: red;
  }
  .update-button {
    background-color: orange;
    color: white;
    font-weight: bold;
  }
`;
