import { openai } from "@/api/openapi";
import { TextCompletionsType } from "@/api/supabase/supabase.types";
import { User, useSupabaseClient } from "@supabase/auth-helpers-react";
import { appConfig } from "@/utils";
import {
  faBookmark,
  faCopy,
  faEdit,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FormEvent, useEffect, useState } from "react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";

export async function getServerSideProps(ctx: any) {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const data = await supabase
    .from("text_completions")
    .select("*")
    .eq("user_id", session?.user.id);

  return {
    props: {
      data,
      user: session?.user || null,
    },
  };
}

export default function App({
  data,
  user,
}: {
  data: TextCompletionsType;
  user: User;
}) {
  // const user = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 60,
        temperature: 1,
      });

      const text: string = res?.data.choices[0].text as string;

      if (text) {
        setResult(text);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    const { error } = await supabaseClient
      .from("text_completions")
      .insert([{ title: prompt, completion: result, user_id: user?.id }]);

    console.log(error);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    alert("😎 Copied");
  };

  const handleRemove = async (id: number) => {
    const { data, error } = await supabaseClient
      .from("text_completions")
      .delete()
      .eq("id", id);

    console.log(error);
  };

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="mb-10">
      <form onSubmit={handleSubmit} className="mb-20">
        <div className="form-control w-full max-w-lg mb-5">
          <label className="label">
            <span className="label-text">Write a prompt</span>
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
          className="btn btn-accent disabled:cursor-not-allowed"
          disabled={!Boolean(prompt)}
        >
          Submit
        </button>
      </form>

      <form onSubmit={handleSave} className="mb-10">
        <textarea
          rows={5}
          value={result || ""}
          onChange={(e) => setResult(e.target.value)}
          placeholder={
            loading
              ? "Loading..."
              : "What`s on your mind? Max answear length is 30 words"
          }
          className="textarea textarea-bordered textarea-md w-full max-w-lg mb-10"
        ></textarea>

        <div className="flex justify-evenly md:justify-start max-w-lg">
          <button
            type="submit"
            className="btn btn-square btn-accent mx-10"
            disabled={Boolean(!prompt || !result)}
          >
            <FontAwesomeIcon icon={faBookmark} size={appConfig.iconSize} />
          </button>
          <button
            disabled={Boolean(!result)}
            className="btn btn-square btn-accent mx-10"
            onClick={handleCopy}
          >
            <FontAwesomeIcon icon={faCopy} size={appConfig.iconSize} />
          </button>
        </div>
      </form>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data
          ? data.data?.map((el) => (
              <div key={el.id} className="card shadow-lg mb-10">
                <div className="card-body p-5">
                  <h2 className="card-title text-accent">{el.title}</h2>
                  <p>{el.completion}</p>
                  <button
                    className="btn btn-md btn-square btn-accent self-end mt-2"
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
          : "Loading..."}
      </div>
    </div>
  );
}
