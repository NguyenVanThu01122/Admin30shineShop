import { Modal, Table } from "antd";
import { styled } from "styled-components";

export const WrapperOrderManagement = styled.div`
  width: calc(100% - 300px);
  height: 100vh;
  background-color: white;
  /* flex: 1; */
`;

// css table
export const ItemTable = styled(Table)`
  height: 450px;
  .hover-text {
    cursor: pointer;
    text-decoration: underline;
  }
  .processing {
    color: white;
    padding: 5px;
    border-radius: 5px;
    background-color: blue;
    text-align: center;
    font-weight: bold;
  }
  .confirmed {
    color: white;
    background-color: yellowgreen;
    padding: 5px;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
  }
  .in_transit {
    color: white;
    background-color: orange;
    padding: 5px;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
  }
  .delivered {
    color: white;
    background-color: green;
    padding: 5px;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
  }
  .canceled {
    color: white;
    background-color: red;
    padding: 5px;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
  }

  .timeline-order {
    text-decoration: underline;
    cursor: pointer;
  }
  .change-order-status {
    text-decoration: underline;
    cursor: pointer;
  }
  .select-button {
    display: flex;
    gap: 6px;
    margin-top: 10px;
    .button-update {
      background-color: orange;
      font-weight: 600;
      color: gray;
    }
  }
`;

// css pagination
export const ItemPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 0px 20px;
  .custom-total-Orders {
    display: flex;
    align-items: center;
    font-style: italic;
    gap: 15px;
  }
`;

// css modal timeLine
export const ItemModalTimeLine = styled(Modal)`
  width: 35% !important;
  .custom-timeLine {
    .processing {
      color: blue;
    }
    .confirmed {
      color: yellow;
    }
    .in_transit {
      color: orange;
    }
    .delivered {
      color: green;
    }
    .canceled {
      color: red;
    }
  }
  .ant-modal-body {
    margin-top: 30px !important;
  }
`;
