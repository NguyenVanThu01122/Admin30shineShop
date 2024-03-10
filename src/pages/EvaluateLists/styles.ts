import { styled } from "styled-components";
import { TableGeneral } from "../../components/Ui/table";

export const WrapperEvaluateList = styled.div`
  width: calc(100% - 300px);
  padding: 20px;
`;

export const SearchEvaluate = styled.div`
  border-radius: 8px;
  background-color: rgb(247, 247, 247);
  padding: 20px 0px 20px 10px;
  .input-keyword {
    width: 25%;
  }
`;

export const TitlePage = styled.div`
  font-weight: bold;
  font-size: 22px;
  padding: 20px;
`;

export const StyledTable = styled(TableGeneral)`
  height: 455px;
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
  .name-product {
    text-decoration: underline;
    cursor: pointer;
  }
`;

// css item Pagination
export const ItemPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TotalEvaluate = styled.div`
  font-style: italic;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
