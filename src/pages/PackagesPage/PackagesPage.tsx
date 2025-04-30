import * as React from 'react';
import {Search} from "@features/Search/Search.tsx";
import {StyledPackagesPage} from "./PackagesPage.styled.ts";
import {T} from "@admiral-ds/react-ui";
import {columnList} from "./PackagesTable.columns.tsx";
import {TableSort} from "@features/TableSort/TableSort.tsx";
import {useParams} from "react-router-dom";
import {useGetPackagesList} from "@entities/servicePackage";

const PackagesPage = () =>{
  const {id} = useParams();
  if(!id){
    throw new Error('Вы не выбрали документ РКО')
  }

  const {data} = useGetPackagesList(id);

  return (
    <StyledPackagesPage>
      <T font="Header/H1">Пакеты услуг</T>
      <Search placeholder="Введите номер подписки"/>
      <TableSort columnList={columnList} rowList={data || []}  queryKey="servicePackage-list"/>
    </StyledPackagesPage>
  )
}

export default PackagesPage;
