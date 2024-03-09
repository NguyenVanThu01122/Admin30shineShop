import { styled } from "styled-components";
import { TableGeneral } from "../../../../components/Ui/table";

export const StyledTableGeneral = styled(TableGeneral)`
  height: 420px;
  .ant-table-body {
    overflow-y: auto;
    &::-webkit-scrollbar-thumb {
      border-radius: 5px !important;
    }
    &::-webkit-scrollbar {
      width: 4px !important;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent !important; //Màu của vùng cuộn
    }
    &:hover {
      &::-webkit-scrollbar-thumb {
        background: linear-gradient(217deg, #e250e5, #4b50e6) !important;
      }
    }
  }
  .email-user {
    color: gray;
  }
  .gender-user {
    font-weight: bold;
  }
  .total-money {
    font-weight: bold;
    color: red;
    font-size: 15px;
  }
  .group-icon {
    display: flex;
    gap: 10px;
    & img {
      width: 25px;
      cursor: pointer;
    }
  }
`;
