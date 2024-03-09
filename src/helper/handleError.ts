import { toast } from "react-toastify";
interface Error413 {
  response: {
    status: number;
  };
}
interface ErrorDetails {
  message: string;
  email?: string;
  telephone?: number;
}

export const handle413Error = (error: Error413) => {
  if (error.response.status === 413) {
    toast.warning(
      "Kích thước của dữ liệu gửi lên vượt quá giới hạn mà máy chủ cho phép."
    );
  }
};

export const handleError = (error: ErrorDetails) => {
  if (error.email && error.telephone) {
    toast.error(`${error.email} - ${error.telephone}`);
  } else if (error.email) {
    toast.error(error.email);
  } else if (error.telephone) {
    toast.error(error.telephone);
  }
};
