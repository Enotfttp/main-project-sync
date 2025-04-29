import * as React from 'react';
import {Search} from "@features/Search/Search.tsx";
import {StyledPackagesPage} from "./PackagesPage.styled.ts";
import {T} from "@admiral-ds/react-ui";
import {columnList} from "./PackagesTable.columns.tsx";
import {TableSort} from "@features/TableSort/TableSort.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {routesPath} from "@app/index";
import {useGetPackagesList} from "@entities/servicePackage";

const PackagesPage = () =>{
  const {id} = useParams();
  if(!id){
    throw new Error('Вы не выбрали документ РКО')
  }

  const navigate = useNavigate();
  const {data} = useGetPackagesList(id);


  const onRowClick = (rowId: string | number) =>{
    navigate(routesPath.service.packages.fullPath(rowId))
  }

  return (
    <StyledPackagesPage>
      <T font="Header/H1">Пакеты услуг</T>
      <Search placeholder="Введите номер документа РКО"/>
      <TableSort columnList={columnList} rowList={data || []} onRowClick={onRowClick} />
    </StyledPackagesPage>
  )
}

export default PackagesPage;
