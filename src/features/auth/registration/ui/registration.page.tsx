"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Dumbbell, Loader } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@radix-ui/react-label";
import { registrationSchema } from "../model/validation/registration-schema";
import { registrationDefaultFormValues } from "../model/constants/registration-constants";
import type { RegistrationFormValues } from "../model/types";
import { useRegistrationMutation } from "../model/hooks/use-registration-mutation";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/config/router/routes";
import { SignInWithGoogleButton } from "@/features/auth/sign-In-with-google";

export const RegistrationPage = () => {
  const registrationMutation = useRegistrationMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: registrationDefaultFormValues,
  });

  const onSubmit = (data: RegistrationFormValues) => {
    registrationMutation.mutate(data);
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
          <CardTitle className="text-2xl font-bold">Регистрация</CardTitle>
          <CardDescription>Создайте аккаунт для доступа к CRM системе</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-3">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                disabled={registrationMutation.isPending}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                disabled={registrationMutation.isPending}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                disabled={registrationMutation.isPending}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={registrationMutation.isPending}>
              {registrationMutation.isPending ? (
                <Loader className="animate-spin" />
              ) : (
                "Зарегистрироваться"
              )}
            </Button>
            <p className="text-center text-sm text-slate-600">
              Уже есть аккаунт?{" "}
              <Link
                to={ROUTES.auth.login.page}
                className="text-slate-900 font-medium hover:underline"
              >
                Войти
              </Link>
            </p>
          </form>
          <SignInWithGoogleButton className="w-full" />
        </CardContent>
      </Card>
    </div>
  );
};
