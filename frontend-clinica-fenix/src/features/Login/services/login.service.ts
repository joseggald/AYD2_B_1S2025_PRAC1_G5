import { serviceApi } from "@/services/auth";

export interface ILoginServiceProps {
  usuario: string;
  contrasena: string;
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
  cod_empleado: string;
  usuario: string;
  rol: string;
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
