import { correctionalScenarioService } from "./api";
import {
  IAccountInfo,
  ICorrectionalScenario,
  ICorrectionalScenarioFilter,
} from "../model/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetCorrectionalScenario = (
  filters?: ICorrectionalScenarioFilter,
  options?: Omit<
    UseQueryOptions<ICorrectionalScenario, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["correctional-scenario", filters],
    queryFn: () => correctionalScenarioService.getCorrectionalScenario(filters),
    ...options,
  });
};

export const usePatchCorrectionalScenario = (
  id: UUID,
  fields: IAccountInfo,
  options?: Omit<UseQueryOptions<void, Error>, "queryKey" | "queryFn">,
) => {
  return useQuery({
    queryKey: ["correctional-scenario", id, fields],
    queryFn: () =>
      correctionalScenarioService.patchCorrectionalScenario(id, fields),
    ...options,
  });
};
