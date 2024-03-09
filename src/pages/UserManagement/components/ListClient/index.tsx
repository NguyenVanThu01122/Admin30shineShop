import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormInstance } from "antd";
import { Dispatch, SetStateAction } from "react";
import { ButtonGeneral } from "../../../../components/Ui/button";
import { InputGeneral } from "../../../../components/Ui/input";
import { SelectGeneral } from "../../../../components/Ui/select";
import { PLACEHOLDER } from "../../../../helper/constants";
import { selectSort } from "../../../../helper/formOptions";
import { useSearchKeywordUltis } from "../../../../helper/useSearchKeyword";
import TableClient from "../TableClient";
import {
  CustomerContent,
  SearchFilter,
  SelectItem,
  TitleContent,
  TitlePage,
  WrapperClient,
} from "./styles";

interface ListClientProps {
  isLoading: boolean;
  setKeyword: (value: string) => void;
  setSort: Dispatch<SetStateAction<number>>;
  sort: number;
  setPage: (value: number) => void;
  setEditUser: (value: any) => void;
  setIsOpenModal: (value: boolean) => void;
  form: FormInstance;
  page: number;
  limit: number;
  setIsModalDelete: (value: boolean) => void;
  setUserId: any;
}
export default function ListClient({
  isLoading,
  sort,
  form,
  page,
  limit,
  setUserId,
  setKeyword,
  setSort,
  setPage,
  setEditUser,
  setIsOpenModal,
  setIsModalDelete,
}: ListClientProps) {
  const { handleChangeKeyword } = useSearchKeywordUltis(setPage, setKeyword);

  // hàm mở modal thêm thông tin khách hàng
  const showModalAddClient = () => {
    setIsOpenModal(true);
    setEditUser(null);
  };

  return (
    <WrapperClient>
      <TitlePage>Quản Lý Khách Hàng</TitlePage>
      <CustomerContent>
        <TitleContent>Danh sách khách hàng</TitleContent>
        <SelectItem>
          <SearchFilter>
            <InputGeneral
              onChange={handleChangeKeyword}
              size="large"
              placeholder={PLACEHOLDER.PLEASE_ENTER_CUSTOMER_NAME}
            />
            <SelectGeneral
              className="select"
              size="large"
              onChange={(value) => setSort(value)}
              value={sort}
              options={selectSort}
              placeholder={PLACEHOLDER.SORT_BY_TOTAL_PURCHASE_AMOUNT}
            />
          </SearchFilter>
          <ButtonGeneral
            className="button-addClient"
            onClick={showModalAddClient}
            size="large"
          >
            <FontAwesomeIcon className="plus" icon={faPlus} />
            <span>Thêm khách hàng</span>
          </ButtonGeneral>
        </SelectItem>

        {/* item table */}
        <TableClient
          form={form}
          page={page}
          limit={limit}
          isLoading={isLoading}
          setUserId={setUserId}
          setIsOpenModal={setIsOpenModal}
          setEditUser={setEditUser}
          setIsModalDelete={setIsModalDelete}
        />
      </CustomerContent>
    </WrapperClient>
  );
}
