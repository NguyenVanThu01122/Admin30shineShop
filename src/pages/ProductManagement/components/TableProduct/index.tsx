import { useCallback, useContext } from "react";
import ActionIcons from "../../../../components/ActionIcons";
import ImageGeneral from "../../../../components/Ui/image";
import { AppContext } from "../../../../context";
import { calculateRowNumber } from "../../../../helper/calculateIndices";
import { formatCurrency } from "../../../../helper/formatCurrency";
import { StyledTableGeneral } from "./styles";
import { TableProductProps, TypeColumn, TypeProduct } from "./type";

export default function TableProduct({
  form,
  isLoading,
  page,
  limit,
  setIsModalDelete,
  setIdProduct,
  setEditProduct,
  setIsOpenModal,
  setImageFile,
}: TableProductProps) {
  const appContext = useContext(AppContext);

  // columns Table
  const columns: TypeColumn[] = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      width: 60,
      render: (value, record, index) => calculateRowNumber(page, limit, index),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (value) => <div className="name-product ">{value}</div>,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      width: 150,
      render: (value) => <div className="title-category">{value}</div>,
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
      key: "brand",
      render: (value) => <div className="brand">{value}</div>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 95,
      render: (value) => <div className="quantity">{value}</div>,
    },
    {
      title: "Giá gốc",
      dataIndex: "originPrice",
      key: "originPrice",
      render: (value) => (
        <div className="origin-price">{formatCurrency(value)} VND</div>
      ),
    },
    {
      title: "Giá sale",
      dataIndex: "salePrice",
      key: "salePrice",
      render: (value) => (
        <div className="sale-price">{formatCurrency(value)} VND</div>
      ),
    },
    {
      title: "Ảnh sản phẩm",
      dataIndex: "image",
      key: "image",
      width: 130,
      render: (value) => (
        <ImageGeneral src={value} alt="" className="image-product" />
      ),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      width: 110,
      render: (value, record) => (
        <ActionIcons
          onEdit={() => showModalEditProduct(record)}
          onDelete={() => showModalDeleteProduct(record?.id)}
        />
      ),
    },
  ];

  // hàm sửa sản phẩm
  const showModalEditProduct = useCallback(
    (record: TypeProduct) => {
      setEditProduct(record); // lưu đối tượng sp vào edit
      setIsOpenModal(true);
      // set lại giá trị vào trường trong form
      setImageFile(record?.image); //lưu image vào state để render ảnh
      form.setFieldsValue({
        name: record?.name,
        category: record?.category,
        brand: record?.brand,
        quantity: record?.quantity,
        originPrice: record?.originPrice,
        salePrice: record?.salePrice,
      });
    },
    [setEditProduct, setIsOpenModal, setImageFile, form]
  );

  // hàm mở modal xóa sản phẩm
  const showModalDeleteProduct = useCallback(
    (id: string) => {
      setIsModalDelete(true);
      setIdProduct(id); // lưu trữ id sp vào state idProduct
    },
    [setIsModalDelete, setIdProduct]
  );

  return (
    <StyledTableGeneral
      loading={isLoading}
      pagination={false}
      scroll={{ y: 380 }}
      columns={columns}
      dataSource={appContext?.saveProducts} // dữ liệu được đổ vào các cột
    />
  );
}
