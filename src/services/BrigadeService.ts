import axios, { AxiosResponse } from "axios";
import { API_URL, getBrigadesData_ROUTE, getConnectionState_ROUTE, getDepartments_ROUTE } from "./APIconsts";

export default class BrigadeService {
    static async getBrigadesData(): Promise<
        AxiosResponse<any>
    > {
        const result = axios.get<any>(
            `${API_URL}/${getBrigadesData_ROUTE}`
        );
        const response = await result;

        if (response) {
            console.log("getBrigadesData response: ", response);
            console.log("data: ", response?.data);
        }
        return result;
    }

    static async getDepartments(): Promise<
        AxiosResponse<any>
    > {
        const result = axios.get<any>(
            `${API_URL}/${getDepartments_ROUTE}`
        );
        const response = await result;

        if (response) {
            console.log("getDepartments response: ", response);
            console.log("data: ", response?.data);
        }
        return result;
    }

    static async getConnectionState(): Promise<
        AxiosResponse<any>
    > {
        const result = axios.get<any>(
            `${API_URL}/${getConnectionState_ROUTE}`
        );
        const response = await result;

        if (response) {
            console.log("getConnectionState response: ", response);
            console.log("data: ", response?.data);
        }
        return result;
    }
}
