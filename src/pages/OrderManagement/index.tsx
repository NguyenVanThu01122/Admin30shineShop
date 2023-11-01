import {
  Button,
  DatePicker,
  Input,
  Pagination,
  Popover,
  Select,
  Timeline,
  message,
} from "antd";
import moment from "moment";
import { useCallback, useContext, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { AppContext } from "../../context";
import { privateAxios } from "../../service/axios";
import { getListOrder } from "../../service/order";
import {
  ItemModalTimeLine,
  ItemPagination,
  ItemTable,
  WrapperOrderManagement,
} from "./styles";
// chọn selectSort theo tiền
const selectSort = [
  { value: 0, label: "Sắp xếp theo tổng tiền mua giảm dần" },
  { value: -1, label: "Sắp xếp theo tổng tiền mua mặc định" },
  { value: 1, label: "Sắp xếp theo tổng tiền mua tăng dần" },
];
// chọn hình thức thanh toán
const selectPayment = [
  { value: "offline", label: "offline" },
  { value: "online", label: "online" },
];
// chọn trạng thái đơn hàng
const selectStatus = [
  { value: "processing", label: "Đang xử lý" },
  { value: "confirmed", label: "Đã xác nhận" },
  { value: "in_transit", label: "Đang giao hàng" },
  { value: "delivered", label: "Đã giao hàng" },
  { value: "canceled", label: "Đã hủy" },
];
// chọn số lượng đơn hàng hiện trê 1 page
const selectLimit = [
  { value: 5, label: 5 },
  { value: 10, label: 10 },
  { value: 15, label: 15 },
  { value: 20, label: 20 },
  { value: 25, label: 25 },
  { value: 50, label: 50 },
];
// chọn thay đổ trạng thái đơn hàng
const selectChangeStatusOrder = [
  { value: "processing", label: "Đang xử lý" },
  { value: "confirmed", label: "Đã xác nhận" },
  { value: "in_transit", label: "Đang giao hàng" },
  { value: "delivered", label: "Đã giao hàng" },
  { value: "canceled", label: "Đã hủy" },
];

// hàm xử lý trạng thái đơn hàng
const arrOrderStatus = (status: string) => {
  switch (status) {
    case "processing":
      return "Đang xử lý";
    case "confirmed":
      return "Đã xác nhận";
    case "in_transit":
      return "Đang giao hàng";
    case "delivered":
      return "Đã giao hàng";
    case "canceled":
      return "Đã hủy";
    default:
      return "";
  }
};

// hàm xử lý màu sắc trạng thái đơn hàng
const colorStatus = (status: string) => {
  switch (status) {
    case "processing":
      return "blue";
    case "confirmed":
      return "yellow";
    case "in_transit":
      return "orange";
    case "delivered":
      return "green";
    case "canceled":
      return "red";
    default:
      return "";
  }
};

function OrderList() {
  const [keyword, setKeyword] = useState("");
  const [methodPayment, setMethodPayment] = useState<any>("");
  const [orderStatus, setOrderStatus] = useState("");
  const [sortMoney, setSortMoney] = useState(-1);
  const [startDate, setStartDate] = useState<any>("");
  const [endDate, setEndtDate] = useState<any>("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenStatusOrder, setIsOpenStatusOrder] = useState<any>(false);
  const [saveTimeline, setSaveTimeline] = useState([]);
  const [updateStatus, setUpdateStatus] = useState("");

  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  const { isLoading } = useQuery(
    [
      "getListOrder",
      page,
      limit,
      keyword,
      methodPayment,
      orderStatus,
      sortMoney,
      startDate,
      endDate,
    ],
    () =>
      getListOrder({
        keyword,
        sortMoney,
        methodPayment,
        orderStatus,
        startDate,
        endDate,
        limit,
        page,
      }),
    {
      onSuccess: (data) => {
        setTotalOrders(data.data?.totalOrders);
        appContext?.setListOrder(data?.data?.data);
      },
      onError: (err: any) => {},
    }
  );

  //  hàm xử lý tìm kiếm
  const handleChangeKeyword = useCallback((e: any) => {
    setKeyword(e.target.value);
    setPage(1); // set page 1 với mục đích hiển thị order tìm kiếm ở  page 1 (ví dụ: đang ở page 2 và limit la 10, khi tìm kiếm order ở page 2 thì order tìm kiếm chỉ có 1, và muốn hiển thị order tìm kiếm ở page 2, thì order tìm kiếm phải có số lượng vượt quá số lượng limit ở page 1 )
  }, []);

  // xử lý chọn trạng thái đơn hàng
  const handleSelectStatusOrder = useCallback((value: any) => {
    setOrderStatus(value);
    setPage(1);
  }, []);

  // xử lý select limit
  const handleSelectLimit = useCallback((value: number) => {
    setLimit(value);
    setPage(1); // set page về 1 để luôn luôn dc hiển thị đơn hàng, và tránh tình trạng người dùng chọn limit quá tổng số lượng đơn hàng và trả về k có đơn hàng
  }, []);

  // xử lý columns table
  const columns = useMemo(() => {
    return [
      {
        title: "STT",
        dataIndex: "orderId",
        key: "orderId",
        width: 60,
        render: (value: string, record: any, index: number) => {
          return <div>{(page - 1) * limit + 1 + index}</div>;
        },
      },
      {
        title: "Tên khách hàng",
        dataIndex: "userInfo",
        key: "userInfo",

        render: (value: any) => {
          return <div>{value?.name}</div>;
        },
      },
      {
        title: "Emali",
        dataIndex: "userInfo",
        key: "userInfo",

        render: (value: any) => {
          return <div>{value?.email}</div>;
        },
      },
      {
        title: "Các sản phẩm đã đặt mua",
        dataIndex: "",
        key: "",
        render: (value: any, record: any) => {
          return (
            <Popover
              content={record?.productsInfo?.map((item: any) => (
                <div
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
                  <div style={{ color: "gray", width: "50%" }}>
                    {item?.name}
                  </div>
                  <div style={{ color: "gray", width: "10%" }}>
                    {item?.price}
                    <span>đ</span>
                  </div>
                  <div style={{ fontSize: "20px", width: "5%" }}>
                    {item?.amount}x
                  </div>
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
        },
      },
      {
        title: "Tổng tiền phải trả",
        dataIndex: "totalPrice",
        key: "totalPrice",
        render: (value: number) => {
          return <div className="totalPrice">{value} VND</div>;
        },
      },
      {
        title: "Trạng thái đơn hàng",
        dataIndex: "orderStatus",
        key: "orderStatus",
        width: "145px",
        render: (value: string) => {
          return (
            <div
              className={`${
                value === "processing"
                  ? "processing"
                  : value === "confirmed"
                  ? "confirmed"
                  : value === "in_transit"
                  ? "in_transit"
                  : value === "delivered"
                  ? "delivered"
                  : value === "canceled"
                  ? "canceled"
                  : ""
              }`}
            >
              {arrOrderStatus(value)}
            </div>
          );
        },
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
        render: (value: string) => {
          return value || "-";
        },
      },
      {
        title: "Ngày đặt hàng",
        dataIndex: "userInfo",
        key: "userInfo",
        render: (value: any) => {
          const isoString = value?.createdAt; // láy chuỗi time ios
          const formattedDate = moment(isoString).format("HH:mm DD/MM/YYYY"); // dùng monment biến đổi ra chuỗi ngày tháng mong muốn
          return <div>{formattedDate}</div>;
        },
      },
      {
        title: "Timeline",
        dataIndex: "",
        key: "",
        render: (value: string, record: any) => {
          return (
            <div
              onClick={() => handleGetTimeline(record)}
              className="timeline-order"
            >
              Click vào đây để xem chi tiết
            </div>
          );
        },
      },
      {
        title: "Hành động",
        dataIndex: "",
        key: "",
        render: (value: string, record: any) => {
          console.log(record);
          return (
            <div>
              {isOpenStatusOrder ? (
                <div>
                  <Select
                    placeholder="chọn trạng thái"
                    options={selectChangeStatusOrder}
                    onChange={(value) => setUpdateStatus(value)}
                  ></Select>
                  <div className="select-button">
                    <Button
                      className="button-update"
                      onClick={() => handleUpdateStatusOrder(record)}
                    >
                      Cập nhật
                    </Button>
                    <Button
                      className="button-cancel"
                      onClick={handleCancelChangeStatusOrder}
                    >
                      Hủy
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  {arrOrderStatus(record?.orderStatus) === "Đã hủy" &&
                  arrOrderStatus(record?.orderStatus) === "Đã giao hàng" ? (
                    ""
                  ) : (
                    <div
                      className="change-order-status"
                      onClick={() => handleChangeStatusOrder(record?.orderId)}
                    >
                      Thay đổi trạng thái đơn hàng
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        },
      },
    ];
  }, [limit, page]);

  // hàm thay đổi trạng thái đơn hàng
  const handleChangeStatusOrder = useCallback((orderId: String) => {
    setIsOpenStatusOrder(orderId);
  }, []);

  // hàm hủy thay đổi trạng thái đơn hàng
  const handleCancelChangeStatusOrder = useCallback(() => {
    setIsOpenStatusOrder(false);
  }, []);

  // hàm cập nhật trạng thái đơn hàng
  const handleUpdateStatusOrder = (record: any) => {
    const orderStatus = {
      orderStatus:
        "processing" ||
        "confirmed" ||
        "in_transit" ||
        "delivered" ||
        "canceled",
    };
    privateAxios
      .put(`/admin/order/${record?.orderId}`, orderStatus)
      .then((res) => {
        message.success(res.data?.message);
        queryClient.refetchQueries(["getlistOrder"]);
        setIsOpenStatusOrder(false);
      })
      .catch((error) => {
        message.error(error.response?.data?.message);
      });
  };
  
  // hàm mở modal TimeLine
  const showModalTimeline = () => {
    setIsOpenModal(true);
  };
  // hàm đóng modal timeLine
  const handleCancelModalTimeline = () => {
    setIsOpenModal(false);
  };

  // hàm lấy mốc thời gian đơn hàng
  const handleGetTimeline = (record: any) => {
    privateAxios
      .get(`/admin/order/detail-timeline/${record?.orderId}`)
      .then((res) => {
        showModalTimeline();
        setSaveTimeline(res.data?.data);
      })
      .catch((error) => {});
  };

  return (
    <WrapperOrderManagement>
      <div className="order-management">
        <div>Quản Lý Đơn Hàng</div>
        <div className="item-order">
          <div className="list-order">
            <div>Danh sách đơn hàng</div>
            <div className="custom-date">
              <DatePicker
                size="large"
                placeholder="startDate"
                onChange={(value) => setStartDate(value)}
              />
              <DatePicker
                size="large"
                placeholder="endDate"
                onChange={(value) => setEndtDate(value)}
              />
            </div>
          </div>
          <div className="select-item">
            <Input
              className="input-keyword"
              size="large"
              placeholder="Vui lòng nhập tên"
              onChange={handleChangeKeyword}
            ></Input>
            <Select
              options={selectSort}
              size="large"
              defaultValue={sortMoney}
              onChange={(value) => setSortMoney(value)}
            ></Select>
            <Select
              className="select-payment"
              placeholder="chọn hình thức thanh toán"
              size="large"
              options={selectPayment}
              onChange={(value) => setMethodPayment(value)}
            ></Select>
            <Select
              className="select-status"
              size="large"
              placeholder="Chọn trạng thái đơn hàng"
              options={selectStatus}
              onChange={handleSelectStatusOrder}
            ></Select>
          </div>

          <ItemTable
            className="custom-table"
            loading={isLoading}
            columns={columns}
            dataSource={appContext?.saveListOrder}
            scroll={{ y: 350 }}
            pagination={false}
            size="middle"
          ></ItemTable>
        </div>

        {appContext?.saveListOrder?.length < 1 && !isLoading ? (
          <div className="no-order">không có đơn hàng nào !</div>
        ) : (
          <ItemPagination>
            <Pagination
              current={page}
              pageSize={limit}
              total={totalOrders}
              onChange={(page) => setPage(page)}
            />

            <div className="custom-total-Orders">
              Hiển thị từ đơn hàng thứ {(page - 1) * limit + 1} đến{" "}
              {page * limit > totalOrders ? totalOrders : page * limit} trên
              tổng {totalOrders} đơn hàng
              <Select
                options={selectLimit}
                defaultValue={limit}
                onChange={handleSelectLimit}
              />{" "}
              trên 1 trang.
            </div>
          </ItemPagination>
        )}
      </div>

      <ItemModalTimeLine
        open={isOpenModal}
        onCancel={handleCancelModalTimeline}
        footer={false}
        centered={true}
      >
        <Timeline
          className="custom-timeLine"
          mode="left" // mode kiểu hiện thị của timeline
          items={saveTimeline?.map((item: any) => {
            const isoString = item?.timeUpdate; // lấy chuỗi time iso
            const formattedDate = moment(isoString).format("HH:mm DD/MM/YYYY"); //dùng moment để tạo một đối tượng Moment từ chuỗi thời gian isoString, và dùng method format('HH:mm DD/MM/YYYY') để biến đổi đối tượng Moment này thành một chuỗi mới theo định dạng mà chúng ta mong muốn
            return {
              label: formattedDate,
              children: (
                <div
                  className={`${
                    arrOrderStatus(item.status) === "Đang xử lý"
                      ? "processing"
                      : arrOrderStatus(item.status) === "Đã xác nhận"
                      ? "confirmed"
                      : arrOrderStatus(item.status) === "Đang giao hàng"
                      ? "in_transit"
                      : arrOrderStatus(item.status) === "Đã giao hàng"
                      ? "delivered"
                      : arrOrderStatus(item.status) === "Đã hủy"
                      ? "canceled"
                      : ""
                  }`}
                >
                  {arrOrderStatus(item.status)}
                </div>
              ),
              color: colorStatus(item.status),
            };
          })}
        ></Timeline>
      </ItemModalTimeLine>
    </WrapperOrderManagement>
  );
}
export default OrderList;
