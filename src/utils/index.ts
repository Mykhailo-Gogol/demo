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
  defaultTheme: themes.cyberpunk,
};
