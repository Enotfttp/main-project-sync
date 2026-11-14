import { useDocumentUnionStore } from "../model/documentUnionStore";
import {
  compileMatchedPath,
  resolveChildPath,
  resolvePageNavigation,
  TPageNavigation,
} from "@shared/lib";
import {
  NavigateFunction,
  Params,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

const originLabel = (returnPath: string) => {
  const pathname = returnPath.split("?")[0];
  return resolvePageNavigation(pathname)?.title ?? "Список документов";
};

/**
 * Сдвигает пару id в текущем маршруте.
 * Предыдущий idDocument остаётся в сторе, чтобы «Назад» собрал прежний адрес.
 */
export const openDocumentUnion = (
  navigate: NavigateFunction,
  location: { pathname: string; search: string },
  params: Params,
  documentId: string,
) => {
  const { idDocument, idDocumentUnion } = params;

  if (idDocument && idDocumentUnion) {
    useDocumentUnionStore.getState().push(idDocument);
    const to = compileMatchedPath(location.pathname, {
      idDocument: idDocumentUnion,
      idDocumentUnion: documentId,
    });
    if (to) navigate(to);
    return;
  }

  const to = resolveChildPath(location.pathname, "documentUnion", {
    idDocument: documentId,
    idDocumentUnion: documentId,
  });
  if (!to) return;

  useDocumentUnionStore
    .getState()
    .start(`${location.pathname}${location.search}`);
  navigate(to);
};

export const useDocumentUnionBack = (): {
  navigation: TPageNavigation;
  onBack: () => void;
} | null => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { idDocument, idDocumentUnion } = useParams();
  const previousIds = useDocumentUnionStore((state) => state.previousIds);
  const returnPath = useDocumentUnionStore((state) => state.returnPath);
  const pop = useDocumentUnionStore((state) => state.pop);
  const reset = useDocumentUnionStore((state) => state.reset);

  if (!idDocument || !idDocumentUnion) return null;

  const title = `Документы объединённого документа №${idDocumentUnion}`;
  const previousId = previousIds.at(-1);

  if (previousId) {
    const to = compileMatchedPath(pathname, {
      idDocument: previousId,
      idDocumentUnion: idDocument,
    });
    if (!to) return null;

    return {
      navigation: {
        to,
        backLabel: `Документ №${idDocument}`,
        title,
      },
      onBack: () => {
        pop();
        navigate(to);
      },
    };
  }

  if (!returnPath) return null;

  return {
    navigation: {
      to: returnPath,
      backLabel: originLabel(returnPath),
      title,
    },
    onBack: () => {
      reset();
      navigate(returnPath);
    },
  };
};
