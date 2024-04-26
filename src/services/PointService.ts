import axios, { AxiosResponse } from "axios";
import { API_URL, getBrigadesData_ROUTE, getPointsFast_ROUTE } from "./APIconsts";

export default class PointService {
    static async getPointsFast(countOfPoints: number): Promise<
        AxiosResponse<any>
    > {
        const result = axios.get<any>(
            `${API_URL}/${getPointsFast_ROUTE}?points=${countOfPoints}`
        );
        return result;
    }
}
