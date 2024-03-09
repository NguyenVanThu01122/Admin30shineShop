// xử lý option của của select trong form
export const validateNameClient = [
  { required: true, message: "Vui lòng nhập tên !" },
  {
    max: 50,
    message: "Vui lòng nhập tối đa 50 ký tự!",
  },
];

export const validateName = [
  {
    required: true,
    message: "Vui lòng nhập tên sản phẩm !",
  },
];

export const validateCategory = [
  {
    required: true,
    message: "Vui lòng chọn danh mục !",
  },
];

export const validateBrand = [
  {
    required: true,
    message: "Vui lòng nhập thương hiệu !",
  },
];

export const validateNameBrand = [
  { required: true, message: "Vui lòng nhập tên thương hiệu !" },
];

export const validateImage = (imageFile: string) => {
  return [
    {
      required: !imageFile ? true : false, // nếu k có image thì requied là true ngược lại là false
      message: "Vui lòng chọn ảnh !",
    },
  ];
};

export const validateEmail = [
  {
    required: true,
    message: "Vui lòng nhập Email !",
  },
  () => ({
    validator(_: any, value: string) {
      // sử dụng biểu thức chính quy để validate
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value || value.trim() === "") {
        return Promise.resolve();
      } else if (emailPattern.test(value) || value === "") {
        return Promise.resolve();
      } else {
        return Promise.reject(new Error("Vui lòng nhập đúng định dạng !"));
      }
    },
  }),
];

export const validatePassword = [
  {
    required: true,
    message: "Vui lòng nhập mật khẩu !",
  },
];

export const validateGender = [
  { required: true, message: "Vui lòng nhập giới tính !" },
];

export const validatePhone = [
  { required: true, message: "Vui lòng nhập số điện thoại !" },
  () => ({
    validator(_: any, value: any) {
      const phonePattern = /^(0[1-9])+([0-9]{8,9})\b/;
      if (!phonePattern.test(value) && value !== "") {
        return Promise.reject(new Error("Vui lòng nhập đúng định dạng !"));
      } else if (
        (Number(value.length) < 10 || Number(value.length) > 10) &&
        value !== ""
      ) {
        return Promise.reject(new Error("Vui lòng nhập đủ 10 chữ số !"));
      } else {
        return Promise.resolve();
      }
    },
  }),
];

export const validateBirthday = [
  { required: true, message: "Vui lòng nhập ngày sinh !" },
];

export const validateQuantity = [
  {
    required: true,
    message: "Vui lòng nhập số lượng !",
  },
  () => ({
    validator(_: any, value: any) {
      if (Number(value) < 1 && value !== "") {
        return Promise.reject(new Error("Vui lòng nhập số lớn hơn 0."));
      } else {
        return Promise.resolve();
      }
    },
  }),
];

export const validateOriginPrice = [
  {
    required: true,
    message: "Vui lòng nhập giá gốc !",
  },
  ({ getFieldValue }: any) => ({
    validator(_: any, value: any) {
      if (value === "") {
        return Promise.resolve();
      } else if (Number(value) < 1) {
        return Promise.reject(new Error("Vui lòng nhập giá lớn hơn 0."));
      } else if (Number(value) < Number(getFieldValue("salePrice"))) {
        return Promise.reject(
          new Error("Vui lòng nhập giá gốc lớn hơn hoặc bằng giá sale.")
        );
      } else {
        return Promise.resolve();
      }
    },
  }),
];

export const validateSalePrice = [
  {
    required: true,
    message: "Vui lòng nhập giá sale !",
  },
  ({ getFieldValue }: any) => ({
    validator(_: any, value: any) {
      if (value === "") {
        return Promise.resolve();
      } else if (Number(value) < 1) {
        return Promise.reject(new Error("Vui lòng nhập giá sale lớn hơn 0."));
      } else if (Number(getFieldValue("originPrice")) < Number(value)) {
        return Promise.reject(
          new Error("Vui lòng nhập giá sale nhỏ hơn hoặc bằng giá gốc")
        );
      } else {
        return Promise.resolve();
      }
    },
  }),
];

export const validateFile = (image: string) => {
  return [
    {
      required: !image ? true : false, // nếu k có image thì requied là true ngược lại là false
      message: "Vui lòng chọn file ảnh !",
    },
  ];
};
