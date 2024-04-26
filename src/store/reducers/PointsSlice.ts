import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Department } from "../../models/Department";
import PointService from "../../services/PointService";
import { Point } from "../../models/Point";

interface PointsState {
    points: Point[] | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: PointsState = {
    points: null,
    isLoading: false,
    error: null,
};

export const pointsSlice = createSlice({
    name: "brigades",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchPoints.fulfilled.type,
                (state, action: PayloadAction<Point[]>) => {
                    state.isLoading = false;
                    state.error = null;
                    state.points = action.payload;
                }
            )
            .addCase(fetchPoints.pending.type, (state) => {
                state.isLoading = true;
            })
            .addCase(
                fetchPoints.rejected.type,
                (state, action: PayloadAction<string>) => {
                    state.isLoading = false;
                    state.error = action.payload;
                }
            );
    },
});

export const fetchPoints = createAsyncThunk(
    "brigades/fetchPoints",
    async (countOfPoints: number, thunkAPI) => {
        try {
            //TODO
            const response = await PointService.getPointsFast(countOfPoints);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                "Не удалось загрузить данные для графика"
            );
        }
    }
);

export default pointsSlice.reducer;
