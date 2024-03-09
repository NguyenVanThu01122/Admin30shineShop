enum OrderStatus {
  Processing = "processing",
  Confirmed = "confirmed",
  InTransit = "in_transit",
  Delivered = "delivered",
  Canceled = "canceled",
}

export const OrderStatusUtils = () => {
  // hàm xử lý trạng thái đơn hàng
  const arrOrderStatus = (status: OrderStatus) => {
    switch (status) {
      case "processing":
        return "Đang xử lý";
      case "confirmed":
        return "Đã xác nhận";
      case "in_transit":
        return "Đang giao hàng";
      case "delivered":
        return "Đã giao hàng";
      case "canceled":
        return "Đã hủy";
      default:
        return "";
    }
  };

  // hàm xử lý màu sắc trạng thái đơn hàng
  const colorStatus = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Processing:
        return "blue-status";
      case OrderStatus.Confirmed:
        return "yellow-status";
      case OrderStatus.InTransit:
        return "orange-status";
      case OrderStatus.Delivered:
        return "green-status";
      case OrderStatus.Canceled:
        return "red-status";
      default:
        return "";
    }
  };

  return { arrOrderStatus, colorStatus };
};
