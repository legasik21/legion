
export interface RegistrationFormValues {
    email: string;
    password: string;
    confirmPassword: string;
}

export type RegistrationRequest = Omit<RegistrationFormValues,"confirmPassword">;
