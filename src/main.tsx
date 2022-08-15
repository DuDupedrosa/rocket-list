import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`  
:root {
  --gray-700: #0D0D0D;
  --gray-500: #262626;
  --gray-300: #808080;
  --gray-100:#F2F2F2:
  --blue-dark: #1E6F9F;
  --backgroundMain: #1A1A1A;
  --family-text: 'Inter', sans-serif;
}

* {
margin: 0;
padding: 0;
box-sizing: border-box;
font-family: var(--family-text);
}

body {
font-family: var(--family-text);
background-color: var(--backgroundMain);
}

img {
display: block;
max-width: 100%;
}

ul {
list-style: none;
}

a {
text-decoration: none;
display: inline-block;
}
`;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
