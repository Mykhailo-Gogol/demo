import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { appConfig } from '@/utils'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

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

  const handleGoogleSignIn = async () => {
    const data = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL,
      },
    })

    console.log(data)
  }

  return (
    <div className="hero my-24">
      <div className="hero-content p-0 flex-col lg:flex-row-reverse lg:justify-around md:gap-10">
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="py-6 text-xl">
            {/* Log in to Box Office News to engage AI in your learning: Grammar
            Correction, Q&A, Summarization, Ad Generator, Explain Code, and more */}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            beatae quisquam provident repellendus odit minima.
          </p>
        </div>
        {submited && !user ? (
          <div className="flex flex-col text-center lg:w-1/3">
            <span className="mb-4 text-xl">
              Welcome! Check out your email, and click log in Box Office News{' '}
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
                  className={`btn mb-2 ${!Boolean(form.email) ? 'disabled' : ''}`}
                  disabled={!Boolean(form.email)}
                >
                  Login
                </button>
                <button
                  type="button"
                  className={`btn ${!Boolean(form.email) ? 'disabled' : ''}`}
                  onClick={handleGoogleSignIn}
                >
                  <FontAwesomeIcon icon={faGoogle} size={appConfig.iconSize} />
                  <span className="pl-2">Login with Google</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
