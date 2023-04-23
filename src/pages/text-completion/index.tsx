import { openai } from "@/api/openapi";
import React from "react";

export async function getServerSideProps() {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    max_tokens: 7,
    temperature: 0,
  });

  return {
    props: {
      response: response.data,
    },
  };
}

export default function App({ response }: any) {
  return <div>{JSON.stringify(response)}</div>;
}
