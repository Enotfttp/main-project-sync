export interface IServiceItem {
  id: string;
  label: string;
  to?: string;
  action?(): void;
}

export interface IServiceGroupConfig {
  id: string;
  title: string;
  services: IServiceItem[];
}
