import { openai } from "@/api/openapi";
import { appConfig } from "@/utils";
import { faAirbnb } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FormEvent, useState } from "react";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<any>(null);
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

  const text: string = response?.data.choices[0].text as string;

  return (
    <div className="mb-10">
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
          className="btn btn-secondary disabled:bg-secondary"
          disabled={!Boolean(prompt)}
        >
          Submit
        </button>
      </form>

      <div>
        <p className="md:w-1/2">
          {loading
            ? "Loading..."
            : response
            ? text
            : "What`s on your mind? Max answear length is 30 words"}
        </p>
      </div>
    </div>
  );
}
