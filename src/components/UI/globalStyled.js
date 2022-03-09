import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { Link } from "react-router-dom";

export const GlobalStyled = createGlobalStyle`
    *{
      
      box-sizing: border-box;
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
      font-weight: 500;
      margin: 0;
      padding: 0;
      text-decoration: none;
    }
`

export const StyledLink = styled(Link)`
  color: #000;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  text-decoration: none;
`;