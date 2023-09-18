import { Modal } from "antd";
import styled from "styled-components";

export const WrapperProductManagement = styled.div`
  background-color: rgb(247, 247, 247);
  width: calc(100% - 300px);
  height: 100vh;
  /* flex: 1; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 40px;
  .title-page {
    padding-left: 30px;
    margin-top: 30px;
    font-weight: bold;
    font-size: 22px;
  }
  .my-table {
    height: 400px;
    .image-product {
      width: 80px;
    }
    .id {
      font-weight: bold;
    }
    .name {
      /* color: red; */
    }
    .title-category {
      font-size: 16px;
      font-weight: bold;
      color: gray;
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
  }
  .no-product {
    text-align: center;
    color: red;
    font-style: italic;
  }
`;

// css item danh sách sản phẩm
export const ItemListProducts = styled.div`
  padding: 20px;
  .list_products {
    border-radius: 8px;
    background-color: white;
    padding: 20px;
    & > div:first-child {
      padding: 10px 0px;
      border-bottom: 1px solid #f0f0f0;
      font-size: 18px;
      font-weight: 600;
    }
    .selectItem {
      padding: 15px 0px;
      display: flex;
      justify-content: space-between;
      .input-search {
        display: flex;
        gap: 10px;
      }
      .input-keyword {
        width: 300px;
        height: 40px;
        &:focus {
          border-color: red;
          box-shadow: none;
        }
      }
      .button-add {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        gap: 8px;
        background-color: orange;
        color: white;
        font-weight: bold;
        & > span {
          font-size: 16px;
        }
        .plus {
          width: 12px;
          height: 12px;
          padding: 5px;
          border-radius: 50%;
          background-color: white;
          color: orange;
        }
      }
    }
  }
`;

// css item Pagination
export const ItemPagination = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  .information_amount_products {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

// css item Modal create và edit product
export const ItemModalProduct = styled(Modal)`
  .ant-modal-body {
    padding-top: 30px;
    .ant-form-item-label {
      text-align: left;
      * {
        font-weight: bold;
        font-size: 17px;
      }
    }
  }
  .item-form {
    .ant-form-item-explain-error {
      // class xử lý lỗi hiện thỉ text lỗi của ant
      color: #ff4d4f;
      font-style: italic;
    }
    .input {
      height: 50px;
    }
    .ant-select-selector {
      height: 50px !important;
    }
    .add-image{
      width: 30%;
      border: 1px dashed black;
    }
  }
  .group-button {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    .cencel-button:hover {
      color: white;
      background-color: red;
    }
    .update-button {
      background-color: orange;
      color: white;
      font-weight: bold;
    }
  }
`;
