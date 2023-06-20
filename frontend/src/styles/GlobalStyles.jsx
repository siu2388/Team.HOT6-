import { createGlobalStyle } from 'styled-components';
import { res } from './responsive';

const GlobalStyle = createGlobalStyle`
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    html{
      overflow-x: hidden;
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 10px;
        vertical-align: baseline;

        @media ${res.mobile} {
            font-size: 6px;
        }

    }
    body{
        line-height: 1;
        font-family: 'Noto Sans KR', sans-serif;
        background-color: #F6F9F0;
    }
    ol, ul{
        list-style: none;
    }
    button {
        border: 0;
        background: transparent;
        cursor: pointer;
        padding: 0;
    }

    .MuiTextField-root {
    width: 100%;
  }

  .MuiFormControl-root {
    width: 100%;
    margin: 0;
    label {
      font-size: 1.4rem;
    }
     textarea {
        font-size: 1.4rem;
        line-height: 1.3;
        overflow-y: auto;
      }
  }

  .MuiOutlinedInput-input {
    font-size: 1.5rem;
  }

  .MuiInputLabel-root {
    font-size: 1.5rem;
  }

  .MuiSlider-root{
    width: 80% !important;
    margin-left: 10px;
  }

  .MuiFormLabel-root{
    font-size: 1.7rem;
    font-weight: 400;
    color: #111;
  }

  .MuiInputBase-input {
    font-size: 1.6rem !important;
    font-weight: 400 !important;
    color: #111 !important;
  }

  .MuiTypography-root{
    font-size: 1.4rem !important;
  }
  
  .MuiFormLabel-root{
    font-size: 1.5rem;
  }

  .MuiRadio-root, .Mui-checked{
    color: rgb(1, 136, 28) !important;
  }

  .Mui-disabled {
    -webkit-text-fill-color: #111;
  }
`;

export default GlobalStyle;
