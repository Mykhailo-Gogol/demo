import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { FeatureType } from "./types";

import first from "@/static/cards/first.jpg";
import second from "@/static/cards/second.jpg";
import third from "@/static/cards/third.jpg";
// import fourth from "@/static/cards/fourth.jpg";
// import fifth from "@/static/cards/fourth.jpg";

export const features: FeatureType[] = [
  {
    src: first,
    slug: "summarization",
    tags: ["Transformation", "Generation"],
    title: "TL;DR summarization",
    subtitle: "Summarize text ",
    callToActionText: "Let`s try",
    label: "Summarize text:",
    settings: {
      model: "text-davinci-003",
      temperature: 0.7,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 1,
    },
  },
  {
    src: second,
    slug: "grammar_correction",
    tags: ["Transformation", "Generation"],
    title: "Grammar correction",
    subtitle: "Corrects sentences into standard English.",
    callToActionText: "Let`s try",
    label: "Correct this to standard English:",
    settings: {
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    },
  },

  {
    src: third,
    slug: "questions_and_answears",
    tags: ["Answers", "Generation", "Conversation"],
    title: "Q&A",
    subtitle: "Answer questions based on existing knowledge.",
    callToActionText: "Let`s try",
    label:
      'I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with "Unknown".',
    settings: {
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    },
  },
];

export const themes = {
  light: "light",
  dark: "dark",
  cupcake: "cupcake",
  bumblebee: "mblebee",
  emerald: "emerald",
  corporate: "rporate",
  synthwave: "nthwave",
  retro: "retro",
  cyberpunk: "cyberpunk",
  valentine: "valentine",
  halloween: "helloween",
  garden: "garden",
  forest: "forest",
  aqua: "aqua",
  lofi: "lofi",
  pastel: "pastel",
  fantasy: "fantasy",
  wireframe: "wireframe",
  black: "black",
  luxury: "luxury",
  dracula: "dracula",
  cmyk: "cmyk",
  autumn: "autumn",
  business: "business",
  acid: "acid",
  lemonade: "lemonade",
  night: "night",
  coffee: "coffee",
  winter: "winter",
};

interface AppConfigType {
  iconSize: FontAwesomeIconProps["size"];
  defaultTheme: string;
}

export const appConfig: AppConfigType = {
  iconSize: "xl",
  defaultTheme: themes.pastel,
};
