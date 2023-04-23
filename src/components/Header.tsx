import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { appConfig } from "@/utils";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export default function Header() {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const handleLogout = () => {
    supabaseClient.auth.signOut();
  };

  const authLinks = [
    { link: "/profile", text: user ? "Profile" : "Login", badge: true },
    { link: "/", text: user ? "App" : "Welcome" },
  ];

  return (
    <header className="navbar bg-primary">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost btn-circle p-2">
          <FontAwesomeIcon
            className="text-white"
            icon={faHeart}
            size={appConfig.iconSize}
          />
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
          />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="btn btn-ghost btn-circle p-2">
              <FontAwesomeIcon
                className="text-white"
                icon={faUser}
                size={appConfig.iconSize}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            {authLinks.map(({ link, text, badge }) => (
              <li key={link}>
                <Link href={link}>
                  {text}
                  {badge && <span className="badge">New</span>}
                </Link>
              </li>
            ))}

            {user && (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
