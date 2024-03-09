import { styled } from "styled-components";
import { CommonModal } from "../../../../components/Ui/modal";

export const StyledCommonModal = styled(CommonModal)`
  .ant-modal-content {
    padding: 15px !important;
  }
  .item-delete {
    text-align: center;
    .icon-delete {
      width: 35%;
    }
    & > div:last-child {
      font-weight: 600;
    }
  }
`;

export const GroupButton = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 15px;
  .button-delete {
    background-color: #1677ff;
    color: white !important;
    border: none;
  }
  .button-delete:hover {
    color: white;
    background-color: red;
  }
`;
