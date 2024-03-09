import moment from "moment";

export const handleformatDate = (value: string) => {
  const date = new Date(value);
  const formatDate = date.toLocaleDateString("vi-VN");
  // sử dụng method tolocaleDateString để chuyển đổi đối tượng date thành chuỗi ngày với định dạng ngày, tháng, năm theo tiêu chuẩn vn
  return formatDate;
};

export const formatDateFromISO = (isoString: string) => {
  const formattedDate = moment(isoString).format("HH:mm DD/MM/YYYY"); // dùng monment biến đổi ra chuỗi ngày tháng mong muốn
  return formattedDate;
};
