import { Modal, Table } from "antd";
import styled from "styled-components";
export const WrapperBrandManagement = styled.div`
  width: calc(100% - 300px);
  padding: 0px 20px;
  .brand-management {
    & > div:first-child {
      font-weight: bold;
      font-size: 22px;
      padding: 30px 20px;
    }
    .list-brand {
      .title-brand {
        background-color: rgb(247, 247, 247);
        border-radius: 8px;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        & > div:first-child {
          font-weight: 600;
          font-size: 18px;
        }
        .delete-all {
          font-weight: bold;
          color: red;
          border: 1px solid red;
          background-color: white;
          &:hover {
            background-color: red !important;
            color: white !important;
            border: red !important;
          }
        }
      }

      .group-select {
        width: 100%;
        display: flex;
        justify-content: space-between;
        gap: 10px;
        margin: 10px 0px;
        & > input {
          width: 30%;
        }
        .select-item {
          width: 35%;
          display: flex;
          justify-content: space-between;
          .select {
            width: 40%;
          }
          .add-brand {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            gap: 8px;
            background-color: orange;
            color: white;
            font-weight: bold;
            &:hover {
              filter: brightness(0.8);
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
    }
  }
  .no-brand {
    font-style: italic;
    color: red;
    text-align: center;
  }
`;

// component table
export const ItemTable = styled(Table)`
  height: 450px;
  .name-brand {
    font-weight: bold;
  }
  .group-icon {
    display: flex;
    gap: 15px;
    & img {
      width: 25px;
      cursor: pointer;
    }
  }

  .checkbox-all,
  .item-checkbox {
    width: 50px;
    height: 20px;
  }
`;

// component Pagination
export const ItemPagination = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  .display-total-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-style: italic;
  }
`;

// component Modal
export const ItemModal = styled(Modal)`
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
    .img-upload {
      width: 200px;
      height: 200px;
      margin-top: 20px;
      border: 1px dashed black;
    }
    .no-img {
      width: 200px;
      height: 200px;
      margin-top: 20px;
      border: 1px dashed black;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .group-button {
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
    }
  }
`;

// component ModalDelete
export const ModalDelete = styled(Modal)`
  .item-delete {
    text-align: center;
    .icon-delete {
      width: 35%;
    }
    & > div:last-child {
      font-weight: 600;
    }
  }
  .group-button {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 25px;
    .button-delete:hover {
      color: white;
      background-color: red;
    }
  }
`;
