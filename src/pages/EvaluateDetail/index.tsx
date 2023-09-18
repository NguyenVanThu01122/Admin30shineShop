import { Pagination, Select, message } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import iconDelete from "../../images/icon-delete.svg";
import imgDelete from "../../images/img-delete.jpg";
import { privateAxios } from "../../service/axios";
import {
  ItemDetailEvaluate,
  ItemPagination,
  ModalAllowVisible,
  ModalDelete,
  WrapperEvaluateDetail,
} from "./styles";

const selectSortNumberStar = [
  { value: 0, label: "Mặc định" },
  { value: -1, label: "Giảm dần" },
  { value: 1, label: "Tăng dần" },
];
const selectSortTimeEvaluate = [
  { value: 0, label: "Mặc định" },
  { value: -1, label: "Giảm dần" },
  { value: 1, label: "Tăng dần" },
];
const selectLimits = [
  { value: 5, label: 5 },
  { value: 10, label: 10 },
  { value: 15, label: 15 },
  { value: 20, label: 20 },
  { value: 25, label: 25 },
];

export function EvaluateDetail() {
  const [sortDate, setSortDate] = useState("");
  const [sortStar, setSortStar] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const [listEvaluate, setlistEvaluate] = useState<any>([]);
  const [totalEvaluates, setTotalEvaluates] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [listOrderId, setListOrderId] = useState<any>([]);
  const [idEvaluate, setIdEvaluate] = useState("");
  const [isAllowVisivle, setIsAllowVisivle] = useState(false);
  const [allowVisible, setAllowVistble] = useState(false);

  const params = useParams();

  // hàm lấy chi tiết đánh giá
  const handleGetDetailEvaluate = () => {
    const objParams = {
      page,
      limit,
      sortDate,
      sortStar,
    };
    privateAxios
      .get(`/admin/evaluate/${params?.id}`, {
        params: objParams,
      })
      .then((res) => {
        setlistEvaluate(res.data?.data);
        setIdEvaluate(res.data?.data?.evaluateId);
        console.log(res.data?.data?.user);
        setTotalEvaluates(res.data?.totalEvaluates);
      })
      .catch((error) => {
        message.error(error.response.data?.message);
      });
  };

  // hàm xử lý cập nhật xuất hiện đánh giá
  const handleUpdateAllowVisible = () => {
    const objAllowVisible = {
      allowVisible: allowVisible ? false : true,
    };
    privateAxios
      .put(`/admin/evaluate/allow-visible/${params?.id}`, objAllowVisible)
      .then((res) => {
        message.success(res.data?.message);
        handleCanceAllowVisible();
      })
      .catch((error) => {
        message.error(error.response?.data?.message);
      });
  };

  // hàm mở modal cho phép đánh giá xuất hiện
  const showModalUdateAllowVisible = (allowVisible: boolean) => {
    setIsAllowVisivle(true);
    setAllowVistble(allowVisible);
  };
  // hàm hủy modal cho phép xuất hiện đánh giá
  const handleCanceAllowVisible = () => {
    setIsAllowVisivle(false);
  };

  // hàm xóa đánh gía
  const handleDeleteEvaluate = () => {
    privateAxios
      .delete(`/admin/evaluate/${listOrderId?.evaluateId}`)
      .then((res) => {
        message.success(res.data?.message);
        handleCancelModalDelete();
        handleGetDetailEvaluate();
      })
      .catch((error) => {
        message.error(error.response?.data?.message);
      });
  };

  const showModalDelete = () => {
    setIsOpenModal(true);
  };
  const handleCancelModalDelete = () => {
    setIsOpenModal(false);
  };

  const handChangeSelectLimit = (value: number) => {
    setLimit(value);
    setPage(1);
  };

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    handleGetDetailEvaluate();
  }, [limit, page, sortDate, sortStar]);

  return (
    <WrapperEvaluateDetail>
      <div className="item-evaluate">
        <div className="evaluate-list">DANH SÁCH ĐÁNH GIÁ CỦA SẢN PHẨM </div>
        <div className="group-select">
          <Select
            className="select"
            size="large"
            placeholder="Sắp xếp thời gian theo số sao"
            options={selectSortNumberStar}
            onChange={(value) => setSortDate(value)}
          ></Select>
          <Select
            className="select"
            size="large"
            placeholder="Sắp xếp đánh giá theo thời gian đánh giá"
            options={selectSortTimeEvaluate}
            onChange={(value) => setSortStar(value)}
          ></Select>
        </div>
      </div>

      <ItemDetailEvaluate>
        <div className="title-evaluate">
          {/* <Input size="small" type="checkbox"></Input> */}
          <div>Tên người dùng</div>
          <div>Đánh giá</div>
          <div>Số sao</div>
          <div>Thời gian đánh giá</div>
          <div>Sự xuất hiện</div>
          <div>Cập nhật sự xuất hiện</div>
          <div>Xóa</div>
        </div>
        {listEvaluate?.map((item: any) => {
          const isoString = item?.time?.createdAt; // láy chuỗi time ios
          const formattedDate = moment(isoString).format("HH:mm DD/MM/YYYY"); // dùng monment biến đổi ra chuỗi ngày tháng mong muốn
          return (
            <div className="detail-evaluate">
              {/* <Input
                onClick={() => handleClickItemCheckbox(item?.evaluateId)}
                size="small"
                type="checkbox"
                // checked={listOrderId?.includes(item?.evaluateId)} // kiểm tra sự tồn tại item.id nếu có thì trả về true, tức là checked là true và dc chọn.
              ></Input> */}
              <div>{item?.user}</div>
              <div>{item?.comment}</div>
              <div>{item?.star}</div>
              <div>{formattedDate}</div>
              <div>{item?.allowVisible ? "Có cho phép" : "Không cho phép"}</div>
              <div
                className="allow-visible"
                onClick={() => showModalUdateAllowVisible(item?.allowVisible)}
              >
                {item?.allowVisible
                  ? "Không cho phép xuất hiện"
                  : "Cho phép xuất hiện"}
              </div>
              <img
                className="iconDelete"
                onClick={showModalDelete}
                src={iconDelete}
                alt=""
              />
            </div>
          );
        })}
      </ItemDetailEvaluate>

      <ItemPagination>
        <Pagination
          current={page}
          pageSize={limit}
          total={totalEvaluates}
          onChange={handleChangePage}
        />
        <div className="display-total-evaluate">
          Hiển thị từ sản phẩm thứ {(page - 1) * limit + 1} đến{" "}
          {page * limit > totalEvaluates ? totalEvaluates : page * limit} trên
          tổng {totalEvaluates} đánh giá{" "}
          <Select
            defaultValue={limit}
            options={selectLimits}
            onChange={handChangeSelectLimit}
          />{" "}
          trên 1 trang.
        </div>
      </ItemPagination>

      <ModalAllowVisible
        onOk={handleUpdateAllowVisible}
        open={isAllowVisivle}
        onCancel={handleCanceAllowVisible}
        centered
      >
        <div>Bạn có chắc chắn muốn cho phép xuất hiện không ?</div>
      </ModalAllowVisible>
      <ModalDelete
        onOk={handleDeleteEvaluate}
        open={isOpenModal}
        onCancel={handleCancelModalDelete}
        centered={true}
        width={350}
      >
        <div className="message-delete">
          <img src={imgDelete} alt="" />
          <div>Bạn có chắc chắn muốn xóa đánh giá này không ?</div>
        </div>
      </ModalDelete>
    </WrapperEvaluateDetail>
  );
}
