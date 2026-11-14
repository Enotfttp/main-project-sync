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
  location: { pathname: string },
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

  useDocumentUnionStore.getState().reset();
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
  const pop = useDocumentUnionStore((state) => state.pop);

  const previousId = previousIds.at(-1);
  if (!idDocumentUnion || !previousId) return null;

  const to = compileMatchedPath(pathname, { idDocumentUnion: previousId });
  if (!to) return null;

  return {
    navigation: {
      to,
      backLabel: pageTitle(to),
      title: pageTitle(pathname),
    },
    onBack: () => {
      pop();
      navigate(to);
    },
  };
};
