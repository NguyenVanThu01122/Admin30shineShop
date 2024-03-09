import { useCallback } from "react";
import PaginationGeneral from "../../../../components/Ui/pagination";
import { SelectGeneral } from "../../../../components/Ui/select";
import { calculateIndices } from "../../../../helper/calculateIndices";
import { optionsLimit } from "../../../../helper/formOptions";
import { WrapperPagination } from "./styles";

interface PaginationBrandProps {
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  totalBrands: number;
  setListBrandId: (listBrandId: any[]) => void;
}
export default function PaginationBrand({
  page,
  setPage,
  limit,
  setLimit,
  totalBrands,
  setListBrandId,
}: PaginationBrandProps) {
  const { startIndex, endIndex } = calculateIndices(page, limit, totalBrands); //  sử dụng cú pháp destructuring truy cập startIndex endIndex từ calculateIndices
  // hàm xử lý page
  const handleChangePage = useCallback(
    (page: number) => {
      setPage(page);
      setListBrandId([]);
      (document.getElementById("checkbox-all") as any).checked = false;
    },
    [setPage]
  );

  // hàm xử lý limit
  const handChangeSelectLimit = useCallback(
    (value: number) => {
      setLimit(value);
      setPage(1);
    },
    [setLimit]
  );

  return (
    <WrapperPagination>
      <PaginationGeneral
        current={page}
        pageSize={limit}
        total={totalBrands}
        onChange={handleChangePage}
      />
      <div className="display-total-brand">
        Hiển thị từ thương hiệu thứ {startIndex} đến {endIndex} trên tổng{" "}
        {totalBrands} thương hiệu
        <SelectGeneral
          defaultValue={limit}
          options={optionsLimit}
          onChange={handChangeSelectLimit}
        />{" "}
        trên 1 trang.
      </div>
    </WrapperPagination>
  );
}
