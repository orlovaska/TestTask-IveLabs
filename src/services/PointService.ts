import axios, { AxiosResponse } from "axios";
import { API_URL, getBrigadesData_ROUTE } from "./APIconsts";

export default class ClassService {
    static async getPointsFast(countOfPoints: number): Promise<
        AxiosResponse<any>
    > {
        const result = axios.get<any>(
            `${API_URL}/${getBrigadesData_ROUTE}?points=${countOfPoints}`
        );
        const response = await result;

        if (response) {
            console.log("getClassesByOntologyId response: ", response);
            console.log("data: ", response?.data);
        }
        return result;
    }
}
