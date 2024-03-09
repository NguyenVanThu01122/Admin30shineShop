import { Form } from "antd";
import { useCallback, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import NoDataMessage from "../../components/NoDataMessage";
import { AppContext } from "../../context";
import { ERROR_MESSAGES, NO_DATA_MESSAGE } from "../../helper/constants";
import { useSharedStateUtils } from "../../helper/useSharedState";
import { deleteUser, getListUser } from "../../service/user";
import ListClient from "./components/ListClient";
import ModalFormClient from "./components/ModalClient";
import ModalDeleteClient from "./components/ModalDeleteClient";
import PaginationClient from "./components/PaginationClient";
import { WrapperInformation } from "./styles";

function UserManagement() {
  const [
    page,
    setPage,
    limit,
    setLimit,
    keyword,
    setKeyword,
    sort,
    setSort,
    totalItem,
    setTotalItem,
    isOpenModal,
    setIsOpenModal,
    isModalDelete,
    setIsModalDelete,
    editItem,
    setEditItem,
    idItem,
    setIdItem,
  ] = useSharedStateUtils();
  const [form] = Form.useForm();

  const queryClient = useQueryClient();
  const appContext = useContext(AppContext); // dùng useContext để truy cập vào context

  const { isLoading } = useQuery(
    ["getListUser", limit, page, sort, keyword],
    () =>
      getListUser({
        limit,
        page,
        sort,
        keyword,
      }),
    {
      onSuccess: (data) => {
        appContext?.setSaveUser(data.data?.data); // lưu data vào context
        setTotalItem(data.data?.totalUsers); // lưu tổng số lượng users vào totalUsers
      },
      onError: (err) => toast.error(ERROR_MESSAGES.SERVER_ERROR),
    }
  );

  // xử lý xóa thông tin khách hàng
  const mutationDeleteUser = useMutation(
    "delete-user",
    (id: string) => deleteUser(id),
    {
      onSuccess: (data) => {
        queryClient.refetchQueries(["getListUser"]);
        setIsModalDelete(false); // đóng modal
        toast.success(data.data?.message);
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message);
      },
    }
  );

  // hàm xóa thông tin khách hàng
  const handleDeleteClient = useCallback(() => {
    mutationDeleteUser.mutate(idItem);
  }, [idItem]);

  // hàm hủy modal xóa khách hàng
  const handleCancelModalDelete = useCallback(() => {
    setIsModalDelete(false);
  }, [setIsModalDelete]);

  return (
    <WrapperInformation>
      <ListClient
        isLoading={isLoading}
        setKeyword={setKeyword}
        setSort={setSort}
        sort={sort}
        setPage={setPage}
        setEditUser={setEditItem}
        setIsOpenModal={setIsOpenModal}
        form={form}
        page={page}
        limit={limit}
        setUserId={setIdItem}
        setIsModalDelete={setIsModalDelete}
      />
      {!appContext?.saveUser?.length && !isLoading ? (
        <NoDataMessage message={NO_DATA_MESSAGE.NO_CUSTOMER} />
      ) : (
        <PaginationClient
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          totalUsers={totalItem}
        />
      )}

      <ModalFormClient
        form={form}
        isOpenModal={isOpenModal}
        editUser={editItem}
        setEditUser={setEditItem}
        setPage={setPage}
        setIsOpenModal={setIsOpenModal}
      />

      <ModalDeleteClient
        isModalDelete={isModalDelete}
        handleDeleteClient={handleDeleteClient}
        handleCancelModalDelete={handleCancelModalDelete}
      />
    </WrapperInformation>
  );
}
export default UserManagement;
