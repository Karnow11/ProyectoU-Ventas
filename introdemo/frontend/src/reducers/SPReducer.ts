import type { sellingPoint } from "../types/sellingPoint"

export type Action = {
    type: "NEW_SP"; payload: sellingPoint;
}

const SPReducer = (state: sellingPoint[] = [], action: Action) => {
    if (action.type === "NEW_SP") {
        return state.concat(action.payload);
    }
    return state;
};
export default SPReducer;