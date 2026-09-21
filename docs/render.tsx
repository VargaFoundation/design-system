import { renderToStaticMarkup } from "react-dom/server";
import { Showcase } from "./showcase";

export function render(): string {
  return renderToStaticMarkup(<Showcase />);
}
