import { useContext } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NoDataMessage from "../../components/NoDataMessage";
import { InputGeneral } from "../../components/Ui/input";
import PaginationGeneral from "../../components/Ui/pagination";
import { SelectGeneral } from "../../components/Ui/select";
import { AppContext } from "../../context";
import {
  calculateIndices,
  calculateRowNumber,
} from "../../helper/calculateIndices";
import { NO_DATA_MESSAGE, PLACEHOLDER } from "../../helper/constants";
import { optionsLimit } from "../../helper/formOptions";
import { useSearchKeywordUltis } from "../../helper/useSearchKeyword";
import { useSharedStateUtils } from "../../helper/useSharedState";
import { getListEvaluate } from "../../service/listEvaluate";
import { TypeColumns } from "../OrderManagement/ListOrder/types";
import {
  ItemPagination,
  SearchEvaluate,
  StyledTable,
  TitlePage,
  TotalEvaluate,
  WrapperEvaluateList,
} from "./styles";

export function EvaluateLists() {
  const [
    page,
    setPage,
    limit,
    setLimit,
    keyword,
    setKeyword,
    totalItem,
    seTotalItem,
  ] = useSharedStateUtils();
  const navigate = useNavigate();
  const { handleChangeKeyword } = useSearchKeywordUltis(setPage, setKeyword);
  const { startIndex, endIndex } = calculateIndices(page, limit, totalItem);
  const appContext = useContext(AppContext);

  const params = {
    page,
    limit,
    keyword,
  };
  const { isLoading } = useQuery(
    ["GetListEvaluate", page, limit, keyword],
    () => getListEvaluate(params),
    {
      onSuccess: (data) => {
        seTotalItem(data.data?.totalProducts);
        appContext?.setListEvaluate(data.data.data);
      },
      onError: (error: any) => toast.error(error.response.data?.message),
    }
  );

  // hàm render columns star
  const generateStarColumns = (numStars: number) => {
    const columns = [];
    for (let i = 1; i <= numStars; i++) {
      columns.push({
        title: `${i} sao`,
        dataIndex: `star${i}`,
        key: `star${i}`,
      });
    }
    return columns;
  };
  const starColumns = generateStarColumns(5); // Tạo danh sách cột từ 1 sao đến 5 sao

  const handChangeSelectLimit = (value: number) => {
    setLimit(value);
    setPage(1);
  };

  // xử lý columns của table
  const columns: TypeColumns[] = [
    {
      title: "STT",
      dataIndex: "productId",
      key: "productId",
      width: "100px",
      render: (value, record, index) => {
        return <div>{calculateRowNumber(page, limit, index)}</div>;
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
      width: "200px",
      render: (value, record) => (
        <div
          className="name-product"
          onClick={() => navigate(`/evaluate-detail/${record?.productId}`)}
        >
          {value}
        </div>
      ),
    },
    {
      title: "Tổng số đánh giá",
      dataIndex: "totalReviews",
      key: "totalReviews",
      width: "200px",
    },
    {
      title: "Số sao trung bình",
      dataIndex: "averageStars",
      key: "averageStars",
      width: "200px",
      render: (value) => {
        return <div>{Math.ceil(value)}</div>; // math.ceil làm tròn lên
      },
    },
    ...starColumns, // Sử dụng spread operator để nối mảng `starColumns` vào mảng `columns`
  ];

  return (
    <WrapperEvaluateList>
      <TitlePage>DANH SÁCH ĐÁNH GIÁ</TitlePage>
      <SearchEvaluate>
        <InputGeneral
          size="large"
          className="input-keyword"
          onChange={handleChangeKeyword}
          placeholder={PLACEHOLDER.PLEASE_ENTER_NAME_EVALUATE}
        />
      </SearchEvaluate>

      {/* table Evaluate */}
      <StyledTable
        loading={isLoading}
        columns={columns}
        dataSource={appContext?.saveListEvaluate}
        pagination={false}
      />

      {!appContext?.saveListEvaluate.length && !isLoading ? (
        <NoDataMessage message={NO_DATA_MESSAGE.NO_EVALUATE} />
      ) : (
        <ItemPagination>
          <PaginationGeneral
            current={page}
            pageSize={limit}
            total={totalItem}
            onChange={(page) => setPage(page)}
          />
          <TotalEvaluate>
            Hiển thị từ sản phẩm thứ {startIndex} đến {endIndex} trên tổng
            {totalItem} thương hiệu
            <SelectGeneral
              defaultValue={limit}
              options={optionsLimit}
              onChange={handChangeSelectLimit}
            />
            trên 1 trang.
          </TotalEvaluate>
        </ItemPagination>
      )}
    </WrapperEvaluateList>
  );
}
