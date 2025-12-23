import {
  StyledInfo,
  StyledInfoRow,
  StyledPeriodDetailPage,
  StyledTitle,
} from "./PeriodDetail.styled";
import { T } from "@admiral-ds/react-ui";
import { useGetPeriod } from "@entities/periods/hook";
import {
  PeriodsResultTypeText,
  PeriodsStatusText,
} from "@entities/periods/types";
import React from "react";
import { useParams } from "react-router-dom";

export const PeriodDetail = () => {
  const { idPeriod } = useParams();

  const { data } = useGetPeriod(idPeriod);

  return (
    <StyledPeriodDetailPage>
      <StyledTitle font="Header/H3">Подробная информация о периоде</StyledTitle>
      <StyledInfo>
        {data?.id && (
          <StyledInfoRow>
            <T font="Main/XS-bold">Индификатор записи:</T>
            <T font="Additional/L">{data?.id}</T>
          </StyledInfoRow>
        )}

        {data?.resultType && (
          <StyledInfoRow>
            <T font="Main/S">Статус оплаты:</T>
            <T font="Additional/L">
              {PeriodsResultTypeText[data?.resultType] ?? ""}
            </T>
          </StyledInfoRow>
        )}

        {data?.startDate && (
          <StyledInfoRow>
            <T font="Main/XS-bold">Дата начала периода действия:</T>
            <T font="Additional/L">{data?.startDate}</T>
          </StyledInfoRow>
        )}

        {data?.endDate && (
          <StyledInfoRow>
            <T font="Main/XS-bold">Дата окончания периода действия:</T>
            <T font="Additional/L">{data?.endDate}</T>
          </StyledInfoRow>
        )}

        {data?.status && (
          <StyledInfoRow>
            <T font="Main/XS-bold">Статус:</T>
            <T font="Additional/L">{PeriodsStatusText[data?.status] ?? ""}</T>
          </StyledInfoRow>
        )}

        {data?.amount && (
          <StyledInfoRow>
            <T font="Main/XS-bold">Сумма начисления в валюте:</T>
            <T font="Additional/L">{data?.amount}</T>
          </StyledInfoRow>
        )}

        {data?.additionalAmount && (
          <StyledInfoRow>
            <T font="Main/XS-bold">Сумма доначисления в валюте:</T>
            <T font="Additional/L">{data?.additionalAmount}</T>
          </StyledInfoRow>
        )}
      </StyledInfo>
    </StyledPeriodDetailPage>
  );
};
