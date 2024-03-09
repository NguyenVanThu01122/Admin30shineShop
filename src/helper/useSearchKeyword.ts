import { useCallback, useState } from "react";

export const useSearchKeywordUltis = (
  setPage: (value: number) => void,
  setKeyword: (value: string) => void
) => {
  const [fnTimeout, setFnTimeout] = useState<any>();
  // hàm xử lý tìm kiếm kết hợp debounce
  const handleChangeKeyword = useCallback(
    (value: string) => {
      clearTimeout(fnTimeout); // xóa bỏ bất kỳ timeout cũ trước khi thiết lập timeout mới
      setFnTimeout(
        setTimeout(() => {
          setKeyword(value);
          setPage(1);
        }, 1000)
      );
    },
    [setKeyword, setPage, fnTimeout]
  );
  return { handleChangeKeyword };
};

//  // xử lý tìm kiếm kết hợp thư viện lodash debounce
//  const handleChangeKeyword = useCallback(
//   debounce((value: string) => {
//     setKeyword(value);
//     setPage(1);
//   }, 1000),
//   [setKeyword]
// );
