import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLoginForm } from "../hooks";
import { LoadingOverlay } from "@/components/Loader/Loader";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { form, onSubmit, isLoading } = useLoginForm();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={cn("flex flex-col gap-6 rounded-xl bg-white/10 p-8 backdrop-blur-lg", className)} {...props}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold text-white">Inicia sesión en tu cuenta</h1>
              <p className="text-balance text-sm text-gray-300">
                Ingresa tus credenciales para acceder a tu cuenta.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Usuario</FormLabel>
                    <FormControl>
                      <Input
                        className="border-gray-700 bg-white/10 text-white placeholder:text-gray-400"
                        placeholder="Ingresa tu usuario"
                        autoComplete="userName"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Contraseña</FormLabel>
                      <FormControl>
                        <PasswordInput
                          className="border-gray-700 bg-white/10 text-white placeholder:text-gray-400"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          className="border-gray-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                          name="rememberMe"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-gray-300">Recuérdame</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-blue-600 text-white transition-all hover:bg-blue-700" 
                disabled={isLoading}
              >
                Iniciar sesión
              </Button>
            </div>
          </div>
        </div>
        {isLoading && <LoadingOverlay />}
      </form>
    </Form>
  );
}