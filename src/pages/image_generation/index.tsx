import { openai } from '@/api/openapi'
import { ImageGenerationsType } from '@/api/supabase/supabase.types'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { appConfig, features } from '@/utils'
import { faBookmark, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import React, { FormEvent, useEffect, useState } from 'react'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/router'
import Image from 'next/image'

export async function getServerSideProps(ctx: any) {
  const supabase = createServerSupabaseClient(ctx)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const data = await supabase
    .from('image_generations')
    .select('*')
    .eq('user_id', session?.user.id)

  return {
    props: {
      data,
      user: session?.user || null,
    },
  }
}

export default function ImageGeneration({
  data,
}: {
  data: ImageGenerationsType
}) {
  const router = useRouter()
  const user = useUser()
  const supabaseClient = useSupabaseClient()
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await openai.createImage({
        prompt,
        n: 1,
        size: '512x512',
      })

      const url = res?.data.data[0].url

      if (url) {
        setResult(url)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()

    const { data, error } = await supabaseClient
      .from('image_generations')
      .insert([{ title: prompt, image_url: result, user_id: user?.id }])

    console.log(data, error)
  }

  useEffect(() => {
    if (!user) {
      router.replace('/')
    }
  }, [user, router])

  const handleRemove = async (id: number) => {
    const { error } = await supabaseClient
      .from('image_generations')
      .delete()
      .eq('id', id)
    console.log(error)
  }

  return (
    <div className="mb-10">
      <p className="pb-5 font-mono text-lg">{features[12].title}</p>
      <div className="mb-10 border-b-2 border-b-primary" />
      <form onSubmit={handleSubmit} className="mb-20">
        <div className="form-control w-full max-w-lg mb-5">
          <label className="label mb-5">
            <span className="label-text text-base">
              {features[12].label || 'Write a prompt:'}
            </span>
          </label>
          <input
            type="text"
            placeholder="What`s on your mind?"
            className="input input-bordered w-full max-w-lg"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-neutral disabled:cursor-not-allowed"
          disabled={!Boolean(prompt)}
        >
          Submit
        </button>
      </form>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {loading ? (
          <span>Loading...</span>
        ) : result ? (
          <div>
            <Image
              src={result}
              className="object-cover h-80 w-full"
              width={500}
              height={500}
              alt="alt"
            />
          </div>
        ) : (
          <p className="flex items-center">
            <FontAwesomeIcon
              // investigate
              icon={faCircleInfo as any}
              size={appConfig.iconSize}
            />
            <span className="ml-2">
              Write a prompt and submit to generate an image
            </span>
          </p>
        )}
      </div>

      <div className="max-w-lg mb-10">
        <button
          onClick={handleSave}
          className="btn disabled:cursor-not-allowed"
          disabled={Boolean(!result)}
        >
          <FontAwesomeIcon icon={faBookmark} size={appConfig.iconSize} />
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data
          ? data.data?.map((el) => (
              <div className="card-body p-0" key={el.created_at}>
                <Image
                  src={el.image_url || ''}
                  className="object-cover h-80 w-full"
                  width={500}
                  height={500}
                  alt={el.title || ''}
                />

                <h2 className="card-title ">{el.title}</h2>
                <div className="flex justify-end">
                  <button
                    className="btn btn-md btn-square btn-ghost mt-2"
                    onClick={() => handleRemove(el.id)}
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      size={appConfig.iconSize}
                    />
                  </button>
                </div>
              </div>
            ))
          : 'Loading...'}
      </div>
    </div>
  )
}
