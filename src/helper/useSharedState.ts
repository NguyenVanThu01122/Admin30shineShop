import { useState } from "react";
import { LIMIT, PAGE, SORT, TOTAL } from "./constants";

export const useSharedStateUtils = () => {
  const [limit, setLimit] = useState<any>(LIMIT);
  const [page, setPage] = useState(PAGE);
  const [sort, setSort] = useState(SORT);
  const [totalItem, setTotalItem] = useState(TOTAL);
  const [keyword, setKeyword] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [editItem, setEditItem] = useState<boolean>(false);
  const [idItem, setIdItem] = useState("");

  return [
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
  ];
};
