import {combineReducers, configureStore } from "@reduxjs/toolkit"
import brigadesReducer from "./reducers/BrigadesSlice"


const rootReducer = combineReducers({
    brigadesReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
