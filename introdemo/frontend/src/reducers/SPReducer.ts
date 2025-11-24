import type { sellingPoint } from "../types/sellingPoint"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: sellingPoint[] = []
const slice = createSlice({
    name: "sellingPoints",
    initialState,
    reducers: {
        createSellingPoint (state: sellingPoint[], action: PayloadAction<sellingPoint>){
            state.push(action.payload);
        },
        toggleMovilityOf(state: sellingPoint[], action: PayloadAction<string>) {
            const id = action.payload;
            return state.map((sellingPoint) =>
                sellingPoint.id !== id ? sellingPoint : { ...sellingPoint, static_point: !sellingPoint.static_point }
            );
        },
        setSP(_, action) {
            return action.payload;
        },
    },
});

export const { createSellingPoint, toggleMovilityOf, setSP } = slice.actions;
export default slice.reducer;