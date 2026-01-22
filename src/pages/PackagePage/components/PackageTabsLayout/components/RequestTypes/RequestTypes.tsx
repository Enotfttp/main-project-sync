import { StyledTag } from "./RequestTypes.styled";
import { statusConfig } from "./utils";
import { Tags } from "@admiral-ds/react-ui";
import { useGetRequestTypes } from "@entities/requestTypes/hook";
import {
  IRequestType,
  RequestTypesEventTypeText,
} from "@entities/requestTypes/types";
import { useModalManager } from "@features/ModalRouting/useModalManager";
import React from "react";
import { useParams } from "react-router-dom";

export const RequestTypes = () => {
  const { id } = useParams();
  const { data: requestTypes } = useGetRequestTypes(id!);
  const { openModal } = useModalManager();

  const clickHandler = (requestType: IRequestType) => {
    openModal("historyRequestType", {
      params: { id: requestType.id.toString(), type: requestType.eventType },
    });
  };

  return (
    <Tags>
      {requestTypes?.map((requestType) => {
        const config = statusConfig[requestType.status];

        return (
          <StyledTag
            key={requestType.id}
            statusViaBackground
            dimension="m"
            isBorderHidden={false}
            {...config}
            onClick={() => clickHandler(requestType)}
          >
            {RequestTypesEventTypeText[requestType.eventType]}
          </StyledTag>
        );
      })}
    </Tags>
  );
};
