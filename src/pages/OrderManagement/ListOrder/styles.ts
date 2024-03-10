import { styled } from "styled-components";
import { TableGeneral } from "../../../components/Ui/table";
import { CommonModal } from "../../../components/Ui/modal";

export const WrapperOrders = styled.div`
  height: 88vh;
  border-radius: 8px;
  padding: 10px;
`;

export const TitlePage = styled.div`
  font-weight: bold;
  font-size: 25px;
  padding: 20px 0px 15px 20px;
`;

export const FilterSection = styled.div`
  background-color: rgb(247, 247, 247);
  padding: 10px;
  border-radius: 5px;
`;

export const DateFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const ListOrderTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
`;

export const ItemDatePicker = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const GroupSelect = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  .input-keyword,
  .select-payment,
  .select-status {
    width: 380px;
  }
`;

export const StyledTableGeneral = styled(TableGeneral)`
  height: 420px;
  width: 100%;
  overflow: auto !important;
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
  .email {
    width: 100px;
  }
  .totalPrice {
    color: red;
    font-weight: bold;
  }
  .hover-text {
    cursor: pointer;
    text-decoration: underline;
  }
  .blue-status {
    color: white;
    padding: 5px;
    border-radius: 5px;
    background-color: blue;
    text-align: center;
    font-weight: bold;
  }
  .yellow-status {
    color: white;
    background-color: yellow;
    padding: 5px;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
  }
  .orange-status {
    color: white;
    background-color: orange;
    padding: 5px;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
  }
  .green-status {
    color: white;
    background-color: green;
    padding: 5px;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
  }
  .red-status {
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

export const StyledModalStatusPanel = styled(CommonModal)`
  .ant-modal-content {
  }
`;
export const ContainerUpdate = styled.div`
  .select-status {
    width: 80%;
  }
`;
export const SelectBtn = styled.div`
  display: flex;
  gap: 6px;
  justify-content: end;
  margin-top: 10px;
  .button-update {
    background-color: orange;
    font-weight: 600;
    color: gray;
  }
`;
