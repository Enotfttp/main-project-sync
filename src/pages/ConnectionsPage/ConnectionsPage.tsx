import * as React from 'react';
import {useGetRKOList} from "@entities/rko";
import {Search} from "@features/Search/Search.tsx";
import {StyledConnectionsPage} from "./ConnectionsPage.styled";
import {T} from "@admiral-ds/react-ui";
import {columnList} from "./ConnectionsTable.columns.tsx";
import {TableSort} from "@features/TableSort/TableSort.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {routesPath} from "@app/index";
import {useGetConnectionList} from "@entities/serviceConnect";

const ConnectionsPage = () =>{
  const {id} = useParams();
  if(!id){
    throw new Error('Вы не выбрали документ РКО')
  }

  const navigate = useNavigate();
  const {data} = useGetConnectionList(id);

  const onRowClick = (rowId: string | number) =>{
    navigate(routesPath.service.packages.fullPath(rowId))
  }

  return (
    <StyledConnectionsPage>
      <T font="Header/H1">Подписки</T>
      <Search placeholder="Введите номер документа РКО"/>
      <TableSort columnList={columnList} rowList={data || []} onRowClick={onRowClick} />
    </StyledConnectionsPage>
  )
}

export default ConnectionsPage;
