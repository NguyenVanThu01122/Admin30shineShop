import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { ButtonGeneral } from "../../../../components/Ui/button";
import { InputGeneral } from "../../../../components/Ui/input";
import { useSearchKeywordUltis } from "../../../../helper/useSearchKeyword";
import TableProduct from "../TableProduct";
import {
  ContentProduct,
  InputSearch,
  SelectItem,
  TitleProducts,
  Wrapper,
} from "./styles";
import { ListProductProps } from "./type";
import { PLACEHOLDER } from "../../../../helper/constants";

export default function ListProduct({
  form,
  isLoading,
  limit,
  page,
  setKeyword,
  setPage,
  setIsOpenModal,
  setEditProduct,
  setIdProduct,
  setImageFile,
  setIsModalDelete,
}: ListProductProps) {
  const { handleChangeKeyword } = useSearchKeywordUltis(setPage, setKeyword);

  // hàm này xử lý mở modal thêm sản phẩm
  const showModalAddProduct = useCallback(() => {
    setIsOpenModal(true);
    setEditProduct(null); // set về null nhằm thỏa mãn đkiện nếu editProduct là null thì hiện title 'Thêm sản phẩm ' trong modal
  }, [setIsOpenModal, setEditProduct]);

  return (
    <Wrapper>
      <ContentProduct>
        <TitleProducts>Danh sách sản phẩm</TitleProducts>
        <SelectItem>
          <InputSearch>
            <InputGeneral
              className="input-keyword"
              size="large"
              onChange={handleChangeKeyword}
              type="text"
              placeholder={PLACEHOLDER.ENTER_PRODUCT_NAME}
              allowClear={true} // thêm icon x
            />
          </InputSearch>
          <ButtonGeneral onClick={showModalAddProduct} className="button-add">
            <FontAwesomeIcon className="plus" icon={faPlus} />
            <span>Thêm sản phẩm</span>
          </ButtonGeneral>
        </SelectItem>
        <TableProduct
          form={form}
          isLoading={isLoading}
          page={page}
          limit={limit}
          setIsOpenModal={setIsOpenModal}
          setEditProduct={setEditProduct}
          setIdProduct={setIdProduct}
          setImageFile={setImageFile}
          setIsModalDelete={setIsModalDelete}
        />
      </ContentProduct>
    </Wrapper>
  );
}
