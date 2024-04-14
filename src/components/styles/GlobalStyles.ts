import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

body{
  margin: 0;
  background-color: #bebdbd;
  box-sizing: border-box;
}
*{
  box-sizing: border-box;
}

#root{
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-width: 1280px;
  width: 100vw;
}

`;
