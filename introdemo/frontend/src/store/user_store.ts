import { create } from "zustand";
import type { User } from "../types/user";

type UserState = {
    user: User | null,
    setUser: (user: User | null) => void
}

export const UserStore = create<UserState>((set) => ({
    user: null,

    setUser: (user: User | null) => set({user})
}))