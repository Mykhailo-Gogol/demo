import { openai } from "@/api/openapi";
import React, { FormEvent, useState } from "react";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<any>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 30,
      temperature: 0,
    });

    return setResponse(res);
  };

  const text: string = (response?.data.choices[0].text as string).replaceAll(
    "\n",
    ""
  );

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-20">
        <div className="form-control w-full max-w-xs mb-5">
          <label className="label">
            <span className="label-text">Write a prompt</span>
          </label>
          <input
            type="text"
            placeholder="What`s on your mind?"
            className="input input-bordered w-full max-w-xs"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-ghost"
          disabled={!Boolean(prompt)}
        >
          Submit
        </button>
      </form>

      <div>
        {response ? (
          <span>{text}</span>
        ) : (
          <span className="label-text">
            What`s on your mind? Max answear length is 30
          </span>
        )}
      </div>
    </div>
  );
}
