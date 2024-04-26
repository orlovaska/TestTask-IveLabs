import {combineReducers, configureStore } from "@reduxjs/toolkit"
import brigadesReducer from "./reducers/BrigadesSlice"
import pointsReducer from "./reducers/PointsSlice"


const rootReducer = combineReducers({
    brigadesReducer,
    pointsReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
