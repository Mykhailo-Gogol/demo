import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { User } from "@supabase/supabase-js";
import React from "react";

interface iProps {
  user: User;
}

export default function Profile({ user }: iProps) {
  const supabaseClient = useSupabaseClient();

  const handleLogout = async () => {
    try {
      const res = confirm("Are you sure?");
      if (res) {
        await supabaseClient.auth.signOut();
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <div className="avatar online placeholder mb-5">
        <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
          <span className="text-xl">
            {user.email?.slice(0, 2).toUpperCase()}
          </span>
        </div>
      </div>
      <span className="block mb-5">{user.email}</span>
      <button onClick={handleLogout} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
}
