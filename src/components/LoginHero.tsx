import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { appConfig } from '@/utils'

interface iProps {
  title: string
}

export default function LoginHero({ title }: iProps) {
  const user = useUser()
  const supabaseClient = useSupabaseClient()

  const [form, setForm] = useState({
    email: '',
  })
  const [submited, setSubmited] = useState(false)

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmited(true)

    try {
      await supabaseClient.auth.signInWithOtp({
        email: form.email,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL,
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="hero mb-10">
      <div className="hero-content flex-col lg:flex-row-reverse lg:justify-around">
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        {submited && !user ? (
          <div className="flex flex-col items-start md:items-center">
            <span className="mb-4">
              Welcome! Check out your email, and click log in
            </span>
            <FontAwesomeIcon icon={faThumbsUp} size={appConfig.iconSize} />
          </div>
        ) : (
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  value={form.email}
                  onChange={handleInput}
                />
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className={`btn btn-accent ${
                    !Boolean(form.email) ? 'disabled' : ''
                  }`}
                  disabled={!Boolean(form.email)}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
