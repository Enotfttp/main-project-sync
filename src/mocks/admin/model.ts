import {
  ChartData,
  ErrorsChart,
  Service,
  TableData,
} from "@entities/admin/types";
import { Model } from "miragejs";

// Типы для моделей MirageJS
export type ServiceModel = Partial<Service>;
export type ChartDatumModel = {
  serviceId?: string;
  charts?: ChartData[];
};
export type ErrorModel = Record<string, ErrorsChart[]>;
export type TableDatumModel = Record<string, Record<string, TableData[]>>;

export const adminModels = {
  service: Model.extend<ServiceModel>({}),
  chartDatum: Model.extend<ChartDatumModel>({}),
  error: Model.extend<ErrorModel>({}),
  tableDatum: Model.extend<TableDatumModel>({}),
};
