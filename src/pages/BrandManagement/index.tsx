import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, Pagination, Select, message } from "antd";
import { useCallback, useContext, useState } from "react";
import iconDelete from "../../images/icon-delete.svg";
import iconEdit from "../../images/icon-edit.svg";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { AppContext } from "../../context";
import { privateAxios } from "../../service/axios";
import {
  addBrand,
  deleteBrand,
  getListBrand,
  updateBrand,
} from "../../service/brand";
import {
  ItemModal,
  ItemPagination,
  ItemTable,
  ModalDelete,
  WrapperBrandManagement,
} from "./styles";

// chọn SortDate
const selectSortDate = [
  { value: 0, label: "Mặc định" },
  { value: -1, label: "Ngày giảm dần" },
  { value: 1, label: "Ngày tăng dần" },
];
// chọn limit
const optionsLimit = [
  { value: 5, label: 5 },
  { value: 10, label: 10 },
  { value: 15, label: 15 },
  { value: 20, label: 20 },
  { value: 25, label: 25 },
];

export function BrandManagement() {
  const [keyword, setKeyword] = useState("");
  const [sortDate, setSortDate] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const [totalBrands, setTotalBrands] = useState<any>(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalDelte, setIsOpenModalDelete] = useState(false);
  const [editBrand, setEditBrand] = useState(null);
  const [idBrand, setIdBrand] = useState<any>("");
  const [isdeleteAll, setIsDeleteAll] = useState<any>(false);
  const [listBrandId, setListBrandId] = useState<any>([]);
  const [image, setImage] = useState<any>("");

  const [form] = Form.useForm();
  const appContext = useContext(AppContext); // dùng useContext để truy xuất vào context

  const queryClient = useQueryClient();

  // dùng useQuery thao tác với dữ liệu
  const { isLoading } = useQuery(
    ["getListBrand", keyword, sortDate, page, limit],
    () =>
      getListBrand({
        keyword,
        sortDate,
        page,
        limit,
      }),
    {
      onSuccess: (data: any) => {
        setTotalBrands(data.data?.totalBrands);
        appContext?.setSaveBrands(data.data?.data);
      },
      onError: (err: any) => {},
    }
  );

  // hàm xử lý chọn tất cả checkbox
  const handleClickCheckboxAll = useCallback(() => {
    const checkbox = (document.getElementById("checkbox-all") as any).checked;
    if (checkbox) {
      const arrIdBrand = appContext?.saveBrands.map((item: any) => item?.id);
      setListBrandId(arrIdBrand);
    } else {
      setListBrandId([]);
    }
  }, [appContext]);

  // xử lý colunms của table
  const colunms = [
    {
      title: (
        <input
          className="checkbox-all"
          id="checkbox-all"
          onClick={handleClickCheckboxAll}
          type="checkbox"
        />
      ),
      dataIndex: "checkbox",
      key: "checkbox",
      render: (value: any, record: any) => {
        return (
          <input
            className="item-checkbox"
            onClick={() => handleClickCheckbox(record?.id)}
            type="checkbox"
            checked={listBrandId.includes(record?.id) === true ? true : false}
          />
        );
      },
    },
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (value: string, record: any, index: number) => {
        return <div>{(page - 1) * limit + 1 + index}</div>;
      },
    },
    {
      title: "Tên thương hiệu",
      dataIndex: "name",
      key: "name",
      render: (value: string) => {
        return <div className="name-brand">{value}</div>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value: string) => {
        const date = new Date(value);
        const formatDate = date.toLocaleDateString("vi-VN"); // sử dụng method tolocaleDateString để chuyển đổi đối tượng date thành chuỗi ngày với định dạng ngày, tháng, năm theo tiêu chuẩn vn
        return <div>{formatDate}</div>;
      },
    },
    {
      title: "Ảnh thương hiệu",
      dataIndex: "image",
      key: "image",
      render: (value: string) => {
        return <img style={{ width: "100px" }} src={value}></img>;
      },
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (value: string, record: any) => {
        return (
          <div className="group-icon">
            <img
              onClick={() => showModalUpdate(record)}
              src={iconEdit}
              alt=""
            />
            <img
              onClick={() => showModalDeleteOne(record)}
              src={iconDelete}
              alt=""
            />
          </div>
        );
      },
    },
  ];

  // xử lý thêm brand
  const mutationAddBrand = useMutation(
    "addBrand",
    (body: any) => addBrand(body),
    {
      onSuccess: (data) => {
        message.success(data.data?.message);
        handelCancelModal();
        queryClient.refetchQueries(["getListBrand"]);
      },
      onError: (err: any) => {
        message.error(err.response?.data?.message);
      },
    }
  );

  // xử lý sửa brand
  const mutationEditBrand = useMutation(
    "editBrand",
    (payload: any) => updateBrand(payload.id, payload.body),
    {
      onSuccess: (data) => {
        message.success(data.data?.message);
        queryClient.refetchQueries(["getListBrand"]);
        handelCancelModal();
      },
      onError: (err: any) => {
        message.error(err.response?.data?.message);
      },
    }
  );

  // xử lý xóa brand
  const mutationDeleteBrand = useMutation(
    "deleteBrand",
    (id: string) => deleteBrand(id),
    {
      onSuccess: (data) => {
        message.success(data.data?.message);
        queryClient.refetchQueries(["getListBrand"]);
        handleCancelDelete();
      },
      onError: (err: any) => {
        message.error(err.response?.data?.message);
      },
    }
  );

  // hàm xử lý checkbox
  const handleClickCheckbox = (id: string) => {
    // khối if xử lý nếu k có id trong listBrandId thì thêm id vào cuối mảng listBrandId
    if (!listBrandId.includes(id)) {
      listBrandId.push(id);
      setListBrandId([...listBrandId]);
    }
    // khối else đc chạy khi có id trong mảng listBrandId, trong khối else xử lý loại bỏ id ra khỏi listBrandId
    else {
      const newArr = listBrandId.filter((item: any) => {
        if (item != id) {
          return true;
        }
      });
      setListBrandId(newArr);
    }
  };

  // hàm handleOnFinish xử lý create và update thương hiệu dựa theo điều kiện
  const handleOnFinish = (value: any) => {
    if (editBrand) {
      const bodyUpdate = {
        name: value?.name,
        image,
      };
      mutationEditBrand.mutate({
        id: idBrand?.id,
        body: bodyUpdate,
      });
    } else {
      const bodyCreate = {
        name: value?.name,
        image, // Chỗ này gửi đường dẫn ảnh base64 string lên, được lưu ở state
      };
      mutationAddBrand.mutate(bodyCreate);
    }
  };

  // hàm xóa 1 thương hiệu
  const handleDeleteOne = useCallback(() => {
    mutationDeleteBrand.mutate(idBrand?.id);
  }, [idBrand?.id]);

  // hàm mở modal xóa tất cả thương hiệu
  const showModalDeleteAll = useCallback(() => {
    setIsOpenModalDelete(true);
    setIsDeleteAll(true);
  }, []);

  // hàm xử lý xóa tất cả brand
  const handleDeleteBrandAll = useCallback(() => {
    const params = {
      idArr: listBrandId,
    };
    privateAxios
      .delete("/admin/brand/delete-many", { params })
      .then((res) => {
        message.success(res.data?.message);
        queryClient.refetchQueries(["getListBrand"]);
        (document.getElementById("checkbox-all") as any).checked = false;
        setListBrandId([]);
        setIsDeleteAll(false);
        handleCancelDelete();
      })
      .catch((error) => {
        message.error(error.response?.data?.message);
      });
  }, [listBrandId]);

  // hàm mở modal cập nhật
  const showModalUpdate = useCallback((record: any) => {
    setIsOpenModal(true);
    setIdBrand(record);
    setEditBrand(record);
    setImage(record?.image); //lưu image vào state để render ảnh
    form.setFieldsValue({
      name: record?.name,
    });
  }, []);

  // hàm hủy modal
  const handelCancelModal = useCallback(() => {
    setIsOpenModal(false);
    form.resetFields();
    setIdBrand("");
    setEditBrand(null);
    setImage("");
  }, []);

  // hàm mở modal add brand
  const showModalAddBrand = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  // hàm mở modal xóa 1 thương hiệu
  const showModalDeleteOne = useCallback((record: any) => {
    setIsOpenModalDelete(true);
    setIdBrand(record);
  }, []);

  // hàm hủy modal xóa thương hiệu
  const handleCancelDelete = useCallback(() => {
    setIsOpenModalDelete(false);
    setIsDeleteAll(false);
  }, []);

  // hàm xử lý tìm kiếm thương hiệu
  const handleChangeKeyword = useCallback((e: any) => {
    setKeyword(e.target.value);
    setPage(1);
  }, []);

  // hàm xử lý limit
  const handChangeSelectLimit = useCallback((value: any) => {
    setLimit(value);
    setPage(1);
  }, []);

  // hàm xử lý page
  const handleChangePage = useCallback((page: number) => {
    setPage(page);
    setListBrandId([]);
    (document.getElementById("checkbox-all") as any).checked = false;
  }, []);

  // hàm xử lý tải ảnh lên
  const handleImageChange = useCallback((e: any) => {
    const file = e.target.files[0]; // Lấy giá trị file vừa tải lên và gắn vào biến file
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => {
      const base64String = reader.result; // Lưu trữ giá trị base64 string của ảnh vào biến base64String
      setImage(base64String); // Gắn giá trị base64 string thu được vào state image
    };
  }, []);

  return (
    <WrapperBrandManagement>
      <div className="brand-management">
        <div>QUẢN LÝ THƯƠNG HIỆU</div>
        <div className="list-brand">
          <div className="title-brand">
            <div>Danh sách thương hiệu</div>
            {listBrandId?.length > 0 && (
              <Button onClick={showModalDeleteAll} className="delete-all">
                Xóa tất cả thương hiệu đã chọn
              </Button>
            )}
          </div>
          <div className="group-select">
            <Input
              onChange={handleChangeKeyword}
              size="large"
              placeholder="Vui lòng nhập tên"
            ></Input>

            <div className="select-item">
              <Select
                className="select"
                onChange={(value) => setSortDate(value)}
                size="large"
                defaultValue={sortDate}
                options={selectSortDate}
              ></Select>
              <Button
                className="add-brand"
                onClick={showModalAddBrand}
                size="large"
              >
                <FontAwesomeIcon className="plus" icon={faPlus} />
                <span>Thêm thương hiệu</span>
              </Button>
            </div>
          </div>
        </div>

        <ItemTable
          scroll={{ y: 350 }}
          columns={colunms}
          dataSource={appContext?.saveBrands}
          pagination={false}
          loading={isLoading}
        />
      </div>
      {appContext?.saveBrands?.length < 1 && !isLoading ? (
        <div className="no-brand">Không có thương hiệu nào !</div>
      ) : (
        <ItemPagination>
          <Pagination
            current={page}
            pageSize={limit}
            total={totalBrands}
            onChange={handleChangePage}
          />
          <div className="display-total-brand">
            Hiển thị từ thương hiệu thứ {(page - 1) * limit + 1} đến{" "}
            {page * limit > totalBrands ? totalBrands : page * limit} trên tổng{" "}
            {totalBrands} thương hiệu
            <Select
              defaultValue={limit}
              options={optionsLimit}
              onChange={handChangeSelectLimit}
            />{" "}
            trên 1 trang.
          </div>
        </ItemPagination>
      )}
      <ItemModal
        centered={true}
        width={550}
        open={isOpenModal}
        onCancel={handelCancelModal}
        footer={false}
      >
        <Form className="custom-form" onFinish={handleOnFinish} form={form}>
          <Form.Item
            name="name"
            label="Tên thương hiệu"
            rules={[
              { required: true, message: "Vui lòng nhập tên thương hiệu !" },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name="image"
            label="Ảnh thương hiệu"
            rules={[
              {
                required: !image ? true : false, // nếu k có image thì requied là true ngược lại là false
                message: "Vui lòng chọn ảnh !",
              },
            ]}
          >
            <input
              type="file"
              onChange={handleImageChange}
              accept=".jpg,.png" // định dạng ảnh muốn chọn
            />
          </Form.Item>
          {image ? (
            <img className="img-upload" src={image} alt="" />
          ) : (
            <div className="no-img">Chưa có ảnh nào !</div>
          )}
          {editBrand ? (
            <div className="group-button">
              <Button onClick={handelCancelModal} size="large">
                Hủy
              </Button>
              <Button className="add-brand" htmlType="submit" size="large">
                <FontAwesomeIcon className="icon-plus" icon={faPlus} />
                Cập nhật thương hiệu
              </Button>
            </div>
          ) : (
            <div className="group-button">
              <Button onClick={handelCancelModal} size="large">
                Hủy
              </Button>
              <Button className="add-brand" htmlType="submit" size="large">
                <FontAwesomeIcon className="icon-plus" icon={faPlus} />
                Thêm thương hiệu
              </Button>
            </div>
          )}
        </Form>
      </ItemModal>
      <ModalDelete
        open={isOpenModalDelte}
        onCancel={handleCancelDelete}
        width={300}
        centered={true}
        footer={false}
      >
        {isdeleteAll ? (
          <div className="item-delete">
            <img
              className="icon-delete"
              src="https://img.myloview.com/posters/trash-can-icon-delete-remove-symbol-dustbin-recycle-bin-icon-garbage-can-400-196758048.jpg"
              alt=""
            />
            <div>Bạn có chắc chắn muốn xóa tất cả thương hiệu này không ?</div>
          </div>
        ) : (
          <div className="item-delete">
            <img
              className="icon-delete"
              src="https://img.myloview.com/posters/trash-can-icon-delete-remove-symbol-dustbin-recycle-bin-icon-garbage-can-400-196758048.jpg"
              alt=""
            />
            <div>Bạn có chắc chắn muốn xóa 1 thương hiệu này không ?</div>
          </div>
        )}
        {isdeleteAll ? (
          <div className="group-button">
            <Button onClick={handleCancelDelete}>Hủy</Button>
            <Button
              className="button-delete"
              type="primary"
              onClick={handleDeleteBrandAll}
            >
              xóa tất cả
            </Button>
          </div>
        ) : (
          <div className="group-button">
            <Button onClick={handleCancelDelete}>Hủy</Button>
            <Button
              className="button-delete"
              type="primary"
              onClick={handleDeleteOne}
            >
              xóa
            </Button>
          </div>
        )}
      </ModalDelete>
    </WrapperBrandManagement>
  );
}
