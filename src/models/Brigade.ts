export interface Brigade {
    id: number;
    name: string;
    connectionStateId: number;
    departmentId: number;
    position: Position;
}

export interface Position {
    field: string;
    cluster: number;
    well: number;
}

/**
 * Преобразует данные изи API в interface Brigade
 */
export function transformBrigadeArray(backendData: Array<any>): Brigade[] {
    return backendData.map((input) => ({
        id: input.id,
        name: input.brigade_name,
        connectionStateId: input.connectionStateId,
        departmentId: input.department.id,
        position: {
            field: input.position.field,
            cluster: input.position.cluster,
            well: input.position.well,
        },
    }));
}
