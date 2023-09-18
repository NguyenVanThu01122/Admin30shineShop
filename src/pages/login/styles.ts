import { Form } from "antd";
import { styled } from "styled-components";

export const WrapperPageLogin = styled.div`
  background: url("https://storage.30shine.com/ResourceWeb/data/images/TopSalon/system-salon-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100%;
  .page-login {
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0px 50px;
    .image-login {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      height: 85vh;
      width: 50%;
      box-shadow: 0 0 20px 10px violet;
      background: rgba(255, 255, 255, 0.4);
      /* border-radius: 25% 10%; */
      border-bottom-right-radius: 15%; /* Góc dưới cùng bên trái trở nên bo tròn với bán kính 15px */
      border-top-left-radius: 50%; /* Góc trên cùng bên phải trở nên bo tròn với bán kính 25px */
      & > img {
        width: 100%;
        height: 90%;
      }
      // hiệu ứng chuyển động từ trên xuống dưới của image
      animation: imageAnimation 2s;
      @keyframes imageAnimation {
        from {
          transform: translatey(-150%);
        }
        to {
          transform: translatey(0);
        }
      }
      .text-container {
        font-weight: 600;
        width: 85%;
        font-style: italic;
        margin-bottom: 30px;
        display: flex;
        gap: 5px;
        color: #1c1c1c;
        // hiệu ứng chuyển động trái qua phải của text
        animation: brandAnimation 2s;
        animation-fill-mode: forwards; // giữ lại trạng thái hoạt hình kết thúc
        @keyframes brandAnimation {
          from {
            transform: translatex(-200%);
          }
          to {
            transform: translatex(0);
          }
        }
        & > span {
          white-space: nowrap;
          overflow: hidden;
          animation: moveUp 4s ease forwards infinite;
          opacity: 0;
          @keyframes moveUp {
            0% {
              transform: translateY(50px);
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
        }
      }
    }

    .block-form {
      /* width: 40%;
      height: 65%; */
      width: 560px;
      height: 500px;
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      background: #1c1c1c;
      animation: formLoginAnimation 2s;

      &::before {
        content: "";
        position: absolute;
        top: -50%;
        left: -50%;
        width: 560px;
        height: 500px;
        z-index: 1;
        background: linear-gradient(
          0deg,
          transparent,
          transparent,
          #45f3ff,
          #45f3ff,
          #45f3ff
        );
        transform-origin: bottom right; // dùng để xác định điểm gốc cho các phép biến đổi (transformations) áp dụng cho phần tử.
        animation: animate 6s linear infinite; // animation định nghĩa animation cho ptu,6s là time chu kỳ hoàn thành, linear nghĩa là tốc độ của animation sẽ đều đặn và không thay đổi, infinite là lặp lại vô hạn
      }
      &::after {
        //dùng after thêm nội dung vào cuối phần tử
        content: ""; //Thuộc tính này xác định nội dung hoặc trang trí sẽ được thêm vào phần tử.
        z-index: 1;
        position: absolute;
        top: -50%;
        left: -50%;
        width: 560px;
        height: 500px;
        background: linear-gradient(
          0deg,
          transparent,
          transparent,
          #45f3ff,
          #45f3ff,
          #45f3ff
        );
        transform-origin: bottom right;
        animation: animate 6s linear infinite;
        animation-delay: -3s;
      }
      .border-line {
        position: absolute;
        top: 0;
        inset: 0;
      }
      .border-line::after {
        content: "";
        z-index: 1;
        position: absolute;
        top: -50%;
        left: -50%;
        width: 560px;
        height: 500px;
        background: linear-gradient(
          0deg,
          transparent,
          transparent,
          #ff2770,
          #ff2770,
          #ff2770
        );
        transform-origin: bottom right;
        animation: animate 6s linear infinite;
        animation-delay: -4.5s;
      }
      .border-line::before {
        content: "";
        z-index: 1;
        position: absolute;
        top: -50%;
        left: -50%;
        width: 560px;
        height: 500px;
        background: linear-gradient(
          0deg,
          transparent,
          transparent,
          #ff2770,
          #ff2770,
          #ff2770
        );
        transform-origin: bottom right;
        animation: animate 6s linear infinite;
        animation-delay: -1.5s;
      }
      @keyframes animate {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      // hiệu ứng chuyển động của form
      @keyframes formLoginAnimation {
        from {
          transform: translatex(150%);
        }
        to {
          transform: translatex(0);
        }
      }
      .form-login {
        position: absolute;
        inset: 4px;
        z-index: 2;
        background-color: rgb(6, 7, 8);
        background-image: url("https://storage.30shine.com/ResourceWeb/data/images/TopSalon/system-salon-bg.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 8px;
        padding: 45px 0px;
        .logo-login {
          text-align: center;
          width: 40%;
          margin: auto;
          & > div:last-child {
            font-size: 20px;
            font-weight: bold;
            color: orange;
            border-radius: 8px;
            padding: 10px;
            margin: 20px 0px 40px 0px;
            box-shadow: 0px 0px 15px 8px violet;
            background-color: blueviolet;
          }
        }
      }

      .brand-text {
        color: white;
        font-size: 18px;
        font-weight: bold;
        position: relative;
        top: 450px;
        z-index: 1000;
        font-style: italic;
        border-bottom: 2px solid gray;
        padding-bottom: 5px;
        width: 75%;
        margin: auto;
        display: flex;
        gap: 2px;
        justify-content: center;

        animation: colorAnimation 5s linear infinite,
          rightLeftAnimation 8s linear infinite;
        animation-delay: 5s;
        @keyframes rightLeftAnimation {
          from {
            transform: translatex(150%);
          }
          to {
            transform: translatex(-100%);
          }
        }
        @keyframes colorAnimation {
          0% {
            color: white;
          }
          25% {
            color: orange;
          }
          50% {
            color: #45f3ff;
          }
          75% {
            color: green;
          }
          100% {
            color: red;
          }
        }

        // animation cho text1
        & > span:first-child {
          display: inline-block;
          animation: animate1 4.2s infinite;
          @keyframes animate1 {
            0%,
            8%,
            100% {
              transform: translateY(0);
            }

            4% {
              transform: translateY(-20px);
            }
          }
        }
        // animation cho text2
        & > span:nth-child(2) {
          display: inline-block;
          animation: animate2 4.2s infinite;
          animation-delay: 0.2s;
          @keyframes animate2 {
            0%,
            8%,
            100% {
              transform: translateY(0);
            }

            4% {
              transform: translateY(-20px);
            }
          }
        }
        // animation cho text3
        & > span:last-child {
          display: inline-block;
          animation: animate3 4.2s infinite;
          animation-delay: 0.3s;
          @keyframes animate3 {
            0%,
            8%,
            100% {
              transform: translateY(0);
            }

            4% {
              transform: translateY(-20px);
            }
          }
        }
      }
    }
  }
`;

