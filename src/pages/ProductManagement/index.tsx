import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Form,
  Input,
  Modal,
  Pagination,
  Select,
  Table,
  message,
} from "antd";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AppContext } from "../../context";
import iconDelete from "../../images/icon-delete.svg";
import iconEdit from "../../images/icon-edit.svg";
import {
  addProduct,
  deleteProduct,
  getListproducts,
  updateProduct,
} from "../../service/product";
import {
  ItemListProducts,
  ItemModalProduct,
  ItemPagination,
  WrapperProductManagement,
} from "./styles";
// xử lý các option của thẻ select
const optionSelects = [
  { value: 5, label: 5 },
  { value: 10, label: 10 },
  { value: 15, label: 15 },
  { value: 20, label: 20 },
  { value: 25, label: 25 },
];

// xử lý option của của select trong form
const optionForm = [
  { value: "Dầu gội đầu", lable: "Dầu gội đầu" },
  { value: "Sữa tắm", lable: "Sữa tắm" },
  { value: "Nước hoa", lable: "Nước hoa" },
  { value: "miếng dán mụn", lable: "Sữa tắm" },
  { value: "Kem chống nắng", lable: "Kem chống nắng" },
  { value: "Kem tẩy tế bào chết", lable: "Kem tẩy tế bào chết" },
];

