import { styled } from "styled-components";
import { TableGeneral } from "../../../../components/Ui/table";

export const WrapperBrand = styled.div``;

export const TitlePage = styled.div`
  font-weight: bold;
  font-size: 22px;
  padding: 40px 20px 20px 20px;
`;

export const ContentBrand = styled.div``;

export const TitleBrand = styled.div`
  height: 50px;
  background-color: rgb(247, 247, 247);
  border-radius: 8px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .delete-all {
    font-family: "Oswald";
    height: 40px;
    font-weight: bold;
    color: red;
    background-color: white;
    &:hover {
      background-color: red !important;
      color: white !important;
      border: red !important;
    }
  }
`;

export const Brands = styled.div`
  font-weight: 600;
  font-size: 18px;
`;

export const StyledTableGeneral = styled(TableGeneral)`
  height: 450px;
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
  .name-brand {
    font-weight: bold;
  }
  .img-brand {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }
  .checkbox-all,
  .item-checkbox {
    width: 50px;
    height: 20px;
  }
`;
export const SearchSelectGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: 10px 0px;
  & > input {
    width: 30%;
  }
`;

export const SelectItem = styled.div`
  width: 35%;
  display: flex;
  justify-content: space-between;
  .select {
    width: 42%;
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
`;
