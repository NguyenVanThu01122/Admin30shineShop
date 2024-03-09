import { styled } from "styled-components";

// css item danh sách sản phẩm
export const Wrapper = styled.div`
  padding: 20px 20px 0px 20px;
  height: calc(100vh - 100px);
`;

export const ContentProduct = styled.div`
  border-radius: 8px;
  background-color: rgb(247, 247, 247);
  padding: 20px;
`;

export const TitleProducts = styled.div`
  border-bottom: 1px solid #f0f0f0;
  font-size: 18px;
  font-weight: 600;
`;

export const SelectItem = styled.div`
  padding: 10px 0px;
  display: flex;
  justify-content: space-between;
  height: 60px;
  .button-add {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    gap: 8px;
    background-color: orange;
    color: white;
    font-weight: bold;
    & > span {
      font-size: 16px;
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

export const InputSearch = styled.div`
  display: flex;
  gap: 10px;
  .input-keyword {
    width: 300px;
    height: 40px;
    &:focus {
      border-color: red;
      box-shadow: none;
    }
  }
`;
