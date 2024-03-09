import { styled } from "styled-components";
import ImageGeneral from "../../../../components/Ui/image";
import { CommonModal } from "../../../../components/Ui/modal";

export const StyledCommonModal = styled(CommonModal)`
  .ant-modal-body {
    margin-top: 30px;
  }
  .custom-form {
    // class text lỗi ant
    .ant-form-item .ant-form-item-explain-error {
      color: #ff4d4f;
      font-style: italic;
    }
    // class text input type=file
    .ant-form-item .ant-form-item-control-input-content {
      color: red;
    }
    flex: auto;
    max-width: 100%;
    color: red;
    .select-image {
      display: flex;
      align-items: center;
      font-weight: bold;
      gap: 10px;
      background-color: orange;
      color: white;
    }

    .input-text {
      height: 40px;
    }
    .input-file {
      cursor: pointer;
      border: 1px dashed orange;
    }
  }
`;

export const StyledImageGeneral = styled(ImageGeneral)`
  width: 200px;
  height: 200px;
  margin-top: 20px;
  border: 1px dashed black;
`;

export const NoImage = styled.div`
  width: 200px;
  height: 200px;
  margin-top: 20px;
  border: 1px dashed black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GroupButton = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  .add-brand {
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: orange;
    color: white;
    .icon-plus {
      width: 12px;
      height: 12px;
      padding: 5px;
      border-radius: 50%;
      background-color: white;
      color: orange;
    }
  }
`;