// css itemForm
export const ItemForm = styled(Form)`
  width: 75%;
  margin: auto;
  // class error text
  .ant-form-item .ant-form-item-explain-error {
    color: #ff4d4f;
    font-style: italic;
    font-weight: bold;
  }

  // class input.password
  .ant-input-affix-wrapper-lg {
    background: rgba(255, 255, 255, 0.6);
    border: none;
    height: 50px;
    &:hover {
      box-shadow: 0 0 0 2px violet;
    }
  }
  // class input.password (phần content)
  .ant-input-affix-wrapper > input.ant-input {
    color: blueviolet;
    background: rgba(255, 255, 255, 0.1);
    &::placeholder {
      color: black;
      font-style: italic;
    }
  }
  // icon password
  .anticon svg {
    color: gray;
  }
  .border-violet {
    box-shadow: 0 0 0 2px violet;
  }
  .custom-input {
    color: blueviolet;
    border: none;
    background: rgba(255, 255, 255, 0.6) !important;
    height: 50px;
    &:hover {
      box-shadow: 0 0 0 2px violet;
    }
    &::placeholder {
      color: black;
      font-style: italic;
    }
  }
  .submit-button {
    margin-top: 30px;
    width: 100%;
    height: 45px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: orangered;
    font-size: 20px;
    font-weight: bold;
    box-shadow: 0px 0px 15px 8px pink;
    /* background: linear-gradient(
      217deg,
      rgb(226, 80, 229) 0%,
      rgb(75, 80, 230) 100%
    ); */
    &:hover {
      border: none;
      color: red !important;
      box-shadow: 0px 0px 15px 8px orangered;
    }
  }
`;
