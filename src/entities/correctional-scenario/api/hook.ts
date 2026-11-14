import { correctionalScenarioService } from "./api";
import { IAccountInfo, ICorrectionalScenarioFilter } from "../model/types";
import { useMutation } from "@tanstack/react-query";

export const useFindCorrectionalScenario = () =>
  useMutation({
    mutationFn: (filters: ICorrectionalScenarioFilter) =>
      correctionalScenarioService.getCorrectionalScenario(filters),
  });

export const useUpdateCorrectionalScenario = () =>
  useMutation({
    mutationFn: ({ id, fields }: { id: UUID; fields: IAccountInfo }) =>
      correctionalScenarioService.patchCorrectionalScenario(id, fields),
  });
