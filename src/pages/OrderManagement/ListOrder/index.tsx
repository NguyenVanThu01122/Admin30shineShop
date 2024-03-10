import { DatePicker } from "antd";
import { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { ButtonGeneral } from "../../../components/Ui/button";
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
import { formatCurrency } from "../../../helper/formatCurrency";
import { formatDateFromISO } from "../../../helper/handleFormatDate";
import { OrderStatusUtils } from "../../../helper/orderStatusUtils";
import { useSearchKeywordUltis } from "../../../helper/useSearchKeyword";
import {
  OrderStatus,
  getTimeLine,
  updateStatusOrder,
} from "../../../service/order";
import PopoverProductInfo from "./PopoverProductInfo";
import {
  ContainerUpdate,
  DateFilter,
  FilterSection,
  GroupSelect,
  ItemDatePicker,
  ListOrderTitle,
  SelectBtn,
  StyledModalStatusPanel,
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
  const queryClient = useQueryClient();
  const appContext = useContext(AppContext);
  const { arrOrderStatus, classNameStatus } = OrderStatusUtils();
  const { handleChangeKeyword } = useSearchKeywordUltis(setPage, setKeyword);
  const [updateStatus, setUpdateStatus] = useState("");
  const [isOpenStatusOrder, setIsOpenStatusOrder] = useState<boolean>(false);
  const [saveIdUpdate, setSaveIdUpdate] = useState<TypeOrders>();
  const [selectedValue, setSelectedValue] = useState<any>();

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
  const handleUpdateStatusOrder = () => {
    const orderStatus = {
      orderStatus: updateStatus,
    };
    if (saveIdUpdate?.orderId && orderStatus) {
      updateStatusOrder(saveIdUpdate?.orderId, orderStatus)
        .then((res) => {
          queryClient.refetchQueries(["getListOrder"]);
          setIsOpenStatusOrder(false);
          setSelectedValue(null);
          toast.success(res.data?.message);
        })
        .catch((error) => toast.error(error.response?.data?.message));
    }
  };

  // xử lý chọn trạng thái đơn hàng
  const handleSelectStatusOrder = (value: OrderStatus) => {
    setOrderStatus(value);
    setPage(1);
  };

  // hàm thay đổi trạng thái đơn hàng
  const openStatusOrder = () => setIsOpenStatusOrder(true);

  // hàm mở modal TimeLine
  const showModalTimeline = () => setIsOpenModal(true);

  // hàm hủy thay đổi trạng thái đơn hàng
  const cancelStatusOrder = () => {
    setIsOpenStatusOrder(false);
    setSelectedValue(null);
  };

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
      render: (value) => <div className="name">{value?.name}</div>,
    },
    {
      title: "Email",
      dataIndex: "userInfo",
      key: "userInfo",
      render: (value) => <div className="email">{value?.email}</div>,
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
      render: (value) => (
        <div className="totalPrice">{formatCurrency(value)} VND</div>
      ),
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "orderStatus",
      key: "orderStatus",
      width: "140px",
      render: (value) => (
        <div className={classNameStatus(value)}>{arrOrderStatus(value)}</div>
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
        <div
          className="change-order-status"
          onClick={() => {
            setSaveIdUpdate(record);
            openStatusOrder();
          }}
        >
          Thay đổi trạng thái đơn hàng
        </div>
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
            placeholder={PLACEHOLDER.PLEASE_ENTER_NAME_CUSTOMER}
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
        pagination={false}
        size="middle"
      />

      <StyledModalStatusPanel
        width={400}
        footer
        open={isOpenStatusOrder}
        onCancel={cancelStatusOrder}
      >
        <ContainerUpdate>
          <SelectGeneral
            value={selectedValue}
            className="select-status"
            placeholder={PLACEHOLDER.SELECT_ORDER_STATUS}
            options={selectStatus}
            onChange={(value) => {
              setUpdateStatus(value);
              setSelectedValue(value);
            }}
          />
          <SelectBtn>
            <ButtonGeneral
              className="button-update"
              onClick={handleUpdateStatusOrder}
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
          </SelectBtn>
        </ContainerUpdate>
      </StyledModalStatusPanel>
    </WrapperOrders>
  );
}
