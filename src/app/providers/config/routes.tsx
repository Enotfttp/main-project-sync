import  {RouteObject} from "react-router-dom";
import {RKOPage} from '@pages/index'
import React, {JSX, Suspense} from "react";
import {Loader} from "@shared/index";
import {MainLayout} from "@layouts/index";

const withSuspense = (Component: React.LazyExoticComponent<()=>JSX.Element>) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
)


export const routes:RouteObject[] = [
  {
    path:'/' ,
    element: <MainLayout />,
    children:[
      {path:'/', element:withSuspense(RKOPage)},
    ]
  }
];
