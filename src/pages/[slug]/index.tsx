import React, { FormEvent, useEffect, useState } from 'react'
import { appConfig, features } from '@/utils'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookmark,
  faCopy,
  faTrashCan,
} from '@fortawesome/free-regular-svg-icons'
import { openai } from '@/api/openapi'
import { FeatureType } from '@/utils/types'
import {
  useSession,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react'
import { TextCompletionsType } from '@/api/supabase/supabase.types'
import { supabase } from '@/api/supabase'
import { useQuery } from '@tanstack/react-query'
import { getCompletionsBySlug } from '@/api/supabase/getCompletionsBySlug'

const colorRegex = '#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})'

export function getStaticPaths() {
  const paths = features.map(({ slug }) => ({
    params: {
      slug,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: any) {
  const { slug } = params
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const completions = await getCompletionsBySlug(slug, user)

  const feature = features.find((feature) => feature.slug === slug)

  return {
    props: {
      feature,
      completions,
    },
  }
}

export default function PageBySlug({
  feature,
  completions,
}: {
  feature: FeatureType
  completions: TextCompletionsType
}) {
  const supabaseClient = useSupabaseClient()
  const router = useRouter()
  const user = useUser()

  const session = useSession()

  const { data, refetch } = useQuery({
    queryKey: ['completions'],
    queryFn: () => getCompletionsBySlug(feature.slug, user),
    initialData: completions,
  })

  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [color, setColor] = useState<string | undefined>()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await openai.createCompletion({
        ...feature.settings,
        prompt: feature.label + '\n' + prompt,
      })

      const text: string = res?.data.choices[0].text as string

      if (text) {
        setResult(text.replaceAll('\n', ' '))
        if (text.match(colorRegex)) {
          setColor(text.match(colorRegex)?.[0])
        }
      }
      console.log(res)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()

    const { error, data } = await supabaseClient.from('completions').insert({
      title: prompt,
      completion: result,
      completion_slug: feature.slug,
    })

    console.log(data)
    console.log(error)

    await refetch()
  }

  const handleRemove = async (id: number) => {
    const { error, data } = await supabaseClient
      .from('completions')
      .delete()
      .eq('id', id)
      .eq('completion_slug', feature.slug)
      .eq('user_id', session?.user.id)

    console.log(data)
    console.log(error)

    await refetch()
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result)
      alert(`😎 ${result}`)
    } catch (e) {
      alert(`🎃 something went wrong`)
    }
  }

  const handleClear = () => {
    setPrompt('')
    setResult('')
    setColor('')
  }

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <div className="mb-10">
      <p className="pb-5 font-mono text-lg">{feature.subtitle}</p>
      <div
        className="mb-10 border-b-2 border-b-secondary"
        style={{ backgroundColor: color }}
      />
      <form onSubmit={handleSubmit} className="mb-10">
        <div className="form-control w-full max-w-lg mb-5">
          <label className="label mb-5">
            <span className="label-text text-base">
              {feature.label || 'Write a prompt:'}
            </span>
          </label>
          <input
            type="text"
            placeholder="Enter a prompt"
            title="Prompt"
            className="input input-bordered w-full max-w-lg"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn disabled:cursor-not-allowed"
          disabled={!Boolean(prompt)}
        >
          Submit
        </button>
      </form>
      <form className="mb-10">
        <textarea
          rows={5}
          value={result}
          onChange={(e) => setResult(e.target.value)}
          placeholder={
            loading
              ? 'Loading...'
              : 'Please submit prompt. Max answear length is 30 words'
          }
          className="textarea textarea-bordered textarea-md w-full max-w-lg"
        />
      </form>
      <div className="flex justify-evenly md:justify-start max-w-lg">
        <button
          type="submit"
          className="btn btn-square mx-5"
          disabled={Boolean(!prompt || !result)}
          onClick={handleSave}
        >
          <FontAwesomeIcon icon={faBookmark} size={appConfig.iconSize} />
        </button>
        <button
          disabled={Boolean(!prompt || !result)}
          className="btn btn-square mx-5"
          onClick={handleCopy}
        >
          <FontAwesomeIcon icon={faCopy} size={appConfig.iconSize} />
        </button>
        <button
          disabled={Boolean(!prompt || !result)}
          className="btn btn-square mx-5"
          onClick={handleClear}
        >
          <FontAwesomeIcon icon={faTrashCan} size={appConfig.iconSize} />
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-20 items-start">
        {data
          ? data?.map((el) => (
              <div
                key={el.id}
                className="card bg-neutral shadow-lg mb-10 max-h-60 overflow-y-scroll"
              >
                <div className="card-body p-5 ">
                  <h2 className="card-title">{el.title}</h2>
                  <p>{el.completion}</p>
                  <button
                    className="btn btn-md btn-square self-end mt-2"
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
