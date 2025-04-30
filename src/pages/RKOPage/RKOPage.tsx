import * as React from 'react';
import {useGetRKOList} from "@entities/rko";
import {Search} from "@features/Search/Search.tsx";
import {StyledRKOPage} from "./RKOPage.styled";
import {T} from "@admiral-ds/react-ui";
import {columnList} from "./RKOTable.columns.tsx";
import {TableSort} from "@features/TableSort/TableSort.tsx";
import {useNavigate} from "react-router-dom";
import {routesPath} from "@app/index";
import {additionalHover} from "@shared/index";

const RKOPage = () =>{
  const navigate = useNavigate();
  const {data} = useGetRKOList();

  const onRowClick = (rowId: string | number) =>{
    navigate(routesPath.service.connections.fullPath(rowId))
  }

  return (
    <StyledRKOPage>
      <T font="Header/H1">Договора РКО</T>
      <Search placeholder="Введите номер документа РКО"/>
      <TableSort columnList={columnList} rowList={additionalHover(data)} onRowClick={onRowClick} queryKey="rko-list"/>
    </StyledRKOPage>
  )
}

export default RKOPage;
