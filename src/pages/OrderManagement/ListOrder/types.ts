import { Dayjs } from "dayjs";
import { OrderStatus } from "../../../service/order";

export interface OrderStatusPanelProps {
  isOpenStatusOrder: boolean;
  cancelStatusOrder: () => void;
  openStatusOrder: () => void;
  setUpdateStatus: (value: any) => void;
  handleUpdateStatusOrder: (record: any) => void;
  record: TypeOrders;
}

export interface ListOrderProps {
  page: number;
  limit: number;
  setKeyword: (keyword: string) => void;
  setPage: (page: number) => void;
  setStartDate: (date: Dayjs | null) => void;
  setEndDate: (date: Dayjs | null) => void;
  sortMoney: number;
  setSortMoney: (value: number) => void;
  setMethodPayment: (value: string) => void;
  isLoading: boolean;
  setSaveTimeline: (timeline: any) => void;
  setOrderStatus: (status: OrderStatus) => void;
  setIsOpenModal: (isOpen: boolean) => void;
}

export interface TypeColumns {
  title: string;
  dataIndex: string;
  key: string;
  width?: string | number;
  render?: (
    value: string | number | boolean | any,
    record: any,
    index: number
  ) => JSX.Element | string | number | null;
}

export interface TypeProductsInfo {
  id: string;
  image: string;
  name: string;
  price: number;
  amount: number;
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  gender: string;
  date: string;
  telephone: string;
}

export interface TypeOrders {
  orderId: string;
  userInfo: UserInfo;
  productsInfo: TypeProductsInfo[];
  totalOriginPrice: number;
  deliveryPrice: number;
  totalPrice: number;
  methodPayment: string;
  noteOrder: string;
  orderStatus: string;
  createdAt: string;
}
