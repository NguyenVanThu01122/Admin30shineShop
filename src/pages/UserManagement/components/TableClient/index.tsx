import { FormInstance } from "antd";
import React, { useCallback, useContext } from "react";
import ActionIcons from "../../../../components/ActionIcons";
import { AppContext } from "../../../../context";
import { calculateRowNumber } from "../../../../helper/calculateIndices";
import { formatCurrency } from "../../../../helper/formatCurrency";
import { handleformatDate } from "../../../../helper/handleFormatDate";
import { StyledTableGeneral } from "./styles";
interface TableClientProps {
  form: FormInstance;
  isLoading: boolean;
  page: number;
  limit: number;
  setIsOpenModal: (value: boolean) => void;
  setEditUser: (value: any) => void;
  setIsModalDelete: (value: boolean) => void;
  setUserId: (value: string) => void;
}
const TableClient = React.memo(
  ({
    form,
    isLoading,
    page,
    limit,
    setIsOpenModal,
    setEditUser,
    setIsModalDelete,
    setUserId,
  }: TableClientProps) => {
    const appContext = useContext(AppContext); // dùng useContext để truy cập vào context

    // hàm mở modal sửa thông tin khách hàng
    const showModalEditClient = useCallback((record: any) => {
      setIsOpenModal(true);
      setEditUser(record);
      form.setFieldsValue({
        email: record?.email,
        name: record?.name,
        password: record?.password,
        gender: record?.gender,
        date: record?.date?.substring(0, 10),
        telephone: record?.telephone,
      });
    }, []);

    // hàm mở modal xóa khách hàng
    const showModalDeleteClient = useCallback(
      (id: string) => {
        setIsModalDelete(true);
        setUserId(id); // lưu id vao trong userId
      },
      [setIsModalDelete, setUserId]
    );

    const mapGenderToText = (gender: string) => {
      switch (gender) {
        case "male":
          return "Nam";
        case "female":
          return "Nữ";
        default:
          return "Khác";
      }
    };

    // xử lý các title của table
    const columns = [
      {
        title: "STT",
        dataIndex: "stt",
        key: "stt",
        width: 60,
        render: (_: any, record: any, index: number) =>
          calculateRowNumber(page, limit, index),
      },
      {
        title: "Tên khách hàng",
        dataIndex: "name",
        key: "name",
        width: 170,
        render: (value: string) => {
          return <div className="name-user">{value}</div>;
        },
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: 220,

        render: (value: string) => {
          return <div className="email-user">{value}</div>;
        },
      },
      {
        title: "Số điện thoại",
        dataIndex: "telephone",
        key: "telephone",
      },
      {
        title: "Ngày sinh",
        dataIndex: "date",
        key: "date",
        render: (value: string) => handleformatDate(value),
      },
      {
        title: "Giới tính",
        dataIndex: "gender",
        key: "gender",
        render: (value: string) => {
          return <div className="gender-user">{mapGenderToText(value)}</div>;
        },
      },
      {
        title: "Tổng tiền mua",
        dataIndex: "totalMoney",
        key: "totalMoney",
        render: (value: number) => (
          <div className={value ? "total-money" : ""}>
            {formatCurrency(value)} VND
          </div>
        ),
      },
      {
        title: "Hành động",
        dataIndex: "action",
        key: "action",
        width: 120,
        render: (_: any, record: any) => (
          <ActionIcons
            onEdit={() => showModalEditClient(record)}
            onDelete={() => showModalDeleteClient(record?.id)}
          />
        ),
      },
    ];

    return (
      <StyledTableGeneral
        loading={isLoading}
        scroll={{ y: 360 }}
        dataSource={appContext?.saveUser}
        columns={columns}
        pagination={false}
      />
    );
  }
);
export default TableClient;
