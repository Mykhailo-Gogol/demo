import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { appConfig } from "@/utils";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export default function Header() {
  const user = useUser();
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

  const authLinks = [
    { link: "/", text: user ? "App" : "Welcome", badge: true },
    { link: "/profile", text: user ? "Profile" : "Login" },
  ];

  return (
    <header className="navbar">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-secondary p-2 w-20">
          <FontAwesomeIcon icon={faHeart} size={appConfig.iconSize} />
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control w-32 md:w-64">
          <input
            type="text"
            placeholder="search"
            className="input input-bordered"
          />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-secondary p-2 w-20">
            <div>
              <FontAwesomeIcon icon={faUser} size={appConfig.iconSize} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-4 w-80 shadow menu menu-compact dropdown-content rounded-box bg-accent"
          >
            {authLinks.map(({ link, text, badge }) => (
              <li key={link} className="mb-1">
                <Link href={link} className="py-4">
                  {text}
                  {badge && <span className="badge">New</span>}
                </Link>
              </li>
            ))}

            {user && (
              <li>
                <button className="py-4" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
