import "astro/astro-jsx";

declare global {
  namespace JSX {
    // astroHTML.JSX.Element is `any`; use HTMLElement for strict typed linting.
    type Element = HTMLElement;
  }
}
