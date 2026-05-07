import {
  StyledInfo,
  StyledInfoRow,
  StyledPeriodDetailPage,
  StyledStatus,
  StyledTitle,
} from "./PeriodDetail.styled";
import { T } from "@admiral-ds/react-ui";
import { useGetPeriod } from "@entities/periods/hook";
import {
  resultStatusConfig,
  statusConfig,
} from "@pages/PeriodsPage/components/TableSection/column";
import React from "react";
import { useParams } from "react-router-dom";

export const PeriodDetail = () => {
  const { idPeriod } = useParams();

  const { data } = useGetPeriod(idPeriod);

  const resultStatusConf = React.useMemo(
    () => (data?.resultType ? resultStatusConfig[data.resultType] : null),
    [data?.resultType],
  );

  const statusConf = React.useMemo(
    () => (data?.status ? statusConfig[data.status] : null),
    [data?.status],
  );

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

        {resultStatusConf && (
          <StyledInfoRow>
            <T font="Main/S">Статус оплаты:</T>
            <StyledStatus {...resultStatusConf} dimension="m">
              {resultStatusConf.text}
            </StyledStatus>
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

        {statusConf && (
          <StyledInfoRow>
            <T font="Main/S">Статус:</T>
            <StyledStatus {...statusConf} dimension="m">
              {statusConf.text}
            </StyledStatus>
          </StyledInfoRow>
        )}

        {!!data?.amount && (
          <StyledInfoRow>
            <T font="Main/XS-bold">Сумма начисления в валюте:</T>
            <T font="Additional/L">{data?.amount}</T>
          </StyledInfoRow>
        )}

        {!!data?.additionalAmount && (
          <StyledInfoRow>
            <T font="Main/XS-bold">Сумма доначисления в валюте:</T>
            <T font="Additional/L">{data?.additionalAmount}</T>
          </StyledInfoRow>
        )}
      </StyledInfo>
    </StyledPeriodDetailPage>
  );
};
