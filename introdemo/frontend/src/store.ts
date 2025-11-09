import { configureStore } from "@reduxjs/toolkit";
import SPReducer from "./reducers/SPReducer";

export const store = configureStore ({
    reducer: SPReducer,
});