// xử lý các option của thẻ select


export const optionForm = [
  { value: "Dầu gội đầu", lable: "Dầu gội đầu" },
  { value: "Sữa tắm", lable: "Sữa tắm" },
  { value: "Nước hoa", lable: "Nước hoa" },
  { value: "miếng dán mụn", lable: "Sữa tắm" },
  { value: "Kem chống nắng", lable: "Kem chống nắng" },
  { value: "Kem tẩy tế bào chết", lable: "Kem tẩy tế bào chết" },
];

export const selectSortDate = [
  { value: 0, label: "Mặc định" },
  { value: -1, label: "Ngày giảm dần" },
  { value: 1, label: "Ngày tăng dần" },
];

export const optionGender = [
  { value: "male", label: "Nam" },
  { value: "female", label: "Nữ" },
  { value: "other", label: "Khác" },
];
// select limit
export const optionsLimit = [
  { value: 5, label: 5 },
  { value: 10, label: 10 },
  { value: 15, label: 15 },
  { value: 20, label: 20 },
  { value: 25, label: 25 },
];

// chọn selectSort theo tiền
export const selectSort = [
  { value: 0, label: "Sắp xếp theo tổng tiền mua giảm dần" },
  { value: -1, label: "Sắp xếp theo tổng tiền mua mặc định" },
  { value: 1, label: "Sắp xếp theo tổng tiền mua tăng dần" },
];
// chọn hình thức thanh toán
export const selectPayment = [
  { value: "offline", label: "offline" },
  { value: "online", label: "online" },
];
// chọn trạng thái đơn hàng
export const selectStatus = [
  { value: "processing", label: "Đang xử lý" },
  { value: "confirmed", label: "Đã xác nhận" },
  { value: "in_transit", label: "Đang giao hàng" },
  { value: "delivered", label: "Đã giao hàng" },
  { value: "canceled", label: "Đã hủy" },
];

