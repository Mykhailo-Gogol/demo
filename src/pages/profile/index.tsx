import React from "react";
import { useUser } from "@supabase/auth-helpers-react";
import LoginHero from "@/components/LoginHero";
import Profile from "@/components/Profile";

export default function Login() {
  const user = useUser();

  return (
    <div className="flex justify-center">
      {user ? <Profile user={user} /> : <LoginHero title="Almost there!" />}
    </div>
  );
}
