import { styled } from "styled-components";
import { TableGeneral } from "../../../components/Ui/table";

export const WrapperOrders = styled.div`
  height: 90vh;
  background-color: rgb(247, 247, 247);
  border-radius: 8px;
  padding: 15px;
  border: 1px solid red;
`;

export const TitlePage = styled.div`
  font-weight: bold;
  font-size: 25px;
  padding: 30px 20px;
`;

export const FilterSection = styled.div``;

export const DateFilter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const ListOrderTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
`;

export const ItemDatePicker = styled.div`
  display: flex;
  gap: 10px;
`;

export const GroupSelect = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  .form-item {
    .input-keyword {
      width: 280px;
    }
  }
`;

export const StyledTableGeneral = styled(TableGeneral)`
  height: 450px;
  overflow-y: auto !important;
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
