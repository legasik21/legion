import { supabase } from "@/shared/lib/supabase/client";
import type { RegistrationRequest } from "../model/types";

export const registrationApi = {
  signUp: async (data: RegistrationRequest) => {
    const { data: registrationData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
    if (error) throw error;
    return registrationData.user;
  },
};