import { Pagination, Timeline } from "antd";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import NoDataMessage from "../../components/NoDataMessage";
import { SelectGeneral } from "../../components/Ui/select";
import { AppContext } from "../../context";
import { calculateIndices } from "../../helper/calculateIndices";
import { ERROR_MESSAGES, NO_DATA_MESSAGE, SORT } from "../../helper/constants";
import { optionsLimit } from "../../helper/formOptions";
import { formatDateFromISO } from "../../helper/handleFormatDate";
import { OrderStatusUtils } from "../../helper/orderStatusUtils";
import { useSharedStateUtils } from "../../helper/useSharedState";
import { OrderStatus, getListOrder } from "../../service/order";
import ListOrder from "./ListOrder";
import {
  ItemPagination,
  StyledCommonModalTimeLine,
  TotalOrder,
  WrapperOrderManagement,
} from "./styles";

export default function OrderManagement() {
  const [
    page,
    setPage,
    limit,
    setLimit,
    keyword,
    setKeyword,
    totalItem,
    setTotalItem,
    isOpenModal,
    setIsOpenModal,
  ] = useSharedStateUtils();
  const [methodPayment, setMethodPayment] = useState<any>();
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [orderStatus, setOrderStatus] = useState<OrderStatus>();
  const [sortMoney, setSortMoney] = useState(SORT);
  const [saveTimeline, setSaveTimeline] = useState([]);
  const appContext = useContext(AppContext);
  const { startIndex, endIndex } = calculateIndices(page, limit, totalItem);
  const { arrOrderStatus, classNameStatus, colorStatus } = OrderStatusUtils();
  const queryParams = {
    keyword,
    sortMoney,
    methodPayment,
    orderStatus,
    startDate,
    endDate,
    limit,
    page,
  };
  const { isLoading } = useQuery(
    ["getListOrder", queryParams],
    () => getListOrder(queryParams),
    {
      onSuccess: (data) => {
        setTotalItem(data.data?.totalOrders);
        appContext?.setListOrder(data?.data?.data);
      },
      onError: (err) => toast.error(ERROR_MESSAGES.SERVER_ERROR),
    }
  );
  // xử lý select limit
  const handleSelectLimit = (value: number) => {
    setLimit(value);
    setPage(1); // set page về 1 để luôn luôn dc hiển thị đơn hàng, và tránh tình trạng người dùng chọn limit quá tổng số lượng đơn hàng và trả về k có đơn hàng
  };
  // hàm đóng modal timeLine
  const cancelModalTimeline = () => setIsOpenModal(false);

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

      {!appContext?.saveListOrder?.length && !isLoading ? (
        <NoDataMessage message={NO_DATA_MESSAGE.NO_ORDER} />
      ) : (
        <ItemPagination>
          <Pagination
            current={page}
            pageSize={limit}
            total={totalItem}
            onChange={(page) => setPage(page)}
          />
          <TotalOrder>
            Hiển thị từ đơn hàng thứ {startIndex} đến {endIndex} trên tổng
            {totalItem} đơn hàng
            <SelectGeneral
              options={optionsLimit}
              defaultValue={limit}
              onChange={handleSelectLimit}
            />
            trên 1 trang.
          </TotalOrder>
        </ItemPagination>
      )}

      {/* Modal timeLine */}
      <StyledCommonModalTimeLine
        open={isOpenModal}
        onCancel={cancelModalTimeline}
        footer={false}
        centered={true}
      >
        <Timeline
          className="timeLine"
          mode="left" // mode kiểu hiện thị của timeline
          items={saveTimeline?.map((item: any) => {
            return {
              label: formatDateFromISO(item?.timeUpdate),
              color: colorStatus(item.status),
              children: (
                <div className={classNameStatus(item.status)}>
                  {arrOrderStatus(item.status)}
                </div>
              ),
            };
          })}
        />
      </StyledCommonModalTimeLine>
    </WrapperOrderManagement>
  );
}
