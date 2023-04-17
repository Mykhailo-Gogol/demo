import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faFaceSmileBeam } from '@fortawesome/free-regular-svg-icons';

export default function Header() {
  return (
    <header className="navbar bg-primary">
      <div className="flex-1">
        <Link href={'/'} className="btn btn-ghost btn-circle p-2">
          <FontAwesomeIcon icon={faHeart} size="xs" />
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
              <FontAwesomeIcon icon={faFaceSmileBeam} size="xs" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href={'/login'}>
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link href={'#'}>Settings</Link>
            </li>
            <li>
              <Link href={'#'}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
