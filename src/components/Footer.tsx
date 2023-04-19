import {
  faTwitter,
  faYoutube,
  faInstagram,
  faFacebook
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

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
          <Link href="#" target="_blank">
            <FontAwesomeIcon
              icon={faYoutube}
              size="xs"
              className="btn btn-ghost btn-circle p-2"
            />
          </Link>
          <Link href="#" target="_blank">
            <FontAwesomeIcon
              icon={faTwitter}
              size="xs"
              className="btn btn-ghost btn-circle p-2"
            />
          </Link>
          <Link href="#" target="_blank">
            <FontAwesomeIcon
              icon={faInstagram}
              size="xs"
              className="btn btn-ghost btn-circle p-2"
            />
          </Link>
          <Link href="#" target="_blank">
            <FontAwesomeIcon
              icon={faFacebook}
              size="xs"
              className="btn btn-ghost btn-circle p-2"
            />
          </Link>
        </div>
      </div>
      <div>
        <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
      </div>
    </footer>
  )
}