function ProductManagement() {
  const [keyword, setKeyword] = useState<any>("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isDeleteProduct, setIsDeleteProduct] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);
  const [idProduct, setIdProduct] = useState("");
  const [form] = Form.useForm(); // tạo đối tượng form và làm việc vs form
  const [image, setImage] = useState<any>("");

  const myRef = useRef<any>(null);
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  const { isLoading } = useQuery(
    ["getListProducts", page, limit, keyword],
    () =>
      getListproducts({
        limit,
        page,
        keyword,
      }),
    {
      onSuccess: (data) => {
        appContext?.setSaveProducts(data.data?.data); // lưu data vào product
        setTotalProducts(data.data?.totalProducts); // lấy số lượng sp res và lưu vào state totalProducts
      },
      onError: (err: any) => {
        message.error(err.response?.data?.message);
      },
    }
  );

  // xử lý thêm product
  const mutationAddProduct = useMutation(
    "add-new-product",
    (payload: any) => addProduct(payload),
    {
      onSuccess: (data: any) => {
        message.success(data.data?.message);
        queryClient.invalidateQueries(["getListProducts"]); // gọi lại getlistProduct
        cancelModalAddProduct();
        setPage(1);
        setKeyword("");
      },
      onError: (err: any) => {
        message.error(err.response?.data?.message);
      },
    }
  );

  // xử lý sửa product
  const mutationEditProduct = useMutation(
    "edit-product",
    (payload: any) => updateProduct(payload.id, payload.body),
    {
      onSuccess: (data: any) => {
        message.success(data.data?.message);
        // queryClient.refetchQueries(["getListProducts"]); // ép buộc gọi lại
        queryClient.invalidateQueries(["getListProducts"]); // đánh dấy query đã hết hạn
        cancelModalAddProduct();
        setEditProduct(null);
      },
      onError: (err: any) => {
        message.error(err.response?.data?.message);
      },
    }
  );

  // xử lý xóa product
  const mutationDeleteProduct = useMutation(
    "delete-product",
    (id: string) => deleteProduct(id),
    {
      onSuccess: (data: any) => {
        queryClient.refetchQueries(["getListProducts"]);
        setIsDeleteProduct(false); // đóng modal khi xóa sp thành công
        message.success(data.data?.message);
      },
      onError: (err: any) => {
        message.error(err.response?.data?.message);
      },
    }
  );

  // xử lý  các cột table
  const columns = useMemo(() => {
    return [
      {
        title: "STT",
        dataIndex: "STT",
        key: "STT",
        render: (value: string, record: any, index: number) => {
          return (page - 1) * limit + 1 + index;
        },
      },
      {
        title: "Tên sản phẩm",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Danh mục",
        dataIndex: "category",
        key: "category",
        render: (value: string) => {
          return <div className="title-category">{value}</div>;
        },
      },
      {
        title: "Thương hiệu",
        dataIndex: "brand",
        key: "brand",
        render: (value: string) => {
          return <div className="brand">{value}</div>;
        },
      },
      {
        title: "Số lượng",
        dataIndex: "quantity",
        key: "quantity",
        render: (value: number) => {
          return <div className="quantity">{value}</div>;
        },
      },
      {
        title: "Giá gốc",
        dataIndex: "originPrice",
        key: "originPrice",
        render: (value: number) => {
          return <div className="origin-price">{value} VND</div>;
        },
      },
      {
        title: "Giá sale",
        dataIndex: "salePrice",
        key: "salePrice",
        render: (value: number) => {
          return <div className="sale-price">{value} VND</div>;
        },
      },
      {
        title: "Ảnh sản phẩm",
        dataIndex: "image",
        key: "image",
        render: (value: string) => {
          // value là giá trị cho key
          return <img src={value} alt="" className="image-product" />;
        },
      },
      {
        title: "Hành động",
        dataIndex: "action",
        key: "action",
        render: (value: any, record: any) => {
          // value là giá trị của key, record đại diện cho các đối tượng
          return (
            <div className="group-icon">
              <img
                src={iconEdit}
                alt=""
                onClick={() => showModalEditProduct(record)}
              />
              <img
                onClick={() => showModalDeleteProduct(record?.id)}
                src={iconDelete}
                alt=""
              />
            </div>
          );
        },
      },
    ];
  }, [page, limit]);

  // hàm tạo mới sản phẩm và cập nhật sản phẩm theo đkiện
  const handleFinishForm = (value: any) => {
    if (editProduct) {
      const editBody = {
        name: value?.name,
        category: value?.category,
        brand: value?.brand,
        quantity: value?.quantity,
        originPrice: value?.originPrice,
        salePrice: value?.salePrice,
        image,
      };
      mutationEditProduct.mutate({
        id: editProduct?.id,
        body: editBody,
      });
    } else {
      const addBody = {
        name: value?.name,
        category: value?.category,
        brand: value?.brand,
        quantity: value?.quantity,
        originPrice: value?.originPrice,
        salePrice: value?.salePrice,
        image,
      };
      mutationAddProduct.mutate(addBody);
    }
  };

  // hàm sửa sản phẩm
  const showModalEditProduct = (record: any) => {
    setEditProduct(record); // lưu đối tượng sp vào edit
    setIsOpenModal(true);
    // set lại giá trị vào trường trong form
    setImage(record?.image); //lưu image vào state để render ảnh
    form.setFieldsValue({
      name: record?.name,
      category: record?.category,
      brand: record?.brand,
      quantity: record?.quantity,
      originPrice: record?.originPrice,
      salePrice: record?.salePrice,
    });
  };

  // hàm xử lý tải ảnh lên ở thêm sản phẩm
  const handleImageChange = (e: any) => {
    const file = e.target.files[0]; // Lấy giá trị file vừa tải lên và gắn vào biến file
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => {
      const base64String = reader.result; // Lưu trữ giá trị base64 string của ảnh vào biến base64String
      setImage(base64String); // Gắn giá trị base64 string thu được vào state image
    };
  };

  // hàm xóa sản phẩm
  const handleDeleteProduct = useCallback(() => {
    mutationDeleteProduct.mutate(idProduct);
  }, [idProduct]);

  // hàm gửi form lên server
  const handleSubmitForm = useCallback(() => {
    form.submit();
  }, []);

  // hàm xử lý lấy giá trị input rồi sét giá trị vào state keyword
  const handleChangeKeyword = useCallback((e: any) => {
    setKeyword(e.target.value);
    setPage(1); // set page 1 với mục đích hiển thị sản phẩm tìm kiếm ở  page 1 (ví dụ: đang ở page 2 và limit la 10, khi tìm kiếm sp ở page 2 thì sp tìm kiếm chỉ có 1, và muốn hiển thị sp tìm kiếm ở page 2, thì sp tìm kiếm phải có số lượng vượt quá số lượng limit ở page 1 )
  }, []);

  const handleChangeSelect = useCallback((value: number) => {
    setLimit(value);
    setPage(1); //setpage về trang 1 để hiển thị tất cả sản phẩm (nếu k set về page 1 thì sẽ sảy ra trường hợp người dùng chọn quá số lượng sp render trên 1 trang và sẽ k có dữ liệu hiển thị)
  }, []);

  // hàm này xử lý mở modal thêm sản phẩm
  const showModalAddProduct = useCallback(() => {
    setIsOpenModal(true);
    setEditProduct(null); // set về null nhằm thỏa mãn đkiện nếu editProduct là false thì hiện title 'Thêm sản phẩm ' trong modal
  }, []);

  // hàm này xử lý hủy bỏ modal thêm sản phẩm
  const cancelModalAddProduct = useCallback(() => {
    setIsOpenModal(false);
    form.resetFields();
    setImage("");
  }, []);

  // hàm mở modal xóa sản phẩm
  const showModalDeleteProduct = useCallback((id: string) => {
    setIsDeleteProduct(true);
    setIdProduct(id); // lưu trữ id sp vào state idProduct
  }, []);

  return (
    <WrapperProductManagement>
      <div>
        <div className="title-page">QUẢN LÝ SẢN PHẨM</div>
        <ItemListProducts>
          <div className="list_products">
            <div>Danh sách sản phẩm</div>
            <div className="selectItem">
              <div className="input-search">
                <Input
                  className="input-keyword"
                  value={keyword}
                  size="large"
                  onChange={handleChangeKeyword}
                  type="text"
                  placeholder="Vui lòng nhập tên sản phẩm"
                  allowClear={true} // thêm icon x
                />
              </div>
              <Button
                ref={myRef}
                onClick={showModalAddProduct}
                className="button-add"
              >
                <FontAwesomeIcon className="plus" icon={faPlus} />
                <span>Thêm sản phẩm</span>
              </Button>
            </div>
            <Table
              loading={isLoading}
              pagination={false} // hủy phân trang của table
              scroll={{ y: 350 }} // khi quá 350 thì có thanh kéo scroll
              columns={columns} // title các cột
              dataSource={appContext?.saveProducts} // dữ liệu được đổ vào các cột
              className="my-table"
            />
          </div>
        </ItemListProducts>
      </div>
      {appContext?.saveProducts?.length < 1 && !isLoading ? (
        <div className="no-product">Không có sản phẩm nào !</div>
      ) : (
        <ItemPagination>
          <Pagination
            current={page}
            total={totalProducts}
            pageSize={limit}
            onChange={(page)=> setPage(page)}
          />
          <div className="information_amount_products">
            <div>
              Hiển thị từ sản phẩm thứ {(page - 1) * limit + 1} đến{" "}
              {page * limit > totalProducts ? totalProducts : page * limit} trên
              tổng {totalProducts} sản phẩm
            </div>
            <Select
              options={optionSelects}
              defaultValue={limit}
              onChange={handleChangeSelect}
            />
            <div>trên 1 trang</div>
          </div>
        </ItemPagination>
      )}

      <ItemModalProduct //modal form xử lý thêm sản phẩm
        open={isOpenModal}
        onCancel={cancelModalAddProduct}
        footer={false}
      >
        <Form
          className="item-form"
          onFinish={handleFinishForm}
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên sản phẩm !",
              },
            ]}
          >
            <Input
              className="input"
              size="large"
              placeholder="Vui lòng nhập tên sản phẩm"
              allowClear={true}
            />
          </Form.Item>
          <Form.Item
            label="Danh mục"
            name="category"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn danh mục !",
              },
            ]}
          >
            <Select
              className="input"
              size="large"
              placeholder="vui lòng chọn danh mục"
              options={optionForm}
            />
          </Form.Item>
          <Form.Item
            label="Thương hiệu"
            name="brand"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thương hiệu !",
              },
            ]}
          >
            <Input
              className="input"
              placeholder="Vui lòng nhập thương hiệu"
              allowClear={true}
            />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số lượng !",
              },
              () => ({
                validator(_, value: any) {
                  if (Number(value) < 1 && value !== "") {
                    return Promise.reject(
                      new Error("Vui lòng nhập số lớn hơn 0.")
                    );
                  } else {
                    return Promise.resolve();
                  }
                },
              }),
            ]}
          >
            <Input
              size="large"
              type="number"
              className="input"
              placeholder="Vui lòng nhập số lượng"
              allowClear={true}
            />
          </Form.Item>
          <Form.Item
            label="Giá gốc"
            name="originPrice"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá gốc !",
              },
              ({ getFieldValue }) => ({
                validator(_, value: any) {
                  if (value === "") {
                    return Promise.resolve();
                  } else if (Number(value) < 1) {
                    return Promise.reject(
                      new Error("Vui lòng nhập giá lớn hơn 0.")
                    );
                  } else if (
                    Number(value) < Number(getFieldValue("salePrice"))
                  ) {
                    return Promise.reject(
                      new Error(
                        "Vui lòng nhập giá gốc lớn hơn hoặc bằng giá sale."
                      )
                    );
                  } else {
                    return Promise.resolve();
                  }
                },
              }),
            ]}
          >
            <Input
              className="input"
              type="number"
              size="large"
              placeholder="Vui lòng nhập giá gốc"
              allowClear={true}
            />
          </Form.Item>
          <Form.Item
            label="Giá khuyến mại"
            name="salePrice"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá sale !",
              },
              ({ getFieldValue }) => ({
                validator(_, value: any) {
                  if (value === "") {
                    return Promise.resolve();
                  } else if (Number(value) < 1) {
                    return Promise.reject(
                      new Error("Vui lòng nhập giá sale lớn hơn 0.")
                    );
                  } else if (
                    Number(getFieldValue("originPrice")) < Number(value)
                  ) {
                    return Promise.reject(
                      new Error(
                        "Vui lòng nhập giá sale nhỏ hơn hoặc bằng giá gốc"
                      )
                    );
                  } else {
                    return Promise.resolve();
                  }
                },
              }),
            ]}
          >
            <Input
              className="input"
              size="large"
              type="number"
              placeholder="Vui lòng nhập giá khuyến mãi"
              allowClear={true}
            />
          </Form.Item>
          <Form.Item
            label="Chọn file ảnh"
            name="image"
            rules={[
              {
                required: !image ? true : false, // nếu k có image thì requied là true ngược lại là false
                message: "Vui lòng chọn file ảnh !",
              },
            ]}
          >
            <input
              onChange={handleImageChange}
              type="file"
              accept=".jpg,.png" // định dạng ảnh muốn chọn
            />
          </Form.Item>
          <img className="add-image" src={image} alt="" />
        </Form>
        {editProduct ? (
          <div className="group-button">
            <Button
              size="large"
              onClick={cancelModalAddProduct}
              className="cencel-button"
            >
              Hủy
            </Button>
            <Button
              // htmlType="submit"
              size="large"
              className="update-button"
              onClick={handleSubmitForm}
            >
              Sửa sản phẩm
            </Button>
          </div>
        ) : (
          <div className="group-button">
            <Button
              size="large"
              onClick={cancelModalAddProduct}
              className="cencel-button"
            >
              Hủy
            </Button>
            <Button
              onClick={handleSubmitForm}
              className="update-button"
              size="large"
            >
              Thêm sản phẩm
            </Button>
          </div>
        )}
      </ItemModalProduct>
      <Modal
        centered
        title="Bạn có chắn chắn muốn xóa sản phẩm này không ?"
        open={isDeleteProduct} // cái này đổi tên lại thành showModalDelete thì hợp lý hơn, đặt tên isDelete không có ý nghĩa lắm
        onCancel={cancelModalAddProduct}
        onOk={handleDeleteProduct}
      ></Modal>
    </WrapperProductManagement>
  );
}
export default ProductManagement;
