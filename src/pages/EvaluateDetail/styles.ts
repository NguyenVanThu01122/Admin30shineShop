import { Modal } from "antd";
import { styled } from "styled-components";

export const WrapperEvaluateDetail = styled.div`
  width: calc(100% - 300px);
  height: 100vh;
  padding: 0px 20px;
  .item-evaluate {
    padding: 10px;
    .evaluate-list {
      font-weight: bold;
      font-size: 20px;
      padding: 20px;
    }
    .group-select {
      background-color: rgb(237, 247, 247);
      border-radius: 8px;
      padding: 20px;
      display: flex;
      gap: 20px;
      .select {
        width: 33%;
      }
    }
  }
`;

// css item detailEvaluate
export const ItemDetailEvaluate = styled.div`
  position: relative;
  border: 1px solid orange;
  border-radius: 2px;
  height: 450px;
  overflow-y: auto !important;
  .title-evaluate {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    background-color: orange;
    padding: 10px;
    font-weight: bold;
    color: white;
    & div {
    }
    .ant-input {
      width: 20px;
    }
  }
  .detail-evaluate {
    display: flex;
    justify-content: space-between;
    padding: 20px 10px;
    border-bottom: 1px solid rgb(200, 200, 200);
    margin: 20px 0px;
    & div {
      width: 12%;
    }
    .allow-visible {
      cursor: pointer;
      color: green;
      text-decoration: underline !important;
    }
    .iconDelete {
      width: 25px;
    }
    .ant-input {
      width: 20px !important;
    }
  }
`;

// css item ModalDelete
export const ModalDelete = styled(Modal)`
  .message-delete {
    text-align: center;
    & > div:last-child {
      font-weight: 600;
    }
    & > img {
      width: 60px;
    }
  }
`;

// css item Pagination
export const ItemPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  .display-total-evaluate {
    font-style: italic;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

// css item Modal allowVisible
export const ModalAllowVisible = styled(Modal)`
  & div:first-child {
    font-weight: 600 !important;
  }
`;
