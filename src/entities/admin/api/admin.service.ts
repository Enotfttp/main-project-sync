import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Service, DashboardData, ChartData, TableData } from '../types/admin.types';

// Моковые данные
const mockServices: Service[] = [
  {
    id: '1',
    name: 'Сервис А',
    description: 'Основной сервис аналитики',
  },
  {
    id: '2',
    name: 'Сервис Б',
    description: 'Вспомогательный сервис данных',
  },
  {
    id: '3',
    name: 'Сервис В',
    description: 'Сервис мониторинга',
  },
];

const mockChartData: ChartData[] = [
  {
    id: '1',
    label: 'Успешные',
    value: 65,
    color: '#4CAF50',
  },
  {
    id: '2',
    label: 'Ошибки',
    value: 15,
    color: '#F44336',
  },
  {
    id: '3',
    label: 'В процессе',
    value: 20,
    color: '#FFC107',
  },
];

const mockTableData: Record<string, TableData[]> = {
  '1': [
    {
      id: '1',
      name: 'Задача 1',
      value: 100,
      date: '2024-01-15',
      status: 'completed',
    },
    {
      id: '2',
      name: 'Задача 2',
      value: 150,
      date: '2024-01-16',
      status: 'completed',
    },
    {
      id: '3',
      name: 'Задача 3',
      value: 200,
      date: '2024-01-17',
      status: 'completed',
    },
  ],
  '2': [
    {
      id: '4',
      name: 'Ошибка 1',
      value: 10,
      date: '2024-01-15',
      status: 'danger',
    },
    {
      id: '5',
      name: 'Ошибка 2',
      value: 5,
      date: '2024-01-16',
      status: 'danger',
    },
  ],
  '3': [
    {
      id: '6',
      name: 'Процесс 1',
      value: 50,
      date: '2024-01-15',
      status: 'pending',
    },
    {
      id: '7',
      name: 'Процесс 2',
      value: 30,
      date: '2024-01-16',
      status: 'pending',
    },
    {
      id: '8',
      name: 'Процесс 3',
      value: 70,
      date: '2024-01-17',
      status: 'pending',
    },
  ],
};

// API функции
export const dashboardApi = {
  getServices: async (): Promise<Service[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockServices;
  },

  getDashboardData: async (): Promise<DashboardData> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const randomChartData = mockChartData.map((item) => ({
      ...item,
      value: Math.floor(Math.random() * 100) + 1,
    }));

    return {
      chartData: randomChartData,
      tableData: mockTableData,
    };
  },

  getTableData: async (serviceId: string, sectionId: string): Promise<TableData[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockTableData[sectionId] || [];
  },
};

// React Query хуки
export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: () => dashboardApi.getServices(),
  });
};

export const useDashboardData = (serviceId: string) => {
  return useQuery({
    queryKey: ['dashboard', serviceId],
    queryFn: () => dashboardApi.getDashboardData(),
    enabled: !!serviceId,
    staleTime: 2 * 60 * 1000,
  });
};

export const useTableData = (serviceId: string, sectionId: string | null) => {
  return useQuery({
    queryKey: ['tableData', serviceId, sectionId],
    queryFn: () => dashboardApi.getTableData(serviceId, sectionId!),
    enabled: !!serviceId && !!sectionId,
    staleTime: 1 * 60 * 1000,
  });
};

// Prefetch хук
export const usePrefetchDashboardData = () => {
  const queryClient = useQueryClient();

  return (serviceId: string) => {
    queryClient.prefetchQuery({
      queryKey: ['dashboard', serviceId],
      queryFn: () => dashboardApi.getDashboardData(),
    });
  };
};
