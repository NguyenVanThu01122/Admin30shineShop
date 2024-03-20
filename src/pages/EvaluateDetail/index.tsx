import { Pagination } from "antd";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import { ButtonGeneral } from "../../components/Ui/button";
import { SelectGeneral } from "../../components/Ui/select";
import { calculateIndices } from "../../helper/calculateIndices";
import { LIMIT, PAGE, PLACEHOLDER, STRING } from "../../helper/constants";
import {
  optionsLimit,
  selectSortNumberStar,
  selectSortTimeEvaluate,
} from "../../helper/formOptions";
import { formatDateFromISO } from "../../helper/handleFormatDate";
import {
  UpdateAllowVisible,
  deleteDetailEvaluate,
  getDetailEvaluate,
} from "../../service/detailEvaluate";
import { TypeColumn } from "../ProductManagement/components/TableProduct/type";
import {
  ContainerEvaluate,
  FilterSelect,
  ItemPagination,
  StyledModalAllowVisible,
  StyledModalDelete,
  StyledTableGeneral,
  TitlePage,
  TotalEvaluate,
  WrapperEvaluateDetail,
} from "./styles";
interface EvaluateType {
  allowVisible: true;
  comment: string;
  evaluateId: string;
  star: number;
  time: string;
  user: string;
}
export function EvaluateDetail() {
  const [page, setPage] = useState(PAGE);
  const [limit, setLimit] = useState(LIMIT);
  const [sortDate, setSortDate] = useState("");
  const [idEvaluate, setIdEvaluate] = useState("");
  const [sortStar, setSortStar] = useState("");

  const [listEvaluate, setListEvaluate] = useState<EvaluateType[]>();
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [showModalAllowVisible, setShowModalAllowVisible] = useState(false);
  const [isAllowVisible, setIsAllowVisible] = useState(false);
  const queryClient = useQueryClient();
  const params = useParams();
  const { startIndex, endIndex } = calculateIndices(
    page,
    limit,
    listEvaluate?.length ?? 0
  );

  const objParams = {
    page,
    limit,
    sortDate,
    sortStar,
  };
  // hàm lấy chi tiết đánh giá
  const { isLoading } = useQuery(
    ["GetDetailEvaluate", limit, page, sortDate, sortStar],
    () => getDetailEvaluate(params?.id ?? "", objParams),
    {
      onSuccess: (data) => {
        setListEvaluate(data.data?.data);
      },
      onError: (error: any) => toast.error(error.response.data?.message),
    }
  );

  const mutationUpdate = useMutation(
    (objAllowVisible: { allowVisible: boolean }) =>
      UpdateAllowVisible(idEvaluate, objAllowVisible),
    {
      onSuccess: (res) => {
        toast.success(res.data?.message);
        handleCancelAllowVisible();
        queryClient.invalidateQueries("GetDetailEvaluate");
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message);
        handleCancelAllowVisible();
      },
    }
  );

  // hàm xử lý cập nhật xuất hiện đánh giá
  const handleUpdateAllowVisible = () => {
    const objAllowVisible = {
      allowVisible: isAllowVisible,
    };
    mutationUpdate.mutate(objAllowVisible);
  };

  // hàm mở modal cho phép đánh giá xuất hiện
  const showModalUpdateAllowVisible = (evaluateId: string) => {
    setIdEvaluate(evaluateId);
    setShowModalAllowVisible(true);
  };

  // hàm hủy modal cho phép xuất hiện đánh giá
  const handleCancelAllowVisible = () => setShowModalAllowVisible(false);

  // hàm xóa đánh gía
  const mutationDeleteEvaluate = useMutation(
    "Delete-evaluate",
    () => deleteDetailEvaluate(idEvaluate),
    {
      onSuccess(data, variables, context) {
        toast.success(data.data?.message);
        handleCancelModalDelete();
        queryClient.invalidateQueries("GetDetailEvaluate");
      },
      onError: (error: any) => {
        handleCancelModalDelete();
        toast.error(error.response?.data?.message);
      },
    }
  );
  const handleDeleteEvaluate = () => {
    mutationDeleteEvaluate.mutate();
  };

  const showModalDelete = (evaluateId: string) => {
    setIdEvaluate(evaluateId);
    setIsOpenModalDelete(true);
  };

  const handleCancelModalDelete = () => setIsOpenModalDelete(false);

  const handleChangePage = (page: number) => setPage(page);

  const handChangeSelectLimit = (value: number) => {
    setLimit(value);
    setPage(1);
  };

  // Các cột trong bảng
  const columns: TypeColumn[] = [
    {
      title: "Tên người dùng",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Đánh giá",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Số sao",
      dataIndex: "star",
      key: "star",
    },
    {
      title: "Thời gian đánh giá",
      dataIndex: "time.createdAt",
      key: "time.createdAt",
      render: (value, record, index) => <div>{formatDateFromISO(value)}</div>,
    },
    {
      title: "Sự xuất hiện",
      dataIndex: "allowVisible",
      key: "allowVisible",
      render: (value, record) => (
        <div>{record.allowVisible ? "Có cho phép" : "Không cho phép"}</div>
      ),
    },
    {
      title: "Cập nhật sự xuất hiện",
      dataIndex: "allowVisible",
      key: "allowVisibleAction",
      render: (value, record) => (
        <ButtonGeneral
          type="primary"
          onClick={() => {
            if (record.allowVisible) {
              setIsAllowVisible(false);
            } else {
              setIsAllowVisible(true);
            }
            showModalUpdateAllowVisible(record.evaluateId);
          }}
        >
          {record.allowVisible
            ? "Không cho phép xuất hiện"
            : "Cho phép xuất hiện"}
        </ButtonGeneral>
      ),
    },
    {
      title: "Xóa",
      key: "delete",
      render: (value, record) => (
        <ButtonGeneral
          type="danger"
          onClick={() => showModalDelete(record.evaluateId)}
        >
          Xóa
        </ButtonGeneral>
      ),
    },
  ];

  return (
    <WrapperEvaluateDetail>
      <ContainerEvaluate>
        <TitlePage>CHI TIẾT CÁC ĐÁNH GIÁ CỦA SẢN PHẨM </TitlePage>
        <FilterSelect>
          <SelectGeneral
            className="select"
            size="large"
            placeholder={PLACEHOLDER.ARRANGE_TIME_BY_NUMBER_OF_STARS}
            options={selectSortNumberStar}
            onChange={(value) => setSortDate(value)}
          />
          <SelectGeneral
            className="select"
            size="large"
            placeholder={PLACEHOLDER.SORT_REVIEWS_BY_REVIEW_TIME}
            options={selectSortTimeEvaluate}
            onChange={(value) => setSortStar(value)}
          />
        </FilterSelect>
        <StyledTableGeneral
          loading={isLoading}
          dataSource={listEvaluate}
          columns={columns}
          pagination={false}
        />
      </ContainerEvaluate>

      <ItemPagination>
        <Pagination
          current={page}
          pageSize={limit}
          total={listEvaluate?.length}
          onChange={handleChangePage}
        />
        <TotalEvaluate>
          <div>
            Hiển thị từ sản phẩm thứ {startIndex} đến {endIndex} trên tổng
            {listEvaluate?.length} đánh giá
          </div>
          <SelectGeneral
            defaultValue={limit}
            options={optionsLimit}
            onChange={handChangeSelectLimit}
          />
          trên 1 trang.
        </TotalEvaluate>
      </ItemPagination>

      <StyledModalAllowVisible
        onOk={handleUpdateAllowVisible}
        open={showModalAllowVisible}
        onCancel={handleCancelAllowVisible}
        title={STRING.CONFIRM_AllOW_VISIBLE}
      />

      <StyledModalDelete
        onOk={handleDeleteEvaluate}
        open={isOpenModalDelete}
        onCancel={handleCancelModalDelete}
        width={500}
      >
        <ConfirmationDialog message={STRING.CONFIRM_DELETE_EVALUATE} />
      </StyledModalDelete>
    </WrapperEvaluateDetail>
  );
}
