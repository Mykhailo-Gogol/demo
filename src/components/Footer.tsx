import { appConfig } from "@/utils";
import {
  faTwitter,
  faYoutube,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="footer footer-center p-10 text-base-content rounded">
      <div className="grid grid-flow-col gap-4">
        <Link href="#" className="link link-hover">
          About us
        </Link>
        <Link href="#" className="link link-hover">
          Contact
        </Link>
        <Link href="#" className="link link-hover">
          Jobs
        </Link>
        <Link href="#" className="link link-hover">
          Press kit
        </Link>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4">
          <Link
            href="#"
            target="_blank"
            className="btn btn-ghost btn-circle p-2"
          >
            <FontAwesomeIcon icon={faYoutube} size={appConfig.iconSize} />
          </Link>
          <Link
            href="#"
            target="_blank"
            className="btn btn-ghost btn-circle p-2"
          >
            <FontAwesomeIcon icon={faTwitter} size={appConfig.iconSize} />
          </Link>
          <Link
            href="#"
            target="_blank"
            className="btn btn-ghost btn-circle p-2"
          >
            <FontAwesomeIcon icon={faInstagram} size={appConfig.iconSize} />
          </Link>
          <Link
            href="#"
            target="_blank"
            className="btn btn-ghost btn-circle p-2"
          >
            <FontAwesomeIcon icon={faFacebook} size={appConfig.iconSize} />
          </Link>
        </div>
      </div>
      <div>
        <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
      </div>
    </footer>
  );
}
