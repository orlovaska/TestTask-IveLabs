export interface ConnectionState {
    id: number;
    name: string;
}

// Функция для преобразования данных бекенда в интерфейс ConnectionState
export const transformConnectionStateArray = (backendData: Array<{ connectionStateId: number; name: string }>): ConnectionState[] => {
    return backendData.map(data => ({
      id: data.connectionStateId,
      name: data.name,
    }));
  };
