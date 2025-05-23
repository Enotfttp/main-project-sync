import * as React from 'react';
import { T } from '@admiral-ds/react-ui';
import { useParams } from 'react-router-dom';
import { StyledPackagesPage } from './PackagesPage.styled';
import { columnList } from './PackagesTable.columns';
import { TableSort } from '@shared/index';
import { SearchWithFilter } from '@features/index';
import { useGetPackagesList, TFiltersServicePackage } from '@entities/servicePackage';

const PackagesPage = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error('Вы не выбрали документ РКО');
  }
  const [filters, setFilters] = React.useState<TFiltersServicePackage>();
  const { data } = useGetPackagesList({ ...filters, idRKO: id });

  return (
    <StyledPackagesPage>
      <T font="Header/H1">Пакеты услуг</T>
      <SearchWithFilter<TFiltersServicePackage>
        selectPlaceholder="Выберите поле из выпадающего списка"
        columnList={columnList}
        setFilters={setFilters}
        searchPlaceholder="Введите номер пакета услуг"
      />
      <TableSort columnList={columnList} rowList={data || []} queryKey="servicePackage-list" />
    </StyledPackagesPage>
  );
};

export default PackagesPage;
