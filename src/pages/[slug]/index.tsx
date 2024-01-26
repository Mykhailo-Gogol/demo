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

  const featureData = features.find((feature) => feature.slug === slug)

  return {
    props: {
      featureData,
    },
  }
}

export default function PageBySlug({
  featureData,
}: {
  featureData: FeatureType
}) {
  const supabaseClient = useSupabaseClient()
  const router = useRouter()
  const user = useUser()

  const session = useSession()

  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [color, setColor] = useState<string | undefined>()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await openai.createCompletion({
        ...featureData.settings,
        prompt: featureData.label + '\n' + prompt,
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
      completion_slug: featureData.slug,
    })

    console.log(data)
    console.log(error)
  }

  const [completionsForSlug, setMyCompletionsForSlug] =
    useState<TextCompletionsType>([])

  const handleRemove = async (id: number) => {
    const { error } = await supabaseClient
      .from('completions')
      .delete()
      .eq('id', id)
      .eq('completion_slug', featureData.slug)
      .eq('user_id', session?.user.id)

    console.log(error)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result)
      alert(`😎 ${result}`)
    } catch (e) {
      alert(`🎃 something went wrong`)
    }
  }

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    if (session?.user.id) {
      const fetchCompletions = async () => {
        const { data } = await supabase
          .from('completions')
          .select('*')
          .eq('completion_slug', featureData.slug)
          .eq('user_id', session?.user.id)

        if (data) {
          setMyCompletionsForSlug(data)
        }
      }

      fetchCompletions()
    }
  }, [session?.user.id, featureData.slug])

  return (
    <div className="mb-10">
      <p className="pb-5 fot-medium">{featureData.subtitle}</p>
      <div
        className="mb-10 h-4 rounded-md bg-primary"
        style={{ backgroundColor: color }}
      />
      <form onSubmit={handleSubmit} className="mb-10">
        <div className="form-control w-full max-w-lg mb-5">
          <label className="label mb-5">
            <span className="label-text text-base">
              {featureData.label || 'Write a prompt:'}
            </span>
          </label>
          <input
            type="text"
            placeholder="..."
            className="input input-bordered w-full max-w-lg"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary disabled:cursor-not-allowed"
          disabled={!Boolean(prompt)}
        >
          Submit
        </button>
      </form>
      <form onSubmit={() => {}} className="mb-10">
        <textarea
          rows={5}
          value={loading ? 'Loading...' : result}
          onChange={(e) => setResult(e.target.value)}
          placeholder={
            loading ? 'Loading...' : 'Max answear length is 30 words'
          }
          className="textarea textarea-bordered textarea-md w-full max-w-lg"
        />
      </form>
      <div className="flex justify-evenly md:justify-start max-w-lg">
        <button
          type="submit"
          className="btn btn-square btn-primary mx-10"
          disabled={Boolean(!prompt || !result)}
          onClick={handleSave}
        >
          <FontAwesomeIcon icon={faBookmark} size={appConfig.iconSize} />
        </button>
        <button
          disabled={Boolean(!result)}
          className="btn btn-square btn-primary"
          onClick={handleCopy}
        >
          <FontAwesomeIcon icon={faCopy} size={appConfig.iconSize} />
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-20">
        {completionsForSlug
          ? completionsForSlug?.map((el) => (
              <div key={el.id} className="card bg-secondary shadow-lg mb-10">
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
