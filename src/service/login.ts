import { privateAxios } from "./axios";

export interface TypeLogin {
  email: string;
  password: string;
  role: string;
}
export const login = (body: TypeLogin) => {
  return privateAxios.post("/login", body);
};
