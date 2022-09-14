import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { Link } from "react-router-dom";

export const GlobalStyled = createGlobalStyle`
  *{
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    font-size: 62.5%;
    font-weight: 500;
    margin: 0;
    padding: 0;
    text-decoration: none;
  }

  .helper {
    font-size: 1.6rem;
  }
`

export const StyledLink = styled(Link)`
  color: #000;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
`;