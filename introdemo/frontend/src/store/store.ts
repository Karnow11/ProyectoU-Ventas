import { configureStore } from "@reduxjs/toolkit";
import SPReducer from "../reducers/SPReducer";
import FilterReducer from "../reducers/FilterReducer";

export const store = configureStore ({
    reducer: {
        sellingPoints: SPReducer,
        filter: FilterReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;