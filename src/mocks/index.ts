export const enableMocking = async () => {
  if (import.meta.env.VITE_API_MOCKS === "true") {
    const { startWorker } = await import("./browser");
    await startWorker();
  }
};
