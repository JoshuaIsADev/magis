import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
  --color-grey-0: #fff;
  --color-grey-100: #dedede;
  --color-grey-200: #bebebe;
  --color-grey-300: #9e9e9e;
  --color-grey-400: #808080;
  --color-grey-500: #636363;
  --color-grey-600: #484848;
  --color-grey-700: #2e2e2e;
  --color-grey-800: #161616;
  --color-grey-900: #292929;
  
  --color-danger: #FCFF55;

  --cell: 2rem;
  --border: 1px solid var(--color-grey-900);
  --top: 6rem;
  --bottom: 6rem;
  --grid-gap: 2rem;
  --padding-body: 1rem;

  --font: "Overpass Mono", monospace;
  --letter-space: .1rem;
  --letter-space-l: .4rem;
  --line-height: 1rem;
  @media (max-width: 600px) {
    --top: 12rem;
    --grid-gap: 1rem;
  }
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 12px;
  color: var(--color-grey-900);
}

html {
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
}

body {
  font-family: var(--font);
  font-optical-sizing: auto;
  font-style: normal;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;
  letter-spacing: var(--letter-space);
}

p {
  font-size: 1rem;
  font-weight: 500;
  line-height: var(--line-height);
  letter-spacing: var(--letter-space);
}

li {
  list-style: none;
}

img {
  object-fit: cover;
  object-position: top ;
  width: 100%;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
}

.underline {
  text-decoration-thickness: 3px;
  text-underline-offset: 1rem;
}

/* .swiper-slide {
  max-width: 800px;
} */

.test {
  background-color: #484848;
}

.arrow {
  /* padding-top: 0.3rem; */
  font-size: 1.25rem;
  transition: all .3s ease-in-out;
}

.downArrow {
  transform: rotate(180);
  /* padding-bottom: 0.3rem; */
  font-size: 1.25rem;
  transition: all .3s ease-in-out;
}

//OVERRIDES
.faded {
  color: var(--color-grey-300)
}

`;

export default GlobalStyles;
