import { serviceApi } from "@/services/auth";

export interface ILoginServiceProps {
  username: string;
  password: string;
}

export interface ILoginServiceResponse {
  message: string;
  success: boolean;
  data: IDataLogin;
}

export interface IDataLogin {
  token: string;
  user: IUser;
}

export interface IUser {
  id: string;
  name: string;
  lastname: string;
  username: string;
  email: string;
  role: string;
}

export const loginService = async (
  props: ILoginServiceProps
): Promise<ILoginServiceResponse> => {
  const { data } = await serviceApi.post<ILoginServiceResponse>(
    "/users/login",
    props
  );
  return data;
};
