import { styled } from "styled-components";

export const WrapperSideBar = styled.div`
  border: 1px solid black;
  background: rgb(9, 23, 59);
  width: 300px;
  height: 100vh;
  padding: 0px 20px 20px 20px;
`;

export const ItemImageLogo = styled.div`
  text-align: center;
  img {
    width: 70%;
  }
`;

export const ContentSideBar = styled.div``;

export const TitleAdmin = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  background: rgb(28, 42, 80);
  padding: 16px;
  cursor: pointer;
  color: violet;
`;

export const TitleText = styled.div`
  font-size: 18px;
`;

export const MenuNavigation = styled.div`
  border-left: 1px solid gray;
  padding-left: 10px;
  width: 100%;
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  & > div {
    padding: 8px;
    font-size: 18px;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
  & > .active {
    font-weight: bold;
    color: orange;
    outline: 1px dashed orange;
    border-radius: 5px;
  }
`;

export const Logout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4b50e6;
  cursor: pointer;
  margin-top: 40px;
  border: 1px dashed #4b50e6;
  height: 40px;
  border-radius: 5px;
  font-weight: 600;

  &:hover {
    border: 1px dashed red;
    color: red !important;
  }
`;
