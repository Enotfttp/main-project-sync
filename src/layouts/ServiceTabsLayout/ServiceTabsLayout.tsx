import {Outlet, useParams} from 'react-router-dom';
import {HorizontalTabsTemplate} from "@shared/index";
import {StyledUnderTabsLayout} from "./ServiceTabsLayout.styled";
import {routesPath} from "@app/index";
import {useMemo} from "react";


export const ServiceTabsLayout = () => {
  const {id} = useParams();
  if(!id){
    throw new Error('Вы не выбрали документ РКО')
  }

  const tabs = useMemo(() => [
    { text: 'Подписки', tabId: '1',path: routesPath.service.connections.shortPath((id))},
    { text: 'Пакеты услуг', tabId: '2',path: routesPath.service.packages.shortPath((id))},
  ]  ,[])

  return (
    <>
      <HorizontalTabsTemplate tabs={tabs} isRedirect/>
      <StyledUnderTabsLayout>
        <Outlet />
      </StyledUnderTabsLayout>
    </>
  )};

