import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, Pagination, Select, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import iconDelete from "../../images/icon-delete.svg";
import iconEdit from "../../images/icon-edit.svg";
import { savelistUsers } from "../../redux/actions/productManagenment";
import { privateAxios } from "../../service/axios";
import {
  ItemModalForm,
  ItemModaleDelete,
  ItemPagination,
  ItemTable,
  WrapperInformation,
} from "./styles";

// select limit
const optionsLimit = [
  { value: 5, label: 5 },
  { value: 10, label: 10 },
  { value: 15, label: 15 },
  { value: 20, label: 20 },
  { value: 25, label: 25 },
];
// select sort
const selectOptions = [
  { value: 0, label: "Sắp xếp theo tổng tiền mua giảm dần" },
  { value: -1, label: "Sắp xếp theo tổng tiền mua mặc định" },
  { value: 1, label: "Sắp xếp theo tổng tiền mua tăng dần" },
];

function UserManagement() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(-1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [userId, setUserId] = useState("");
  const [editUser, setEditUser] = useState<any>(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state?.app?.listUsers); // lấy dữ liệu user trên store

  // xử lý các title của table
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 80,
      render: (_: any, record: any, index: number) => {
        return (page - 1) * limit + 1 + index;
      },
    },
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
      render: (value: string) => {
        return <div className="name-user">{value}</div>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
      render: (value: string) => {
        const date = new Date(value); // chuyển đổi value thành đối tượng
        const formatDate = date.toLocaleDateString("vi-VN"); // sử dụng method tolocaleDateString để chuyển đổi đối tượng date thành chuỗi ngày với định dạng ngày, tháng, năm theo tiêu chuẩn vn
        return <div>{formatDate}</div>;
      },
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (value: string) => {
        return (
          <div className="gender-user">
            {value === "male" ? "Nam" : value === "female" ? "Nữ" : "Khác"}
          </div>
        );
      },
    },
    {
      title: "Tổng tiền mua",
      dataIndex: "totalMoney",
      key: "totalMoney",
      render: (value: number) => {
        return (
          <div className={value > 0 ? "total-money" : ""}>{value} VND</div>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: any) => {
        return (
          <div className="group-icon">
            <img
              src={iconEdit}
              alt=""
              onClick={() => showModalEditClient(record)}
            />
            <img
              src={iconDelete}
              alt=""
              onClick={() => showModalDeleteClient(record?.id)}
            />
          </div>
        );
      },
    },
  ];

  // hàm handleFinish được gọi khi tất cả các requied trong rules được định nghĩa có giá trị, và nội dung trong hàm dc gọi theo điều kiện if else
  const handleFinish = (value: any) => {
    if (editUser) {
      const bodyEditUser = {
        name: value?.name,
        gender: value?.gender,
        telephone: value?.telephone,
        date: value?.date,
      };
      privateAxios
        .put(`/admin/user/${editUser?.id}`, bodyEditUser)
        .then((res) => {
          setEditUser(null);
          handleCancelModal();
          handleGetListUser();
          message.success(res.data?.message);
        })
        .catch((error) => {
          message.error(error.response?.data?.message);
        });
    } else {
      const params = {
        name: value?.name,
        password: value?.password,
        email: value?.email,
        gender: value?.gender,
        date: value?.date,
        telephone: value?.telephone,
      };
      privateAxios
        .post("/admin/user", params)
        .then((res) => {
          handleGetListUser();
          setPage(1);
          form.resetFields();
          message.success(res.data?.message);
          setIsOpenModal(false);
        })
        .catch((error) => {
          message.error(error.response?.data?.message);
        });
    }
  };

  // hàm lấy danh sách user
  const handleGetListUser = () => {
    const params = {
      limit,
      page,
      sort,
      keyword,
    };
    privateAxios
      .get("/admin/user", {
        params,
      })
      .then((res) => {
        dispatch(savelistUsers(res.data?.data)); // dùng dispatch bắn action listUsers lên reducers
        setTotalUsers(res.data?.totalUsers); // lưu tổng số lượng users vào totalUsers
      })
      .catch((error) => {});
  };
  // hàm mở modal thêm thông tin khách hàng
  const showModalAddClient = () => {
    setIsOpenModal(true);
    setEditUser(null);
  };

  // hàm hủy bỏ modal
  const handleCancelModal = () => {
    setIsOpenModal(false);
    form.resetFields();
  };

  // hàm mở modal sửa thông tin khách hàng
  const showModalEditClient = (record: any) => {
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
  };

  // hàm xóa thông tin khách hàng
  const handleDeleteClient = () => {
    privateAxios
      .delete(`/admin/user/${userId}`)
      .then((res) => {
        handleGetListUser(); // gọi lại listUser cập nhật dữ liệu mới
        setIsOpenModalDelete(false); // đóng modal
        message.success(res.data?.message);
      })
      .catch((error) => {
        message.error(error.response?.data?.message);
      });
  };
  // hàm mở modal xóa khách hàng
  const showModalDeleteClient = (id: string) => {
    setIsOpenModalDelete(true);
    setUserId(id); // lưu id vao trong userId
  };
  // hàm hủy modal xóa khách hàng
  const handleCancelModalDelete = () => {
    setIsOpenModalDelete(false);
  };

  // hàm gưi form lên server
  const handleSubmitForm = () => {
    form.submit();
  };

  // hàm lấy giá trị input, và lưu giá trị vào state keyword
  const handleChangeKeyword = (e: any) => {
    setKeyword(e.target.value);
    setPage(1); // set page 1 với mục đích hiển thị user tìm kiếm ở  page 1 (ví dụ: đang ở page 2 và limit la 10, khi tìm kiếm user ở page 2 thì user tìm kiếm chỉ có 1, và muốn hiển thị usưr tìm kiếm ở page 2, thì user tìm kiếm phải có số lượng vượt quá số lượng limit ở page 1 )
  };
  // hàm xử lý khi click vào page thì set lại giá trị của page vừa click vào state page
  const handleChangePage = (page: number) => {
    setPage(page);
  };
  // xử lý select sort
  const handleChangeSelectSort = (value: number) => {
    setSort(value);
  };
  // xử lý select limit
  const handleSelectLimit = (value: number) => {
    setLimit(value);
    setPage(1); // set page về 1 để luôn luôn dc hiển thị user, và tránh tình trạng người dùng chọn limit quá tổng số lượng user và trả về k có user
  };

  useEffect(() => {
    handleGetListUser();
  }, [keyword, page, limit, sort]);

  return (
    <WrapperInformation>
      <div className="item-title-client">
        <div>Quản Lý Khách Hàng</div>
        <div className="item-list-client">
          <div>Danh sách khách hàng</div>
          <div className="item-select">
            <div className="select-input">
              <Input
                value={keyword}
                onChange={handleChangeKeyword}
                size="large"
                placeholder="Vui lòng nhập tên khách hàng"
              />
              <Select
                className="select"
                size="large"
                onChange={handleChangeSelectSort}
                value={sort}
                options={selectOptions}
                placeholder="Sắp xếp theo tổng tiền đã mua"
              />
            </div>
            <Button
              className="button-addClient"
              onClick={showModalAddClient}
              size="large"
            >
              <FontAwesomeIcon className="plus" icon={faPlus} />
              <span>Thêm khách hàng</span>
            </Button>
          </div>
          <ItemTable
            scroll={{ y: 380 }}
            dataSource={users}
            columns={columns}
            pagination={false}
          />
        </div>
      </div>
      {users?.length > 0 ? (
        <ItemPagination>
          <Pagination
            current={page} // page hiện tại
            pageSize={limit} // tổng số sp hiện trên 1 page
            total={totalUsers} //tổng số lương thông tin người dùng
            onChange={handleChangePage} // khi click vào page hàm onchange này sẽ set page vừa click vào state page
          />
          <div className="quantity-user">
            Hiển thị thông tin khách hàng từ thứ {(page - 1) * limit + 1} đến{" "}
            {page * limit > totalUsers ? totalUsers : page * limit} trên tổng{" "}
            {totalUsers} thông tin khách hàng
            <Select
              size="large"
              options={optionsLimit}
              defaultValue={limit}
              onChange={handleSelectLimit}
            />{" "}
            trên 1 trang.
          </div>
        </ItemPagination>
      ) : (
        <div className="no-client">Không có thông tin khách hàng nào !</div>
      )}

      <ItemModalForm
        open={isOpenModal}
        onCancel={handleCancelModal}
        footer={false}
      >
        <Form
          className="item-form"
          onFinish={handleFinish}
          form={form}
          labelCol={{ span: 6 }} // tiêu đề
          wrapperCol={{ span: 18 }} // input
        >
          <Form.Item
            name="name"
            label="Tên khách hàng"
            rules={[
              { required: true, message: "Vui lòng nhập tên !" },
              {
                max: 50,
                message: "Vui lòng nhập tối đa 50 ký tự!",
              },
            ]}
          >
            <Input size="large" placeholder="Vui lòng nhập tên" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email !" },
              () => ({
                validator(_, value: string) {
                  if (value.includes("@") === false && value !== "") {
                    return Promise.reject(
                      new Error("Vui lòng nhập đúng định dạng !")
                    );
                  } else {
                    return Promise.resolve();
                  }
                },
              }),
            ]}
          >
            <Input
              maxLength={30} // chỉ cho phép nhập tối đa 30 ký tự
              disabled={editUser ? true : false}
              // readOnly={editUser ? true : false}  // chỉ hiển thị value của input, không thể sửa được value đó
              size="large"
              placeholder="Vui lòng nhập email"
            />
          </Form.Item>
          {!editUser && (
            <Form.Item
              name="password"
              label="Mật khẩu"
              // hasFeedback
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu !" }]}
            >
              <Input.Password
                disabled={editUser ? true : false}
                hidden={true}
                size="large"
                placeholder="Vui lòng nhập mật khẩu"
              />
            </Form.Item>
          )}

          <Form.Item
            name="gender"
            label="Giới tính"
            rules={[{ required: true, message: "Vui lòng nhập giới tính !" }]}
          >
            <Select
              options={[
                { value: "male", label: "Nam" },
                { value: "female", label: "Nữ" },
                { value: "other", label: "Khác" },
              ]}
              size="large"
              placeholder="Vui lòng chọn giới tính"
            />
          </Form.Item>
          <Form.Item
            name="telephone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại !" },
              () => ({
                validator(_, value: any) {
                  if (value[0] !== "0" && value !== "") {
                    return Promise.reject(
                      new Error("Vui lòng nhập đúng định dạng !")
                    );
                  } else if (
                    (Number(value.length) < 10 || Number(value.length) > 10) &&
                    value !== ""
                  ) {
                    return Promise.reject(
                      new Error("Vui lòng nhập đủ 10 chữ số !")
                    );
                  } else {
                    return Promise.resolve();
                  }
                },
              }),
            ]}
          >
            <Input
              type="number"
              size="large"
              placeholder="Vui lòng nhập số điện thoại"
            />
          </Form.Item>
          <Form.Item
            name="date"
            label="Ngày sinh"
            rules={[{ required: true, message: "Vui lòng nhập ngày sinh !" }]}
          >
            <Input type="date" size="large" />
          </Form.Item>
        </Form>
        {editUser ? (
          <div className="group-button">
            <Button
              className="button-cancel"
              size="large"
              onClick={handleCancelModal}
            >
              Hủy
            </Button>
            <Button
              onClick={handleSubmitForm}
              className="button-add"
              size="large"
            >
              Sửa thông tin khách hàng
            </Button>
          </div>
        ) : (
          <div className="group-button">
            <Button
              className="button-cancel"
              size="large"
              onClick={handleCancelModal}
            >
              Hủy
            </Button>
            <Button
              onClick={handleSubmitForm}
              className="button-add"
              size="large"
            >
              Thêm khách hàng
            </Button>
          </div>
        )}
      </ItemModalForm>

      <ItemModaleDelete
        open={isOpenModalDelete}
        onOk={handleDeleteClient}
        onCancel={handleCancelModalDelete}
        width={350}
      >
        <img
          className="icon-delete"
          src="https://img.myloview.com/posters/trash-can-icon-delete-remove-symbol-dustbin-recycle-bin-icon-garbage-can-400-196758048.jpg"
          alt=""
        />
        <div className="title-modal-delete">
          Bạn có chắc chắn muốn xóa thông tin này ?
        </div>
      </ItemModaleDelete>
    </WrapperInformation>
  );
}
export default UserManagement;
