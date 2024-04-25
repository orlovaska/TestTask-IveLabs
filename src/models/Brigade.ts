import { ConnectionState } from "./ConnectionState";
import { Department } from "./Department";

export interface Brigade {
    id: number;
    name: string;
    connectionState: ConnectionState
    department: Department
    position: Position;
}

export interface Position {
    field: string;
    cluster: number;
    well: number;
  }
  
