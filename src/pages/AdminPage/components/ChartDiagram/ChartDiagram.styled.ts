import styled from "styled-components";

export const StyledWhiteBlock = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color["Neutral/Neutral 00"]};
  padding: 40px;
  border-radius: 25px;
  border: 2px solid #c3c2c2;
  width: 100%;
  height: 100%;
  svg {
    align-self: center;
  }
`;

export const StyledServiceText = styled.h2`
  text-align: left;
  margin: 0 0 44px 0;
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.color["Neutral/Neutral 90"]};
`;

export const StyledDiagramLegendBlock = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2fr;
  gap: 50px;
  margin: auto;
`;
