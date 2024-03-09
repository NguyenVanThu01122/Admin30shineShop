import { useState } from "react";
import { ButtonGeneral } from "../../../components/Ui/button";
import { SelectGeneral } from "../../../components/Ui/select";
import { selectStatus } from "../../../helper/formOptions";
import { OrderStatusPanelProps } from "./types";

const OrderStatusPanel = ({
  setUpdateStatus,
  handleUpdateStatusOrder,
  record,
  cancelStatusOrder,
  isOpenStatusOrder,
  openStatusOrder,
}: OrderStatusPanelProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  return (
    <div>
      {isOpenStatusOrder ? (
        <div>
          <SelectGeneral
            placeholder="chọn trạng thái"
            options={selectStatus}
            onChange={(value) => {
              setUpdateStatus(value);
              setSelectedValue(value);
            }}
          />
          <div className="select-button">
            <ButtonGeneral
              className="button-update"
              onClick={() => handleUpdateStatusOrder(record)}
              disabled={!selectedValue}
            >
              Cập nhật
            </ButtonGeneral>
            <ButtonGeneral
              className="button-cancel"
              onClick={cancelStatusOrder}
            >
              Hủy
            </ButtonGeneral>
          </div>
        </div>
      ) : (
        <div className="change-order-status" onClick={openStatusOrder}>
          Thay đổi trạng thái đơn hàng
        </div>
      )}
    </div>
  );
};

export default OrderStatusPanel;
