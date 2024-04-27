export interface ConnectionState {
    id: number;
    name: string;
}

/**
 * Преобразует данные изи API в interface ConnectionState
 */
export const transformConnectionStateArray = (backendData: Array<{ connectionStateId: number; name: string }>): ConnectionState[] => {
    return backendData.map(data => ({
      id: data.connectionStateId,
      name: data.name,
    }));
  };
