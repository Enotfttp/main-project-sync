import {
  StyledAdditionalErrorInfo,
  StyledError,
  StyledSquare,
} from "./AdditionalErrorInfo.styled";
import { T } from "@admiral-ds/react-ui";
import { useAdditionalErrorData } from "@entities/admin/admin.hook";
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";

export const AdditionalErrorInfo: React.FC = () => {
  const { serviceId } = useParams();

  const { data } = useAdditionalErrorData(serviceId);

  const total = useMemo(
    () => data?.reduce((acc, el) => (acc += el.count), 0) || 0,
    [data],
  );

  return (
    <StyledAdditionalErrorInfo>
      {data?.map((error) => {
        const percentage = total > 0 ? (error.count / total) * 100 : 0;

        return (
          <StyledError key={error.id}>
            <StyledSquare />
            <T font="Body/Body 2 Long">
              КОД {error.code} - {error.count} ({percentage.toFixed(1)}%)
            </T>
          </StyledError>
        );
      })}
    </StyledAdditionalErrorInfo>
  );
};
