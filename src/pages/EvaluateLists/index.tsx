import { Input, Pagination, Select, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveListEvaluate } from "../../redux/actions/productManagenment";
import { privateAxios } from "../../service/axios";
import { ItemPagination, ItemTable, WrapperEvaluateList } from "./styles";

const selectLimits = [
  { value: 5, label: 5 },
  { value: 10, label: 10 },
  { value: 15, label: 15 },
  { value: 20, label: 20 },
  { value: 25, label: 25 },
];

export function EvaluateLists() {
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const evaluates = useSelector((state: any) => state?.app?.listEvaluate);

  // xử lý colunms của table
  const colunms = [
    {
      title: "STT",
      dataIndex: "productId",
      key: "productId",
      width: "100px",
      render: (value: String, record: any, index: number) => {
        return <div>{(page - 1) * limit + 1 + index}</div>;
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
      width: "200px",
      render: (value: string, record: any) => {
        return (
          <div
            className="name-product"
            onClick={() => navigate(`/evaluate-detail/${record?.productId}`)}
          >
            {value}
          </div>
        );
      },
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
      render: (value: number) => {
        return <div>{Math.ceil(value)}</div>; // math.ceil làm tròn lên
      },
    },
    { title: "1 sao", dataIndex: "star1", key: "star1" },
    { title: "2 sao", dataIndex: "star2", key: "star2" },
    { title: "3 sao", dataIndex: "star3", key: "star3" },
    { title: "4 sao", dataIndex: "star4", key: "star4" },
    { title: "5 sao", dataIndex: "star5", key: "star5" },
  ];

  // hàm lấy danh sách đánh giá
  const handleGetListEvaluate = () => {
    const params = {
      keyword,
      page,
      limit,
    };
    privateAxios
      .get("/admin/evaluate/", {
        params,
      })
      .then((res) => {
        dispatch(saveListEvaluate(res.data?.data));
        setTotalProducts(res.data?.totalProducts);
      })
      .catch((error) => {
        message.error(error.response.data?.message);
      });
  };

  const handleChangeKeyword = (e: any) => {
    setKeyword(e.target.value);
    setPage(1);
  };

  const handChangeSelectLimit = (value: any) => {
    setLimit(value);
    setPage(1);
  };

  useEffect(() => {
    handleGetListEvaluate();
  }, [limit, page, keyword]);
  return (
    <WrapperEvaluateList>
      <div className="list-evaluate">
        <div>DANH SÁCH ĐÁNH GIÁ</div>
        <Input
          className="input-keyword"
          onChange={handleChangeKeyword}
          size="large"
          placeholder="Vui lòng nhập tên"
        ></Input>
      </div>

      <ItemTable
        columns={colunms}
        dataSource={evaluates}
        scroll={{ y: 400 }}
        pagination={false}
      ></ItemTable>

      <ItemPagination>
        <Pagination
          current={page}
          pageSize={limit}
          total={totalProducts}
          onChange={(page) => setPage(page)}
        ></Pagination>
        <div className="display-total-evaluate">
          Hiển thị từ sản phẩm thứ {(page - 1) * limit + 1} đến{" "}
          {page * limit > totalProducts ? totalProducts : page * limit} trên
          tổng {totalProducts} thương hiệu{" "}
          <Select
            defaultValue={limit}
            options={selectLimits}
            onChange={handChangeSelectLimit}
          />{" "}
          trên 1 trang.
        </div>
      </ItemPagination>
    </WrapperEvaluateList>
  );
}
