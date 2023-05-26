import React, { FormEvent, useEffect, useState } from "react";
import { appConfig, features } from "@/utils";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faCopy } from "@fortawesome/free-regular-svg-icons";
import { openai } from "@/api/openapi";
import { FeatureType } from "@/utils/types";
import { useUser } from "@supabase/auth-helpers-react";

export function getStaticPaths() {
  const paths = features.map(({ slug }) => ({
    params: {
      slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const { slug } = params;

  const featureData = features.find((feature) => feature.slug === slug);
  return {
    props: {
      featureData,
    },
  };
}

export default function PageBySlug({
  featureData,
}: {
  featureData: FeatureType;
}) {
  const router = useRouter();
  const user = useUser();

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await openai.createCompletion({
        ...featureData.settings,
        prompt: featureData.label + "\n" + prompt,
      });

      const text: string = res?.data.choices[0].text as string;

      if (text) {
        setResult(text.replaceAll("\n", ""));
      }
      console.log(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // const handleSave = async (e: FormEvent) => {
  //   e.preventDefault();

  //   const { error } = await supabaseClient
  //     .from("text_completions")
  //     .insert([{ title: prompt, completion: result, user_id: user?.id }]);

  //   console.log(error);
  // };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    alert(`😎 ${result}`);
  };

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="mb-10">
      <div className="mb-10 h-4 rounded-md bg-accent" />
      <form onSubmit={handleSubmit} className="mb-10">
        <div className="form-control w-full max-w-lg mb-5">
          <label className="label mb-5">
            <span className="label-text text-base">
              {featureData.label || "Write a prompt:"}
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
          className="btn btn-accent disabled:cursor-not-allowed"
          disabled={!Boolean(prompt)}
        >
          Submit
        </button>
      </form>

      <form onSubmit={() => {}} className="mb-10">
        <textarea
          rows={5}
          value={loading ? "Loading..." : result}
          onChange={(e) => setResult(e.target.value)}
          placeholder={
            loading ? "Loading..." : "Max answear length is 30 words"
          }
          className="textarea textarea-bordered textarea-md w-full max-w-lg"
        />
      </form>
      <div className="flex justify-evenly md:justify-start max-w-lg">
        {/* <button
            type="submit"
            className="btn btn-square btn-accent mx-10"
            disabled={Boolean(!prompt || !result)}
          >
            <FontAwesomeIcon icon={faBookmark} size={appConfig.iconSize} />
          </button> */}
        <button
          disabled={Boolean(!result)}
          className="btn btn-square btn-accent"
          onClick={handleCopy}
        >
          <FontAwesomeIcon icon={faCopy} size={appConfig.iconSize} />
        </button>
      </div>
    </div>
  );
}

// test
