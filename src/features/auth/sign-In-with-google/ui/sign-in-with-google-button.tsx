import { Button } from "@/shared/ui/button";
import { signInWithGoogle } from "../api/sign-in-with-google-api";
import type { ComponentProps } from "react";
import classNames from "classnames";

type ButtonProps = ComponentProps<typeof Button>;

export const SignInWithGoogleButton = (props: ButtonProps) => {
  const { className, ...rest } = props;
  const handleClickGoogleSignIn = () => {
    try {
      signInWithGoogle();
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };
  return (
    <Button
      {...rest}
      variant="ghost"
      onClick={handleClickGoogleSignIn}
      className={classNames(
        "px-4 py-2 bg-white border rounded-md shadow-md hover:bg-gray-100",
        className
      )}
    >
      <img src="/google-icon.svg" alt="google" className="max-w-3.5" />
      <p>Войти через Google</p>
    </Button>
  );
};
