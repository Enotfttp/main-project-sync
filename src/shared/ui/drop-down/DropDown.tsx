import {
  ButtonStyled,
  DropDownStyled,
  StyledSSystemSmallArrowUpOutline,
  StyledSystemSmallArrowDownOutline,
} from "./DropDown.styled";
import React, { useState } from "react";

interface IProps {
  children: React.ReactNode;
  headerChildren: React.ReactNode | string;
}

export const DropDown: React.FC<IProps> = ({ children, headerChildren }) => {
  const [isShow, setShow] = useState(false);

  return (
    <>
      <ButtonStyled
        appearance="ghost"
        dimension="s"
        onClick={() => setShow(!isShow)}
      >
        {headerChildren}
        {isShow ? (
          <StyledSystemSmallArrowDownOutline />
        ) : (
          <StyledSSystemSmallArrowUpOutline />
        )}
      </ButtonStyled>
      {isShow && <DropDownStyled isShow={isShow}>{children}</DropDownStyled>}
    </>
  );
};
