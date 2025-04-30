import * as React from 'react';
import {Search} from "@features/Search/Search.tsx";
import {StyledConnectionsPage} from "./ConnectionsPage.styled";
import {T} from "@admiral-ds/react-ui";
import {columnList} from "./ConnectionsTable.columns.tsx";
import {TableSort} from "@features/TableSort/TableSort.tsx";
import { useParams} from "react-router-dom";
import {useGetConnectionList} from "@entities/serviceConnect";

const ConnectionsPage = () =>{
  const {id} = useParams();
  if(!id){
    throw new Error('Вы не выбрали документ РКО')
  }

  const {data} = useGetConnectionList(id);

  return (
    <StyledConnectionsPage>
      <T font="Header/H1">Подписки</T>
      <Search placeholder="Введите номер подписки"/>
      <TableSort columnList={columnList} rowList={data || []}  queryKey="serviceConnection-list"/>
    </StyledConnectionsPage>
  )
}

export default ConnectionsPage;
