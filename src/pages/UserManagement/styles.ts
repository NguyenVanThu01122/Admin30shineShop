import { Modal, Table } from "antd";
import { styled } from "styled-components";

export const WrapperInformation = styled.div`
  width: calc(100% - 300px);
  // lấy 100% - 300px của component sidebar
  height: 100vh;
  /* flex: 1; */
  padding: 20px;
  .item-title-client {
    & > div:first-child {
      font-size: 25px;
      padding: 20px;
      font-weight: bold;
    }
    .item-list-client {
      border-radius: 8px;
      padding: 20px;
      background-color: rgb(247, 247, 247);
      & > div:first-child {
        font-weight: 600;
        font-size: 18px;
        padding: 10px 0px;
      }
      .item-select {
        display: flex;
        justify-content: space-between;
        .select-input {
          display: flex;
          gap: 20px;
          .select {
            width: 400px;
          }
        }
      }
    }
    .button-addClient {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      height: 40px;
      gap: 8px;
      color: white;
      background: orange;
      &:hover {
        filter: brightness(0.8); // giảm độ sáng của phần tử
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
  .no-client {
    font-style: italic;
    color: red;
    text-align: center;
  }
`;

// item css Table
export const ItemTable = styled(Table)`
  height: 450px;
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

// Item css phân trang
export const ItemPagination = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  .quantity-user {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

// item css modal Form
export const ItemModalForm = styled(Modal)`
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
  .group-button {
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
  }
  .item-form {
  }
`;

// item css modal deleteClient
export const ItemModaleDelete = styled(Modal)`
  text-align: center;
  .icon-delete {
    width: 100px;
  }
  .title-modal-delete {
    font-weight: bold;
    font-size: large;
  }
`;
