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

const pageTitle = (path: string) =>
  resolvePageNavigation(path.split("?")[0])?.title ?? "Список документов";

/**
 * Открывает список документов объединения.
 * В адресе остаётся только текущий id, предыдущие лежат в сторе для возврата.
 */
export const openDocumentUnion = (
  navigate: NavigateFunction,
  location: { pathname: string; search: string },
  params: Params,
  documentId: string,
) => {
  const { idDocumentUnion } = params;

  if (idDocumentUnion) {
    const to = compileMatchedPath(location.pathname, {
      idDocumentUnion: documentId,
    });
    if (!to) return;

    useDocumentUnionStore.getState().push(idDocumentUnion);
    navigate(to);
    return;
  }

  const to = resolveChildPath(location.pathname, "documentUnion", {
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
  const { idDocumentUnion } = useParams();
  const previousIds = useDocumentUnionStore((state) => state.previousIds);
  const returnPath = useDocumentUnionStore((state) => state.returnPath);
  const pop = useDocumentUnionStore((state) => state.pop);
  const reset = useDocumentUnionStore((state) => state.reset);

  if (!idDocumentUnion) return null;

  const title = pageTitle(pathname);
  const previousId = previousIds.at(-1);

  if (previousId) {
    const to = compileMatchedPath(pathname, { idDocumentUnion: previousId });
    if (!to) return null;

    return {
      navigation: {
        to,
        backLabel: pageTitle(to),
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
      backLabel: pageTitle(returnPath),
      title,
    },
    onBack: () => {
      reset();
      navigate(returnPath);
    },
  };
};
