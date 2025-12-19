import {
  StyledInfo,
  StyledInfoRow,
  StyledPackageDetailPage,
  StyledTitle,
} from "./PackageDetailPage.styled";
import { T } from "@admiral-ds/react-ui";
import { useGetPackage } from "@entities/package/hook";
import { PackageStatusText } from "@entities/package/types";
import React from "react";
import { useParams } from "react-router-dom";

export const PackageDetailPage = () => {
  const { id } = useParams();

  const { data } = useGetPackage(id);

  return (
    <StyledPackageDetailPage>
      <StyledTitle font="Header/H3">
        Подробная информация о пакете услуг
      </StyledTitle>
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
            <T font="Additional/L">{PackageStatusText[data?.status] ?? ""}</T>
          </StyledInfoRow>
        )}

        {data?.accountNumber && (
          <StyledInfoRow>
            <T font="Main/XS-bold">Номер счёта:</T>
            <T font="Additional/L">{data?.accountNumber}</T>
          </StyledInfoRow>
        )}

        {data?.activationDateTime && (
          <StyledInfoRow>
            <T font="Main/XS-bold">Дата подключения подписки:</T>
            <T font="Additional/L">{data?.activationDateTime}</T>
          </StyledInfoRow>
        )}

        {data?.deactivationDateTime && (
          <StyledInfoRow>
            <T font="Main/XS-bold">Дата отключения подписки:</T>
            <T font="Additional/L">{data?.deactivationDateTime}</T>
          </StyledInfoRow>
        )}
      </StyledInfo>
    </StyledPackageDetailPage>
  );
};
