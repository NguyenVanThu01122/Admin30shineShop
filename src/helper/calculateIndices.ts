// hàm tính toán chỉ số cho các page
export const calculateIndices = (
  page: number,
  limit: number,
  totalItem: number
) => {
  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, totalItem); //Math.min để đảm bảo chỉ số kết thúc không vượt quá tổng số sản phẩm.
  return { startIndex, endIndex };
};

// hàm
export const calculateRowNumber = (
  page: number,
  limit: number,
  index: number
) => {
  return (page - 1) * limit + 1 + index;
};
