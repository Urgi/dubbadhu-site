import { renderToString } from "react-dom/server";
import App from "./App.jsx";

/** Build-time render of the homepage, so crawlers get the page text without JavaScript. */
export function render() {
  return renderToString(<App />);
}
