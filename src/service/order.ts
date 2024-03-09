import { privateAxios } from "./axios";
enum PaymentMethod {
  OFFLINE = "offline",
  ONLINE = "online",
}
export enum OrderStatus {
  PROCESSING = "processing",
  CONFIRMED = "confirmed",
  IN_TRANSIT = "in_transit",
  DELIVERED = "delivered",
  CANCELED = "canceled",
}
interface getListOrderType {
  keyword: string;
  sortMoney: number;
  methodPayment: PaymentMethod;
  orderStatus: OrderStatus | undefined;
  startDate: string | null;
  endDate: string | null;
  limit: number;
  page: number;
}

export const getListOrder = (params: getListOrderType) => {
  return privateAxios.get("/admin/order", { params });
};

export const getTimeLine = (orderId: string) => {
  return privateAxios.get(`/admin/order/detail-timeline/${orderId}`);
};

export const updateStatusOrder = (
  orderId: string,
  orderStatus: { orderStatus: string }
) => {
  return privateAxios.put(`/admin/order/${orderId}`, orderStatus);
};
