import { styled } from "styled-components";
import { TableGeneral } from "../../../../components/Ui/table";

export const StyledTableGeneral = styled(TableGeneral)`
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

  .stt {
  }
  .image-product {
    width: 80px;
    height: 80px;
  }
  .id {
    font-weight: bold;
    border: 3px solid red;
  }
  .name-product {
    width: 100%;
  }
  .title-category {
    font-size: 16px;
    font-weight: bold;
    color: red;
  }
  .sale-price {
    color: red;
    font-weight: bold;
    font-size: 14px;
  }
  .origin-price {
    text-decoration: line-through;
    color: gray;
  }
  .quantity {
    font-size: 16px;
    font-weight: 600;
  }
  .brand {
    font-size: 16px;
    font-weight: 600;
  }

  .group-icon {
    display: flex;
    gap: 15px;
    img {
      width: 25px;
      cursor: pointer;
    }
  }
`;
