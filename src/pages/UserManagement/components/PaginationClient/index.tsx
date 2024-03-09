import PaginationGeneral from "../../../../components/Ui/pagination";
import { SelectGeneral } from "../../../../components/Ui/select";
import { calculateIndices } from "../../../../helper/calculateIndices";
import { optionsLimit } from "../../../../helper/formOptions";
import { QuantityUser, WrapperPagination } from "./styles";

export default function PaginationClient({
  page,
  limit,
  totalUsers,
  setPage,
  setLimit,
}: {
  page: number;
  limit: number;
  setLimit: (value: number) => void;
  totalUsers: number;
  setPage: (value: number) => void;
}) {
  const { startIndex, endIndex } = calculateIndices(page, limit, totalUsers);
  // xử lý select limit
  const handleSelectLimit = (value: number) => {
    setLimit(value);
    setPage(1); // set page về 1 để luôn luôn dc hiển thị user, và tránh tình trạng người dùng chọn limit quá tổng số lượng user và trả về k có user
  };
  return (
    <WrapperPagination>
      <PaginationGeneral
        current={page}
        pageSize={limit}
        total={totalUsers}
        onChange={(page) => setPage(page)}
      />
      <QuantityUser>
        Hiển thị thông tin khách hàng từ thứ {startIndex} đến {endIndex} trên
        tổng {totalUsers} thông tin khách hàng
        <SelectGeneral
          size="large"
          options={optionsLimit}
          defaultValue={limit}
          onChange={handleSelectLimit}
        />{" "}
        trên 1 trang.
      </QuantityUser>
    </WrapperPagination>
  );
}
