import { ConnectionState } from "./ConnectionState";
import { Department } from "./Department";

export interface Brigade {
    id: number;
    name: string;
    connectionStateId: number;
    departmentId: number;
    // connectionState: ConnectionState
    // department: Department
    position: Position;
}

export interface Position {
    field: string;
    cluster: number;
    well: number;
}

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
