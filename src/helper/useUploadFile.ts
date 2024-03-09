// hàm xử lý tải ảnh lên ở thêm sản phẩm

import { useEffect, useState } from "react";

export const useUploadFile = () => {
  const [imageFile, setImageFile] = useState<any>("");

  const handleChangeFile = (e: any) => {
    const file = e.target.files[0]; // Lấy giá trị file vừa tải lên và gắn vào biến file
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => {
      const base64String: any = reader.result; // Lưu trữ giá trị base64 string của ảnh vào biến base64String
      setImageFile(base64String); // Gắn giá trị base64 string thu được vào state image
    };
  };
  return [handleChangeFile, imageFile, setImageFile];
};
