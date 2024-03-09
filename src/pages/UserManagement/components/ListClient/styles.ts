import { styled } from "styled-components";

export const WrapperClient = styled.div`
  .button-addClient {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    height: 40px;
    gap: 8px;
    color: white !important;
    background: orange;
    border: none;
    &:hover {
      filter: brightness(0.8); // giảm độ sáng của phần tử
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
export const TitlePage = styled.div`
  font-size: 25px;
  padding: 20px;
  font-weight: bold;
`;

export const CustomerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 8px;
  padding: 20px;
  background-color: rgb(247, 247, 247);
`;

export const TitleContent = styled.div`
  font-weight: 600;
  font-size: 18px;
  padding: 10px 0px;
`;

export const SelectItem = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const SearchFilter = styled.div`
  display: flex;
  gap: 20px;
  .select {
    width: 400px;
  }
`;
