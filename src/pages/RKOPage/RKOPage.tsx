import * as React from 'react';
import {useGetRKOList} from "@entities/rko";
import {Search} from "@features/Search/Search.tsx";
import {StyledRKOPage} from "./RKOPage.styled";
import {T} from "@admiral-ds/react-ui";
import {columnList} from "./RKOTable.columns.tsx";
import {TableSort} from "@features/TableSort/TableSort.tsx";

const RKOPage = () =>{
  const {data} = useGetRKOList();

  return (
    <StyledRKOPage>
      <T font="Header/H1" >Договора РКО</T>
      <Search placeholder="Введите номер документа РКО"/>
      <TableSort columnList={columnList} rowList={data || []}  />
    </StyledRKOPage>
  )
}

export default RKOPage;
