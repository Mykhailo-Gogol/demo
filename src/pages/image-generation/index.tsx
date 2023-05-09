import { openai } from "@/api/openapi";
import { TextCompletionsType } from "@/api/supabase/supabase.types";
import { User, useSupabaseClient } from "@supabase/auth-helpers-react";
import { appConfig } from "@/utils";
import {
  faBookmark,
  faEdit,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FormEvent, useEffect, useState } from "react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import Image, { ImageProps } from "next/image";

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
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await openai.createImage({
        prompt,
        n: 1,
        size: "512x512",
      });

      const url = res?.data.data[0].url;

      if (url) {
        setResult(url);
      }
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
          className="btn btn-accent disabled:bg-accent"
          disabled={!Boolean(prompt)}
        >
          Submit
        </button>
      </form>

      <div>
        {loading ? (
          <span>Loading...</span>
        ) : result ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 h-80">
            <Image
              src={result}
              className="object-cover h-80 w-full"
              width={500}
              height={500}
              alt="alt"
            />
          </div>
        ) : null}
      </div>

      {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data
          ? data.data?.map((el) => (
             <Image
                key={el.toString()}
                src={el}
                className="object-cover h-80 w-full"
                width={500}
                height={500}
                alt="alt"
              />
            ))
          : "Loading..."}
      </div> */}
    </div>
  );
}
