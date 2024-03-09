import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import ActionIcons from "../../../../components/ActionIcons";
import { ButtonGeneral } from "../../../../components/Ui/button";
import ImageGeneral from "../../../../components/Ui/image";
import { InputGeneral } from "../../../../components/Ui/input";
import { SelectGeneral } from "../../../../components/Ui/select";
import { AppContext } from "../../../../context";
import { calculateRowNumber } from "../../../../helper/calculateIndices";
import { PLACEHOLDER } from "../../../../helper/constants";
import { selectSortDate } from "../../../../helper/formOptions";
import { handleformatDate } from "../../../../helper/handleFormatDate";
import { useSearchKeywordUltis } from "../../../../helper/useSearchKeyword";
import { TypeBrands } from "../../../../service/brand";
import {
  Brands,
  ContentBrand,
  SearchSelectGroup,
  SelectItem,
  StyledTableGeneral,
  TitleBrand,
  TitlePage,
  WrapperBrand,
} from "./styles";
import { ListBrandProps, TypeRecord } from "./type";

export default function ListBrand({
  form,
  setPage,
  limit,
  page,
  setKeyword,
  listBrandId,
  setListBrandId,
  setSortDate,
  sortDate,
  isLoading,
  setIsOpenModalDelete,
  setIsDeleteAll,
  setIsOpenModal,
  setIdBrand,
  setEditBrand,
  setImageFile,
}: ListBrandProps) {
  const appContext = useContext(AppContext); // dùng useContext để truy xuất vào context
  const { handleChangeKeyword } = useSearchKeywordUltis(setPage, setKeyword);

  // hàm xử lý chọn tất cả checkbox
  const handleClickCheckboxAll = () => {
    const checkbox = (document.getElementById("checkbox-all") as any).checked;
    if (checkbox) {
      const arrIdBrand = appContext?.saveBrands.map(
        (item: TypeBrands) => item?.id
      );
      setListBrandId(arrIdBrand);
    } else {
      setListBrandId([]);
    }
  };

  // hàm xử lý checkbox
  const handleClickCheckbox = (id: string) => {
    if (!listBrandId.includes(id)) {
      listBrandId.push(id);
      setListBrandId([...listBrandId]);
    } else {
      const newArr = listBrandId.filter((item: string) => {
        if (item !== id) {
          return true;
        }
      });
      setListBrandId(newArr);
    }
  };

  // hàm mở modal xóa 1 thương hiệu
  const showModalDeleteOne = (record: TypeRecord) => {
    setIsOpenModalDelete(true);
    setIdBrand(record);
  };

  // hàm mở modal cập nhật
  const showModalUpdate = (record: TypeRecord) => {
    setIsOpenModal(true);
    setIdBrand(record);
    setEditBrand(record);
    setImageFile(record?.image ?? ""); //lưu image vào state để render ảnh
    form.setFieldsValue({
      name: record?.name,
    });
  };

  // hàm mở modal xóa tất cả thương hiệu
  const showModalDeleteAll = () => {
    setIsOpenModalDelete(true);
    setIsDeleteAll(true);
  };

  // hàm mở modal add brand
  const showModalAddBrand = () => setIsOpenModal(true);

  const renderCheckboxAll = () => (
    <input
      className="checkbox-all"
      id="checkbox-all"
      onClick={handleClickCheckboxAll}
      type="checkbox"
    />
  );

  const renderCheckboxItem = (record: TypeRecord) => (
    <input
      className="item-checkbox"
      onClick={() => handleClickCheckbox(record?.id)}
      type="checkbox"
      checked={listBrandId.includes(record?.id)}
    />
  );

  const columns = [
    {
      title: renderCheckboxAll(),
      dataIndex: "checkbox",
      key: "checkbox",
      render: (value: boolean, record: TypeRecord) =>
        renderCheckboxItem(record),
    },
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (value: string, record: TypeRecord, index: number) =>
        calculateRowNumber(page, limit, index),
    },
    {
      title: "Tên thương hiệu",
      dataIndex: "name",
      key: "name",
      render: (value: string) => <div className="name-brand">{value}</div>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value: string) => <div>{handleformatDate(value)}</div>,
    },
    {
      title: "Ảnh thương hiệu",
      dataIndex: "image",
      key: "image",
      render: (value: string) => (
        <ImageGeneral className="img-brand" src={value} />
      ),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (value: string, record: TypeRecord) => (
        <ActionIcons
          onEdit={() => showModalUpdate(record)}
          onDelete={() => showModalDeleteOne(record)}
        />
      ),
    },
  ];

  return (
    <WrapperBrand>
      <TitlePage>QUẢN LÝ THƯƠNG HIỆU</TitlePage>
      <ContentBrand>
        <TitleBrand>
          <Brands>Danh sách thương hiệu</Brands>
          {listBrandId?.length > 0 && (
            <ButtonGeneral onClick={showModalDeleteAll} className="delete-all">
              Xóa tất cả thương hiệu đã chọn
            </ButtonGeneral>
          )}
        </TitleBrand>
        <SearchSelectGroup>
          <InputGeneral
            onChange={handleChangeKeyword}
            size="large"
            placeholder={PLACEHOLDER.PLEASE_ENTER_BRAND}
          />
          <SelectItem>
            <SelectGeneral
              className="select"
              onChange={(value) => setSortDate(value)}
              size="large"
              defaultValue={sortDate}
              options={selectSortDate}
            />
            <ButtonGeneral
              className="add-brand"
              onClick={showModalAddBrand}
              size="large"
            >
              <FontAwesomeIcon className="plus" icon={faPlus} />
              <span>Thêm thương hiệu</span>
            </ButtonGeneral>
          </SelectItem>
        </SearchSelectGroup>
      </ContentBrand>

      {/* item table */}
      <StyledTableGeneral
        columns={columns}
        dataSource={appContext?.saveBrands}
        pagination={false}
        loading={isLoading}
      />
    </WrapperBrand>
  );
}
