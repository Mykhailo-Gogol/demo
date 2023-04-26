import { openai } from "@/api/openapi";
import { TextCompletionsType } from "@/api/supabase/supabase.types";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { appConfig } from "@/utils";
import { faBookmark, faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FormEvent, useEffect, useState } from "react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export async function getServerSideProps(ctx: any) {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(session);
  const data = await supabase
    .from("text_completions")
    .select("*")
    .eq("user_id", session?.user.id);

  return {
    props: {
      data,
    },
  };
}

export default function App({ data }: { data: TextCompletionsType }) {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<any>(null);
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
        temperature: 0,
      });

      return setResponse(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabaseClient
      .from("text_completions")
      .insert([{ title: prompt, completion: result, user_id: user?.id }]);

    console.log(data, error);
  };

  useEffect(() => {
    const text: string = response?.data.choices[0].text as string;

    if (text) {
      setResult(text?.replaceAll("\n", ""));
    }
  }, [response]);

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
          className="btn btn-accent disabled:bg-accent"
          disabled={!Boolean(prompt)}
        >
          Submit
        </button>
      </form>

      <form onSubmit={handleSave} className="mb-20">
        <textarea
          rows={5}
          value={result || response || ""}
          onChange={(e) => setResult(e.target.value)}
          placeholder={
            loading
              ? "Loading..."
              : "What`s on your mind? Max answear length is 30 words"
          }
          className="textarea textarea-bordered textarea-md w-full max-w-lg mb-20"
        ></textarea>

        <div className="flex justify-center md:justify-start max-w-lg">
          <button className="btn btn-square mx-10">
            <FontAwesomeIcon icon={faBookmark} size={appConfig.iconSize} />
          </button>
          <button className="btn btn-square mx-10">
            <FontAwesomeIcon icon={faEdit} size={appConfig.iconSize} />
          </button>
        </div>
      </form>

      <div>
        {data
          ? data.data?.map((el) => (
              <div key={el.id} className="card bg-base-100 shadow-xl mb-10">
                <div className="card-body p-5">
                  <h2 className="card-title">{el.title}</h2>
                  <p>{el.completion}</p>
                </div>
              </div>
            ))
          : "Loading..."}
      </div>
    </div>
  );
}
