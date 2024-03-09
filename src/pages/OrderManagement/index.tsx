import { Pagination, Select, Timeline } from "antd";
import moment from "moment";
import { useCallback, useContext, useState } from "react";
import { useQuery } from "react-query";
import NoDataMessage from "../../components/NoDataMessage";
import { AppContext } from "../../context";
import { NO_DATA_MESSAGE } from "../../helper/constants";
import { optionsLimit } from "../../helper/formOptions";
import { OrderStatusUtils } from "../../helper/orderStatusUtils";
import { OrderStatus, getListOrder } from "../../service/order";
import ListOrder from "./ListOrder";
import {
  ItemModalTimeLine,
  ItemPagination,
  WrapperOrderManagement,
} from "./styles";

function OrderList() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [keyword, setKeyword] = useState("");
  // const [
  //   page,
  //   setPage,
  //   limit,
  //   setLimit,
  //   keyword,
  //   setKeyword,
  //   sort,
  //   setSort,
  //   totalItem,
  //   setTotalItem,
  //   isOpenModal,
  //   setIsOpenModal,
  // ] = useSharedStateUtils();

  const [methodPayment, setMethodPayment] = useState<any>("");
  const [orderStatus, setOrderStatus] = useState<OrderStatus>();
  const [sortMoney, setSortMoney] = useState(-1);
  const [startDate, setStartDate] = useState<any>("");
  const [endDate, setEndDate] = useState<any>("");
  const [saveTimeline, setSaveTimeline] = useState([]);
  const appContext = useContext(AppContext);
  const { arrOrderStatus, colorStatus } = OrderStatusUtils();

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
  // xử lý select limit
  const handleSelectLimit = useCallback((value: number) => {
    setLimit(value);
    setPage(1); // set page về 1 để luôn luôn dc hiển thị đơn hàng, và tránh tình trạng người dùng chọn limit quá tổng số lượng đơn hàng và trả về k có đơn hàng
  }, []);

  // hàm đóng modal timeLine
  const handleCancelModalTimeline = () => {
    setIsOpenModal(false);
  };

  return (
    <WrapperOrderManagement>
      <ListOrder
        page={page}
        limit={limit}
        setKeyword={setKeyword}
        setPage={setPage}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        sortMoney={sortMoney}
        setSortMoney={setSortMoney}
        setMethodPayment={setMethodPayment}
        isLoading={isLoading}
        setOrderStatus={setOrderStatus}
        setSaveTimeline={setSaveTimeline}
        setIsOpenModal={setIsOpenModal}
      />

      {appContext?.saveListOrder?.length < 1 && !isLoading ? (
        <NoDataMessage message={NO_DATA_MESSAGE.NO_ORDER} />
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
            {page * limit > totalOrders ? totalOrders : page * limit} trên tổng{" "}
            {totalOrders} đơn hàng
            <Select
              options={optionsLimit}
              defaultValue={limit}
              onChange={handleSelectLimit}
            />{" "}
            trên 1 trang.
          </div>
        </ItemPagination>
      )}

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
        />
      </ItemModalTimeLine>
    </WrapperOrderManagement>
  );
}
export default OrderList;
