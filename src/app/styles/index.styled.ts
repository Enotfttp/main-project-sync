import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html,
    body {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
    }  
    
    body {
        font-family: "VTB Group UI", serif;
        background-color:${({ theme }) => theme.color["Neutral/Neutral 05"]} ;
        color: ${({ theme }) => theme.color["Neutral/Neutral 90"]} ;;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
`;
