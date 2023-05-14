import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { FeatureType } from "./types";

import Plants1 from "@/static/cards/plants-1.jpg";
import Plants2 from "@/static/cards/plants-2.jpg";
import Plants3 from "@/static/cards/plants-3.jpg";
import Plants4 from "@/static/cards/plants-4.jpg";
import Plants5 from "@/static/cards/plants-5.jpg";

export const features: FeatureType[] = [
  {
    src: Plants1,
    slug: "grammar_correction",
    tags: ["Transformation", "Generation"],
    title: "Grammar correction",
    subtitle: "Corrects sentences into standard English.",
    callToActionText: "Let`s try",
    label: "Correct this to standard English:",
    settings: {
      model: "text-davinci-003",
      max_tokens: 60,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    },
  },

  {
    src: Plants2,
    slug: "questions_and_answears",
    tags: ["Answers", "Generation", "Conversation"],
    title: "Q&A",
    subtitle: "Answer questions based on existing knowledge.",
    callToActionText: "Let`s try",
    label:
      'I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with "Unknown".',
    settings: {
      model: "text-davinci-003",
      max_tokens: 100,
      temperature: 0,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    },
  },
  {
    src: Plants3,
    slug: "summarization",
    tags: ["Transformation", "Generation"],
    title: "TL;DR summarization",
    subtitle: "Summarize your very long text into a short summary.",
    callToActionText: "Let`s try",
    label: "Summarize text below:",
    settings: {
      model: "text-davinci-003",
      max_tokens: 60,
      temperature: 0.7,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 1,
    },
  },
  {
    src: Plants4,
    slug: "product_ad_from_description",
    tags: ["Generation"],
    title: "Ad from product description",
    subtitle: "Turn a product description into ad copy.",
    callToActionText: "Let`s try",
    label:
      "Write a creative ad for the following product to run on Facebook aimed at parents: Product:",
    settings: {
      model: "text-davinci-003",
      max_tokens: 100,
      temperature: 0.5,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    },
  },
  {
    src: Plants5,
    slug: "javascript_helper_chatbot",
    tags: ["Code", "Answers", "Conversation"],
    title: "JavaScript chatbot",
    subtitle:
      "This is a message-style chatbot that can answer questions about using JavaScript. It uses a few examples to get the conversation started.",
    callToActionText: "Let`s try",
    label: "",
    settings: {
      model: "text-davinci-003",
      max_tokens: 100,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.5,
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
