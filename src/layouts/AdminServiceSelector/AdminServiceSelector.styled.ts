import styled from "styled-components";

export const StyledUServiceSelector = styled.main`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  margin: auto;
`;

export const StyledUServiceTabs = styled.main`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 80%;
  gap: 20px;
  div {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

export const StyledUServiceSelectorLayout = styled.main`
  padding: 40px 0;
`;

export const StyledWhiteBlock = styled.div`
  display: flex;
  background-color: #fff;
  padding: 20px;
  border-radius: 25px;
  border: 2px solid #c3c2c2;
`;
