import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Brigade, transformBrigadeArray } from "../../models/Brigade";
import { Department } from "../../models/Department";
import { ConnectionState, transformConnectionStateArray } from "../../models/ConnectionState";
import BrigadeService from "../../services/BrigadeService";

interface UserState {
    brigades: Brigade[] | null;
    departments: Department[] | null;
    connectionStates: ConnectionState[] | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    brigades: null,
    departments: null,
    connectionStates: null,
    isLoading: false,
    error: null,
};

export const brigadesSlice = createSlice({
    name: "brigades",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchBrigades.fulfilled.type,
                (state, action: PayloadAction<Brigade[]>) => {
                    state.isLoading = false;
                    state.error = null;
                    state.brigades = action.payload;
                }
            )
            .addCase(fetchBrigades.pending.type, (state) => {
                state.isLoading = true;
            })
            .addCase(
                fetchBrigades.rejected.type,
                (state, action: PayloadAction<string>) => {
                    state.isLoading = false;
                    state.error = action.payload;
                }
            )

            .addCase(
                fetchConnectionStates.fulfilled.type,
                (state, action: PayloadAction<ConnectionState[]>) => {
                    state.isLoading = false;
                    state.error = null;
                    state.connectionStates = action.payload;
                }
            )
            .addCase(fetchConnectionStates.pending.type, (state) => {
                state.isLoading = true;
            })
            .addCase(
                fetchConnectionStates.rejected.type,
                (state, action: PayloadAction<string>) => {
                    state.isLoading = false;
                    state.error = action.payload;
                }
            )

            .addCase(
                fetchDepartments.fulfilled.type,
                (state, action: PayloadAction<Department[]>) => {
                    state.isLoading = false;
                    state.error = null;
                    state.departments = action.payload;
                }
            )
            .addCase(fetchDepartments.pending.type, (state) => {
                state.isLoading = true;
            })
            .addCase(
                fetchDepartments.rejected.type,
                (state, action: PayloadAction<string>) => {
                    state.isLoading = false;
                    state.error = action.payload;
                }
            );
    },
});

export const fetchBrigades = createAsyncThunk(
    "brigades/fetchBrigades",
    async (_, thunkAPI) => {
        try {
            const response = await BrigadeService.getBrigadesData();
            return transformBrigadeArray(response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                "Не удалось загрузить данные бригад"
            );
        }
    }
);

export const fetchConnectionStates = createAsyncThunk(
    "brigades/fetchConnectionStates",
    async (_, thunkAPI) => {
        try {
            const response = await BrigadeService.getConnectionState();
            return transformConnectionStateArray(response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                "Не удалось загрузить данные соединения бригад"
            );
        }
    }
);

export const fetchDepartments = createAsyncThunk(
    "brigades/fetchDepartment",
    async (_, thunkAPI) => {
        try {
            const response = await BrigadeService.getDepartments();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                "Не удалось загрузить данные департаментов бригад"
            );
        }
    }
);

export default brigadesSlice.reducer;
