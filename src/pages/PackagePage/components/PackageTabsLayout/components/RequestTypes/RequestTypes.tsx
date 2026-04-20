import { StyledTag } from "./RequestTypes.styled";
import { statusConfig } from "./utils";
import { Tags } from "@admiral-ds/react-ui";
import { useGetRequestTypes } from "@entities/requestTypes/hook";
import {
  ERequestTypesEventType,
  IRequestType,
} from "@entities/requestTypes/types";
import { useModalManager } from "@features/ModalRouting/useModalManager";
import React from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "styled-components";

export const RequestTypes = () => {
  const { id } = useParams();
  const { data: requestTypes } = useGetRequestTypes(id!);
  const { openModal } = useModalManager();
  const theme = useTheme();

  const clickHandler = (requestType: IRequestType) => {
    openModal("historyRequestType", {
      params: { id: requestType.id.toString(), type: requestType.eventType },
    });
  };

  return (
    <Tags width="100%">
      {requestTypes?.map((requestType) => {
        const config = statusConfig(theme)[requestType.status];

        return (
          <StyledTag
            key={requestType.id}
            statusViaBackground
            dimension="m"
            isBorderHidden={false}
            {...config}
            onClick={() => clickHandler(requestType)}
          >
            {ERequestTypesEventType[requestType.eventType]}
          </StyledTag>
        );
      })}
    </Tags>
  );
};
