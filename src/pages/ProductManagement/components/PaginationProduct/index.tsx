import PaginationGeneral from "../../../../components/Ui/pagination";
import { SelectGeneral } from "../../../../components/Ui/select";
import { calculateIndices } from "../../../../helper/calculateIndices";
import { optionsLimit } from "../../../../helper/formOptions";
import { InformationAmountProduct, Wrapper } from "./styles";

export default function PaginationProduct({
  page,
  totalProducts,
  limit,
  setLimit,
  setPage,
}: {
  page: number;
  totalProducts: number;
  limit: number;
  setLimit: (value: number) => void;
  setPage: (value: number) => void;
}) {
  const { startIndex, endIndex } = calculateIndices(page, limit, totalProducts);

  const handleChangeSelect = (value: number) => {
    setLimit(value);
    setPage(1);
  };

  return (
    <Wrapper>
      <PaginationGeneral
        current={page}
        total={totalProducts}
        pageSize={limit}
        onChange={(page) => setPage(page)}
      />
      <InformationAmountProduct>
        <div>
          Hiển thị từ sản phẩm thứ {startIndex} đến {endIndex} trên tổng{" "}
          {totalProducts} sản phẩm
        </div>
        <SelectGeneral
          options={optionsLimit}
          defaultValue={limit}
          onChange={handleChangeSelect}
        />
        <div>trên 1 trang</div>
      </InformationAmountProduct>
    </Wrapper>
  );
}
