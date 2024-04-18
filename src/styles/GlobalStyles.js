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
  --color-red: #FF0000; 

  --color-brand: #F9F3E6;
  
  --color-danger: #000000;

  --color-line: rgba(0, 0, 0, .2);

  --background-color: #FFFFFF;
  --background-color-grey: #D9D9D9;

  --border-radius-sm: .5rem;
  --border-radius-md: 1rem;
  --border-radius-lg: 2rem;

  /* --width-desktop: calc(100vw - 7rem); */
  --width-max: 3840px;
  --width-text-max: 700px; 
  --width-main: 1200px;

  --padding-s: 2rem;
  --padding-m: 4rem;
  --padding-l: 6rem;
  --padding-xl: 10rem;
  --padding-v: 2rem;
  --padding-row: 25vw;
  --padding-sides: 2rem;
  --padding-right: 1rem;

  --font: "Plus Jakarta Sans", sans-serif;

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
  font-size: 15px;
  color: var(--color-grey-900);
}

html {
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
}

body {
  font-family: var(--font);
  font-optical-sizing: auto;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;
}

p {
  font-size: 1rem;
      font-weight: 400;
      line-height: 1rem;
      line-height: 1.5rem;
}

.bold {
  font-weight: 700;
}

p.small {
  font-size: .8rem;
  line-height: 1.25rem;
  letter-spacing: .05rem;
  font-weight: 500;
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
  font-size: 1.5rem;
  transition: all .3s ease-in-out;
}

.downArrow {
  transform: rotate(180);
  /* padding-bottom: 0.3rem; */
  font-size: 1.5rem;
  transition: all .3s ease-in-out;
}

//OVERRIDES
.faded {
  color: var(--color-grey-300)
}

`;

export default GlobalStyles;
