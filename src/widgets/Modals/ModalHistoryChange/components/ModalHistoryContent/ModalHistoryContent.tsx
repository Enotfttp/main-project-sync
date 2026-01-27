import { IRequestHistory } from "@entities/history/types";
import React from "react";

interface IProps {
  dataHistory: IRequestHistory;
}

export const ModalHistoryContent: React.FC<IProps> = ({ dataHistory }) => {
  console.log("dataHistory: ", dataHistory);
  return <>ModalHistoryContent</>;
};
