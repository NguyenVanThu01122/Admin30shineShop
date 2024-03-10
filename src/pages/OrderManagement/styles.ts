import { Table } from "antd";
import { styled } from "styled-components";
import { CommonModal } from "../../components/Ui/modal";

export const WrapperOrderManagement = styled.div`
  width: calc(100% - 300px);
  height: 100vh;
  background-color: white;
  padding: 10px;
`;

// css pagination
export const ItemPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 0px 20px;
`;

export const TotalOrder = styled.div`
  display: flex;
  align-items: center;
  font-style: italic;
  gap: 15px;
`;

// css modal timeLine
export const StyledCommonModalTimeLine = styled(CommonModal)`
  width: 35% !important;
  .timeLine {
    .blue-status {
      color: blue;
    }
    .yellow-status {
      color: yellow;
    }
    .orange-status {
      color: orange;
    }
    .green-status {
      color: green;
    }
    .red-status {
      color: red;
    }
  }
  .ant-modal-body {
    margin-top: 30px !important;
  }
`;
