"use client";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Dumbbell, Loader } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@radix-ui/react-label";
import { loginSchema } from "../model/validation/login-schema";
import type { LoginFormValues } from "../model/types/lndex";
import { loginDefaultFormValues } from "../model/constants/login-constants";
import { useLoginMutation } from "../model/hooks/use-login-mutation";
import { ROUTES } from "@/shared/config/router/routes";
import { SignInWithGoogleButton } from "@/features/auth/sign-In-with-google";

export const LoginPage = () => {
  const loginMutation = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultFormValues,
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center">
            <div className="bg-slate-900 p-3 rounded-full">
              <Dumbbell className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Вход</CardTitle>
          <CardDescription>Введите свои данные для доступа к CRM системе</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-3">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                disabled={loginMutation.isPending}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                disabled={loginMutation.isPending}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? <Loader className="animate-spin" /> : "Войти"}
            </Button>

            <p className="text-center text-sm text-slate-600">
              Нет аккаунта?{" "}
              <Link
                to={ROUTES.auth.registration.page}
                className="text-slate-900 font-medium hover:underline"
              >
                Зарегистрироваться
              </Link>
            </p>
          </form>
          <SignInWithGoogleButton className="w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
