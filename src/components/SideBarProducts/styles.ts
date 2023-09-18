import { styled } from "styled-components";

export const WrapperSideBar = styled.div`
  border: 1px solid black;
  background: rgb(9, 23, 59);
  width: 300px;
  height: 100vh;
  padding: 20px;
  .logOut{
    color: white;
    cursor: pointer;
    font-weight: bold;
    margin-top: 30px;
    &:hover{
    color: red !important;
      
    }
   
  }
`;

export const ItemImageLogo = styled.div`
  text-align: center;
  img {
    width: 70%;
  }
`;

export const ItemTitleProduct = styled.div`
  .active {
    font-weight: bold;
    color: yellow;
  }
  .title-admin {
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    border-radius: 8px;
    background: rgb(28, 42, 80);
    padding: 16px;
    & > div {
      color: white;
      font-size: 18px;
      /* font-family: "Noto Sans"; */
    }
  }
  .group-title {
    border-left: 1px solid white;
    /* text-align: center; */
    padding-left: 10px;
    margin: auto;
    width: 75%;
    margin-top: 10px;
    & > div {
      font-size: 18px;
      padding: 20px 0px;
      color: white;
      font-weight: bold;
      cursor: pointer;
    }
    & > .active {
      font-weight: bold;
      color: orange;
    }
  }
`;
