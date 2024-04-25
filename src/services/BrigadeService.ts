import axios, { AxiosResponse } from "axios";
import {
    API_URL,
    getBrigadesData_ROUTE,
    getConnectionState_ROUTE,
    getDepartments_ROUTE,
} from "./APIconsts";

export default class BrigadeService {
    static async getBrigadesData(): Promise<AxiosResponse<any>> {
        const result = axios.get<any>(`${API_URL}/${getBrigadesData_ROUTE}`);

        return result;
    }

    static async getDepartments(): Promise<AxiosResponse<any>> {
        const result = axios.get<any>(`${API_URL}/${getDepartments_ROUTE}`);

        return result;
    }

    static async getConnectionState(): Promise<AxiosResponse<any>> {
        const result = axios.get<any>(`${API_URL}/${getConnectionState_ROUTE}`);

        return result;
    }
}
