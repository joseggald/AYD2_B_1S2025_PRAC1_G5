import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  getDataFromCookie,
  deleteCookie,
  saveDataToCookie,
} from "@/utils/functions";
import { COOKIE_NAMES } from "@/utils/constants";
import { useEffect } from "react";
import { useLoginMutation } from "../useReactQuery";
import { useAuthStore } from "@/store/auth";

export function useLoginForm() {
  const loginMutation = useLoginMutation();
  const { clearTokens } = useAuthStore();

  const formSchema = z.object({
    userName: z.string().nonempty({
      message: "El nombre de usuario es obligatorio.",
    }),
    password: z.string().nonempty({
      message: "La contraseña es obligatoria.",
    }),
    rememberMe: z.boolean().optional(),
  });

  const loginData = getDataFromCookie<z.infer<typeof formSchema>>(
    COOKIE_NAMES.loginData
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: loginData?.userName || "",
      password: loginData?.password || "",
      rememberMe: loginData?.rememberMe || false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.rememberMe) {
      saveDataToCookie(COOKIE_NAMES.loginData, { ...values });
    }
    // clean old jwt tokens
    clearTokens();

    // authenticate user
    await loginMutation.mutate({
      usuario: values.userName,
      contrasena: values.password,
    });
  }

  // Clean up stored credentials when remember is unchecked
  useEffect(() => {
    const watchSubscription = form.watch((value) => {
      if (value.rememberMe === false) {
        deleteCookie(COOKIE_NAMES.loginData);
      }
    });
    return () => watchSubscription.unsubscribe();
  }, [form]);

  return {
    form,
    onSubmit,
    isLoading: loginMutation.isPending,
  };
}
