import { create } from "zustand";
import type { sellingPoint, SPZone } from "../types/sellingPoint"
//import { createTask, getAllTasks, getTask, updateTaskStatus, getTasksByCategory } from "../services/taskApi";
import { getAll, addSelling, getSellingPointsByZone, getSellingPointsByStoreName } from "../services/sellingPointsApi";

type SPState = {
    SP?: sellingPoint[];
    filterZone?: SPZone;

    fetchSP: () => Promise<void>;
    addSP: (task: Omit<sellingPoint, "id">) => Promise<void>;
    changeFilterZone: (category: SPZone) => Promise<void>;
    changeSearch: (name: string) => Promise<void>;

};

export const SPStore = create<SPState>((set) => ({
    SP: [],
    filterZone: undefined,

    fetchSP: async () => {
        const res =  await getAll();
        const allSP = Array.isArray(res)? res : []
        set({SP: allSP});

    },

    addSP: async (sp: Omit<sellingPoint, "id">) => {
        //const createdSP = (await addSelling(sp)) as sellingPoint;
        //set((state: SPState) => ({SP: state.SP ? [...state.SP, createdSP] : [createdSP]}));
    },

    changeFilterZone: async (zone: SPZone) => {
        if (zone) {
            const filteredSP = await getSellingPointsByZone(zone);
            set({ filterZone: zone, SP: filteredSP })
        } else {
            const allSP = await getAll();
            set({ filterZone: undefined, SP: allSP })
        }
    },
    changeSearch: async (name: string) =>{
        const filteredSP = await getSellingPointsByStoreName(name);
        set({SP: filteredSP})
    }
}
));