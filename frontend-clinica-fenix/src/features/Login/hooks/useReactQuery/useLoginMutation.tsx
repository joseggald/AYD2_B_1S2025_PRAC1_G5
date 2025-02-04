import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/constants/queryKey";
import { toast } from "@/hooks/Toast/use-toast";
import {
  loginService,
  ILoginServiceProps,
  ILoginServiceResponse,
} from "@/features/Login";
import { isAxiosError } from "axios";
import { useAuthStore } from "@/store/auth";
import { redirect } from "@tanstack/react-router";

export const useLoginMutation = () => {
  const { setTokens, setUser } = useAuthStore();

  return useMutation({
    mutationKey: QUERY_KEYS.AUTH.LOGIN,
    mutationFn: async (props: ILoginServiceProps) => await loginService(props),
    onSuccess: (response: ILoginServiceResponse) => {
      const { user, token } = response.data;

      setTokens({ authToken: token });

      setUser({
        cod_empleado: user.cod_empleado,
        usuario: user.usuario,
        rol: user.rol
      });

      throw redirect({
        to: "/home",
      });
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response?.status === 401) return;
      toast({
        title: "Error",
        description: error.message || "Algo salió mal",
        variant: "destructive",
      });
    },
  });
};
