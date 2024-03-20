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
  --color-grey-900: #000000;

  --color-brand: #F0F406;
  
  --color-danger: #000000;

  --color-line: rgba(0, 0, 0, .2);

  --background-color: #FFFFFF;
  --background-color-grey: #D9D9D9;

  --border-radius-sm: .5rem;
  --border-radius-md: 1rem;
  --border-radius-lg: 2rem;

  /* --width-desktop: calc(100vw - 7rem); */
  --width-max: 1920px;
  --width-text-max: 700px; 
  --width-main: 1200px;

  --padding-row: 25vw;
  --padding-sides: 2rem;

  @media (max-width: 1400px) {
  --padding-row: 12vw;
}
@media (max-width: 1000px) {
  --padding-row: 0vw;
}
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 16px;
  color: var(--color-gray-900);
}

html {
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
}

body {
  font-family: "Plus Jakarta Sans", sans-serif;
  font-optical-sizing: auto;
  /* overflow-x: hidden; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
}

a {
  text-decoration: none;
}

p {
  font-size: 1.25rem;
      font-weight: 800;
      line-height: 1.25rem;
}

li {
  list-style: none;
}

img {
  object-fit: cover;
  object-position: top ;
  width: 100%;
}

.underline {
  text-decoration-thickness: 3px;
  text-underline-offset: 1rem;
}

/* .swiper-slide {
  max-width: 800px;
} */


//OVERRIDES
.faded {
  color: var(--color-grey-300)
}

`;

export default GlobalStyles;
