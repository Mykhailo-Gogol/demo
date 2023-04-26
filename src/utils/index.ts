import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

export const themes = {
  light: "light",
  dark: "dark",
  cupcake: "cupcake",
  bumblebee: "mblebee",
  emerald: "emerald",
  corporate: "rporate",
  synthwave: "nthwave",
  retro: "retro",
  cyberpunk: "berpunk",
  valentine: "lentine",
  halloween: "lloween",
  garden: "garden",
  forest: "forest",
  aqua: "aqua",
  lofi: "lofi",
  pastel: "pastel",
  fantasy: "fantasy",
  wireframe: "reframe",
  black: "black",
  luxury: "luxury",
  dracula: "dracula",
  cmyk: "cmyk",
  autumn: "autumn",
  business: "usiness",
  acid: "acid",
  lemonade: "emonade",
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
  defaultTheme: themes.cyberpunk,
};
