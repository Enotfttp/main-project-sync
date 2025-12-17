export type PackageStatus = "CREATED" | "ACTIVE" | "INACTIVE";

export interface IDocuments {
  id: number;
  incomingMessageId: number;
  requestId: number;
  processDate: string;
  creation_date: string;
  execution_date: string;
  doc_type: string;

  // TODO: уточнить поля документа (creation_date, execution_date, type и т.д.)

  status: "CREATED" | "PROCESSED";
}
