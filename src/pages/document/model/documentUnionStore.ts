import { create } from "zustand";

const STORAGE_KEY = "document-union-history";

interface DocumentUnionStore {
  previousIds: string[];
  push: (documentId: string) => void;
  pop: () => string | undefined;
  reset: () => void;
}

const readPreviousIds = (): string[] => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    const ids = Array.isArray(parsed)
      ? parsed
      : parsed &&
          typeof parsed === "object" &&
          "previousIds" in parsed &&
          Array.isArray(parsed.previousIds)
        ? parsed.previousIds
        : [];

    return ids.filter((id) => typeof id === "string");
  } catch {
    return [];
  }
};

export const useDocumentUnionStore = create<DocumentUnionStore>((set, get) => ({
  previousIds: readPreviousIds(),
  push: (documentId) =>
    set((state) => ({ previousIds: [...state.previousIds, documentId] })),
  pop: () => {
    const previousIds = get().previousIds;
    const documentId = previousIds.at(-1);
    set({ previousIds: previousIds.slice(0, -1) });
    return documentId;
  },
  reset: () => set({ previousIds: [] }),
}));

useDocumentUnionStore.subscribe((state) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state.previousIds));
});
