import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "filter",
    initialState: "ALL",
    reducers: {
        filterChange(_: string, action: PayloadAction<string>) {
            return action.payload;
        },
    },
});
export const { filterChange } = slice.actions;
export default slice.reducer;