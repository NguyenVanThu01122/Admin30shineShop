import { Table } from "antd";
import { styled } from "styled-components";

export const WrapperEvaluateList = styled.div`
  width: calc(100% - 300px);
  padding: 0px 30px;
  .list-evaluate {
    border-radius: 8px;
    background-color: rgb(247, 247, 247);
    padding: 10px;
    & > div:first-child {
      font-weight: bold;
      font-size: 22px;
      padding: 30px 20px;
    }
    .input-keyword {
      width: 25%;
    }
  }
`;

// css item table
export const ItemTable = styled(Table)`
  height: 500px;
  padding: 0px 10px;
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
  .display-total-evaluate {
    font-style: italic;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
