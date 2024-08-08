import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import styled, { createGlobalStyle } from 'styled-components';
import { Toaster } from 'sonner';

const GlobalStyles = createGlobalStyle`  
:root {
  --mainBlue: #1E6F9F;
  --gray-700: #0D0D0D;
  --gray-600: #1A1A1A;
  --gray-500: #262626;
  --gray-400: #4D4D4D;
  --gray-300: #808080;
  --gray-200: #B3B3B3;
  --gray-100:#E6E6E6;

  --red-600:#dc2626;
  --red-400: #f87171;
  --light: #ffffff;
  --backgroundMain: #1A1A1A;
  --family-text: 'Roboto', sans-serif;
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
    <Toaster
      richColors
      toastOptions={{
        style: { minHeight: '50px', paddingLeft: '20px', paddingRight: '20px' },
      }}
    />
    <App />
  </React.StrictMode>
);
