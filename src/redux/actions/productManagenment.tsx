// các hàm action có chức năng Tạo ra các action objects, mô tả những gì cần thay đổi.
const savelistProducts = (payload: any) => {
  return {
    type: "LIST_PRODUCTS",
    payload,
  };
};
const savelistUsers = (payload: any) => {
  return {
    type: "LIST_USERS",
    payload,
  };
};
const saveListOrder = (payload: any) => {
  return {
    type: "LIST_ORDER",
    payload,
  };
};
const saveListBrand = (payload: any) => {
  return {
    type: "LIST_BRAND",
    payload,
  };
};
const saveListEvaluate = (payload: any) => {
  return {
    type: "LIST_EVALUATE",
    payload,
  };
};
export {
  saveListBrand,
  saveListEvaluate,
  saveListOrder,
  savelistProducts,
  savelistUsers,
};
