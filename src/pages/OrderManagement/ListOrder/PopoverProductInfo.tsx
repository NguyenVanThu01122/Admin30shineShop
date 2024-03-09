import { Popover } from "antd";
import { TypeProductsInfo } from "./types";

const PopoverProductInfo = ({ record }: any) => {
  return (
    <Popover
      content={record?.productsInfo.map((item: TypeProductsInfo) => (
        <div
          key={item?.id}
          style={{
            width: "600px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            padding: "10px",
            borderBottom: "1px solid rgba(167, 166, 166, 0.201)",
            borderTop: "1px solid rgba(167, 166, 166, 0.201)",
          }}
        >
          <img style={{ width: "80px" }} src={item?.image} alt="" />
          <div style={{ color: "gray", width: "50%" }}>{item?.name}</div>
          <div style={{ color: "gray", width: "10%" }}>
            {item?.price}
            <span>đ</span>
          </div>
          <div style={{ fontSize: "20px", width: "5%" }}>{item?.amount}x</div>
          <div
            style={{
              fontSize: "17px",
              color: "red",
              fontWeight: "700",
              width: "15%",
            }}
          >
            {item?.amount * item?.price}
            <span>đ</span>
          </div>
        </div>
      ))}
      title="Các sản phẩm đã đặt mua"
    >
      <div className="hover-text">Hover vào đây để xem chi tiết</div>
    </Popover>
  );
};

export default PopoverProductInfo;
