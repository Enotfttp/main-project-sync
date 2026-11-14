import { create } from "zustand";

const STORAGE_KEY = "document-union-history";

type TDocumentUnionHistory = {
  returnPath: string | null;
  previousIds: string[];
};

interface DocumentUnionStore extends TDocumentUnionHistory {
  start: (returnPath: string) => void;
  push: (documentId: string) => void;
  pop: () => string | undefined;
  reset: () => void;
}

const emptyHistory = (): TDocumentUnionHistory => ({
  returnPath: null,
  previousIds: [],
});

const readHistory = (): TDocumentUnionHistory => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyHistory();

    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return emptyHistory();

    const record = parsed as Partial<TDocumentUnionHistory>;

    return {
      returnPath:
        typeof record.returnPath === "string" ? record.returnPath : null,
      previousIds: Array.isArray(record.previousIds)
        ? record.previousIds.filter((id) => typeof id === "string")
        : [],
    };
  } catch {
    return emptyHistory();
  }
};

const writeHistory = (history: TDocumentUnionHistory) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

export const useDocumentUnionStore = create<DocumentUnionStore>((set, get) => ({
  ...readHistory(),
  start: (returnPath) => set({ returnPath, previousIds: [] }),
  push: (documentId) =>
    set((state) => ({ previousIds: [...state.previousIds, documentId] })),
  pop: () => {
    const previousIds = get().previousIds;
    const documentId = previousIds.at(-1);
    set({ previousIds: previousIds.slice(0, -1) });
    return documentId;
  },
  reset: () => set(emptyHistory()),
}));

useDocumentUnionStore.subscribe((state) => {
  writeHistory({
    returnPath: state.returnPath,
    previousIds: state.previousIds,
  });
});
