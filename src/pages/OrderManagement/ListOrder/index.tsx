import { DatePicker } from "antd";
import { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { InputGeneral } from "../../../components/Ui/input";
import { SelectGeneral } from "../../../components/Ui/select";
import { AppContext } from "../../../context";
import { calculateRowNumber } from "../../../helper/calculateIndices";
import { ERROR_MESSAGES, PLACEHOLDER } from "../../../helper/constants";
import {
  selectPayment,
  selectSort,
  selectStatus,
} from "../../../helper/formOptions";
import { formatDateFromISO } from "../../../helper/handleFormatDate";
import { OrderStatusUtils } from "../../../helper/orderStatusUtils";
import { useSearchKeywordUltis } from "../../../helper/useSearchKeyword";
import { getTimeLine, updateStatusOrder } from "../../../service/order";
import OrderStatusPanel from "./OrderStatusControlPanel";
import PopoverProductInfo from "./PopoverProductInfo";
import {
  DateFilter,
  FilterSection,
  GroupSelect,
  ItemDatePicker,
  ListOrderTitle,
  StyledTableGeneral,
  TitlePage,
  WrapperOrders,
} from "./styles";
import { ListOrderProps, TypeColumns, TypeOrders } from "./types";

export default function ListOrder({
  page,
  limit,
  isLoading,
  sortMoney,
  setKeyword,
  setPage,
  setStartDate,
  setEndDate,
  setSortMoney,
  setMethodPayment,
  setSaveTimeline,
  setOrderStatus,
  setIsOpenModal,
}: ListOrderProps) {
  const appContext = useContext(AppContext);
  const { arrOrderStatus, colorStatus } = OrderStatusUtils();
  const [updateStatus, setUpdateStatus] = useState("");
  const queryClient = useQueryClient();
  const [isOpenStatusOrder, setIsOpenStatusOrder] = useState<boolean>(false);
  const { handleChangeKeyword } = useSearchKeywordUltis(setPage, setKeyword);

  // hàm lấy mốc thời gian đơn hàng
  const handleGetTimeline = (record: TypeOrders) => {
    getTimeLine(record?.orderId)
      .then((res) => {
        showModalTimeline();
        setSaveTimeline(res.data?.data);
      })
      .catch((error) => toast.error(ERROR_MESSAGES.SERVER_ERROR));
  };

  // hàm cập nhật trạng thái đơn hàng
  const handleUpdateStatusOrder = (record: TypeOrders) => {
    const orderStatus = {
      orderStatus: updateStatus,
    };
    updateStatusOrder(record?.orderId, orderStatus)
      .then((res) => {
        toast.success(res.data?.message);
        queryClient.refetchQueries(["getListOrder"]);
        setIsOpenStatusOrder(false);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
      });
  };

  // xử lý chọn trạng thái đơn hàng
  const handleSelectStatusOrder = (value: any) => {
    setOrderStatus(value);
    setPage(1);
  };

  // hàm hủy thay đổi trạng thái đơn hàng
  const cancelStatusOrder = () => setIsOpenStatusOrder(false);

  // hàm thay đổi trạng thái đơn hàng
  const openStatusOrder = () => setIsOpenStatusOrder(true);

  // hàm mở modal TimeLine
  const showModalTimeline = () => setIsOpenModal(true);

  // xử lý columns table
  const columns: TypeColumns[] = [
    {
      title: "STT",
      dataIndex: "orderId",
      key: "orderId",
      width: 60,
      render: (value, record, index) => calculateRowNumber(page, limit, index),
    },
    {
      title: "Tên khách hàng",
      dataIndex: "userInfo",
      key: "userInfo",
      render: (value) => <div>{value?.name}</div>,
    },
    {
      title: "Emali",
      dataIndex: "userInfo",
      key: "userInfo",
      render: (value) => <div>{value?.email}</div>,
    },
    {
      title: "Các sản phẩm đã đặt mua",
      dataIndex: "",
      key: "",
      render: (value, record) => <PopoverProductInfo record={record} />,
    },
    {
      title: "Tổng tiền phải trả",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (value) => <div className="totalPrice">{value} VND</div>,
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "orderStatus",
      key: "orderStatus",
      width: "145px",
      render: (value) => (
        <div className={colorStatus(value)}>{arrOrderStatus(value)}</div>
      ),
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "methodPayment",
      key: "methodPayment",
    },
    {
      title: "Ghi chú đơn hàng",
      dataIndex: "noteOrder",
      key: "noteOrder",
      render: (value) => value || "-",
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "userInfo",
      key: "userInfo",
      render: (value) => formatDateFromISO(value?.createdAt),
    },
    {
      title: "Timeline",
      dataIndex: "",
      key: "",
      render: (value, record) => (
        <div
          onClick={() => handleGetTimeline(record)}
          className="timeline-order"
        >
          Click vào đây để xem chi tiết
        </div>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "",
      render: (value, record) => (
        <OrderStatusPanel
          record={record}
          openStatusOrder={openStatusOrder}
          cancelStatusOrder={cancelStatusOrder}
          isOpenStatusOrder={isOpenStatusOrder}
          setUpdateStatus={setUpdateStatus}
          handleUpdateStatusOrder={handleUpdateStatusOrder}
        />
      ),
    },
  ];

  return (
    <WrapperOrders>
      <TitlePage>Quản Lý Đơn Hàng</TitlePage>
      <FilterSection>
        <DateFilter>
          <ListOrderTitle>Danh sách đơn hàng</ListOrderTitle>
          <ItemDatePicker>
            <DatePicker
              size="large"
              placeholder="startDate"
              onChange={(value) => setStartDate(value)}
            />
            <DatePicker
              size="large"
              placeholder="endDate"
              onChange={(value) => setEndDate(value)}
            />
          </ItemDatePicker>
        </DateFilter>
        <GroupSelect>
          <InputGeneral
            className="input-keyword"
            size="large"
            placeholder={PLACEHOLDER.PLAESE_ENTER_NAME_ORDER}
            onChange={handleChangeKeyword}
          />
          <SelectGeneral
            options={selectSort}
            size="large"
            defaultValue={sortMoney}
            onChange={(value) => setSortMoney(value)}
          />
          <SelectGeneral
            className="select-payment"
            placeholder={PLACEHOLDER.CHOOSE_PAYMENT_METHOD}
            size="large"
            options={selectPayment}
            onChange={(value) => setMethodPayment(value)}
          />
          <SelectGeneral
            className="select-status"
            size="large"
            placeholder={PLACEHOLDER.SELECT_ORDER_STATUS}
            options={selectStatus}
            onChange={handleSelectStatusOrder}
          />
        </GroupSelect>
      </FilterSection>

      {/* Table order */}
      <StyledTableGeneral
        className="custom-table"
        loading={isLoading}
        columns={columns}
        dataSource={appContext?.saveListOrder}
        scroll={{ y: 330 }}
        pagination={false}
        size="middle"
      />
    </WrapperOrders>
  );
}
