import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import styled, { createGlobalStyle } from 'styled-components';
import { Toaster } from 'sonner';

const GlobalStyles = createGlobalStyle`  
:root {
  --mainBlue: #1E6F9F;
  --dark: #000000;
   
  --gray-700: #0D0D0D;
  --gray-600: #1A1A1A;
  --gray-500: #262626;
  --gray-400: #4D4D4D;
  --gray-300: #808080;
  --gray-200: #B3B3B3;
  --gray-100:#E6E6E6;

  --red-600:#dc2626;
  --red-400: #f87171;

  --green-600: #16a34a;

  --yellow-600: #ca8a04;

  --blue-600: #2563eb;

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

.pagination-container {
  max-width: 700px;
 margin-left: auto;
 margin-right: auto;
}

.pagination {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
}

.pagination > li > a {
  display: grid;
  place-content: center;
  padding: 12px;
  background: var(--gray-500);
  height: 40px;
  width: 40px;
  cursor: pointer;
  color: var(--light);
}


.pagination > .previous > a {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  width: 50px;
  color: var(--light);
}

.pagination > .next > a {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  width: 50px;
  color: var(--light);
}

.pagination > li.active > a {
  background: #3e5eff;

  &:hover {
    background: #3959f8;
  }
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
