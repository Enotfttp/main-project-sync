export interface Service {
  id: string;
  name: string;
  description: string;
}

export interface ChartData {
  id: string;
  label: string;
  value: number;
  color: string;
}

export interface TableData {
  id: string;
  name: string;
  value: number;
  date: string;
  status: 'completed' | 'danger' | 'pending';
}

export interface DashboardData {
  chartData: ChartData[];
  tableData: Record<string, TableData[]>;
}
