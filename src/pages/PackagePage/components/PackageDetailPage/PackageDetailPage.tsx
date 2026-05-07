import {
  StyledInfo,
  StyledInfoRow,
  StyledPackageDetailPage,
  StyledStatus,
  StyledTitle,
} from "./PackageDetailPage.styled";
import { T } from "@admiral-ds/react-ui";
import { useGetPackage } from "@entities/package/hook";
import { statusConfig } from "@pages/PackagesPage/components/TableSection/column";
import { findThemeStorage } from "@shared/common";
import React from "react";
import { useParams } from "react-router-dom";

export const PackageDetailPage = () => {
  const { id } = useParams();

  const { data } = useGetPackage(id);

  const statusDataConfig = React.useMemo(() => {
    if (!data?.status) return "";
    const theme = findThemeStorage();

    const config = statusConfig(theme)[data?.status];

    if (!config) return null;
    return config;
  }, [data?.status]);

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

        {statusDataConfig && (
          <StyledInfoRow>
            <T font="Main/S">Статус:</T>
            <StyledStatus {...statusDataConfig} dimension="m">
              {statusDataConfig?.text || ""}
            </StyledStatus>
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
