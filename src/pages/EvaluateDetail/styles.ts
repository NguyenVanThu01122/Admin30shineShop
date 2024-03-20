import { styled } from "styled-components";
import { CommonModal } from "../../components/Ui/modal";
import { TableGeneral } from "../../components/Ui/table";

export const WrapperEvaluateDetail = styled.div`
  width: calc(100% - 300px);
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const ContainerEvaluate = styled.div`
  padding: 20px 20px 0px 20px;
  flex: 1;
`;
export const TitlePage = styled.div`
  font-weight: bold;
  font-size: 20px;
  padding: 40px 0px 20px 20px;
`;

export const FilterSelect = styled.div`
  background-color: rgb(237, 247, 247);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  gap: 20px;
  .select {
    width: 33%;
  }
`;

export const StyledTableGeneral = styled(TableGeneral)`
  height: 420px;
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
`;

// css item Pagination
export const ItemPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px;

  /* margin-top: 50px; */
`;

export const TotalEvaluate = styled.div`
  font-style: italic;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

// css item Modal allowVisible
export const StyledModalAllowVisible = styled(CommonModal)``;

export const StyledModalDelete = styled(CommonModal)``;
