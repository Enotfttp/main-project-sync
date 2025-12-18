import {
  StyledInfo,
  StyledInfoRow,
  StyledScheduleDetailPage,
  StyledTitle,
} from "./ScheduleDetail.styled";
import { T } from "@admiral-ds/react-ui";
import { useGetSchedule } from "@entities/schedule/hook";
import { PaymentScheduleStatusText } from "@entities/schedule/types";
import React from "react";
import { useParams } from "react-router-dom";

export const ScheduleDetail = () => {
  const { idSchedule } = useParams();

  const { data } = useGetSchedule(idSchedule);

  return (
    <StyledScheduleDetailPage>
      <StyledTitle font="Header/H3">Подробная информация о графике</StyledTitle>
      <StyledInfo>
        {data?.id && (
          <StyledInfoRow>
            <T font="Main/XS-bold">Индификатор записи:</T>
            <T font="Additional/L">{data?.id}</T>
          </StyledInfoRow>
        )}

        {data?.status && (
          <StyledInfoRow>
            <T font="Main/S">Статус:</T>
            <T font="Additional/L">
              {PaymentScheduleStatusText[data?.status] ?? ""}
            </T>
          </StyledInfoRow>
        )}

        {data?.dataName && (
          <StyledInfoRow>
            <T font="Main/XS-bold">Наименование ПУ:</T>
            <T font="Additional/L">{data?.dataName}</T>
          </StyledInfoRow>
        )}

        {data?.dataTrfNumber && (
          <StyledInfoRow>
            <T font="Main/XS-bold">Номер ПУ:</T>
            <T font="Additional/L">{data?.dataTrfNumber}</T>
          </StyledInfoRow>
        )}

        {data?.utilityCurrencyTariff && (
          <StyledInfoRow>
            <T font="Main/XS-bold">Валюта тарифа:</T>
            <T font="Additional/L">{data?.utilityCurrencyTariff}</T>
          </StyledInfoRow>
        )}

        {data?.utilityAmountFullCur && (
          <StyledInfoRow>
            <T font="Main/XS-bold">
              Общая сумма комисии с учётом скидок, без НДС:
            </T>
            <T font="Additional/L">{data?.utilityAmountFullCur}</T>
          </StyledInfoRow>
        )}

        {data?.utilityPriority && (
          <StyledInfoRow>
            <T font="Main/XS-bold">Приоритет оплаты:</T>
            <T font="Additional/L">{data?.utilityPriority}</T>
          </StyledInfoRow>
        )}

        {data?.vatDocumentTypeAmountFullNds && (
          <StyledInfoRow>
            <T font="Main/XS-bold">
              Общая сумма комисии с учётом скидок, с НДС:
            </T>
            <T font="Additional/L">{data?.vatDocumentTypeAmountFullNds}</T>
          </StyledInfoRow>
        )}

        {data?.vatDocumentTypeVatRate && (
          <StyledInfoRow>
            <T font="Main/XS-bold">Ставка НДС:</T>
            <T font="Additional/L">{data?.vatDocumentTypeVatRate}</T>
          </StyledInfoRow>
        )}

        {data?.vatDocumentTypeAmountNdsCur && (
          <StyledInfoRow>
            <T font="Main/XS-bold">Сумма НДС в валюте тарифа:</T>
            <T font="Additional/L">{data?.vatDocumentTypeAmountNdsCur}</T>
          </StyledInfoRow>
        )}

        {!!data?.processDocProcessCode && (
          <StyledInfoRow>
            <T font="Main/XS-bold">Код управляющего признака:</T>
            <T font="Additional/L">{data?.processDocProcessCode}</T>
          </StyledInfoRow>
        )}

        {data?.processDocProcessStartDate && (
          <StyledInfoRow>
            <T font="Main/XS-bold">Дата начала списания комиссии:</T>
            <T font="Additional/L">{data?.processDocProcessStartDate}</T>
          </StyledInfoRow>
        )}

        {data?.processDocProcessEndDate && (
          <StyledInfoRow>
            <T font="Main/XS-bold">Дата окончания списания комиссии:</T>
            <T font="Additional/L">{data?.processDocProcessEndDate}</T>
          </StyledInfoRow>
        )}
      </StyledInfo>
    </StyledScheduleDetailPage>
  );
};
