import type { User } from "../types/user"

export type Action = {
    type: "NEW_USER"; payload: User;
}

const SPReducer = (state: User[] = [], action: Action) => {
    if (action.type === "NEW_USER") {
        return state.concat(action.payload);
    }
    return state;
};
export default SPReducer;