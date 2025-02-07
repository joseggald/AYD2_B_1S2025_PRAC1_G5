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
import { useNavigate } from "@tanstack/react-router";

export const useLoginMutation = () => {
  const { setTokens, setUser } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: QUERY_KEYS.AUTH.LOGIN,
    mutationFn: async (props: ILoginServiceProps) => await loginService(props),
    onSuccess: (response: ILoginServiceResponse) => {
      const { user, token } = response.data;

      setTokens({ authToken: token });

      setUser({
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        role: user.role
      });

      navigate({  to:"/home"  });
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response?.status === 401) return;
      toast({
        title: "Error",
        description: "Error al iniciar sesión: "+error,
        variant: "destructive",
      });
    },
  });
};
