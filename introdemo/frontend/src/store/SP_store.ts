import { create } from "zustand";
import type { sellingPoint, SPZone } from "../types/sellingPoint"
//import { createTask, getAllTasks, getTask, updateTaskStatus, getTasksByCategory } from "../services/taskApi";
import { getAll, getSellingPointsByZone, getSellingPointsByStoreName } from "../services/sellingPointsApi";
import { getSP } from "../services/sellingPointsApi"
type SPState = {
    SP?: sellingPoint[];
    filterZone?: SPZone;
    modalOpened: boolean;
    openedSP?: sellingPoint;

    fetchSP: () => Promise<void>;
    changeFilterZone: (category: SPZone) => Promise<void>;
    changeSearch: (name: string) => Promise<void>;
    openModal: (id: string) => void;

};

export const SPStore = create<SPState>((set) => ({
    SP: [],
    filterZone: undefined,
    modalOpened: false,
    openedSP: undefined,

    fetchSP: async () => {
        const res =  await getAll();
        const allSP = Array.isArray(res)? res : []
        set({SP: allSP});

    },
    openModal: async (id: string) => {
        if (id === "-1"){
            set( {modalOpened: false, openedSP: undefined})
        } else {
            const SPToOpen = (await getSP(id)) as sellingPoint;
            set( {modalOpened: true, openedSP: SPToOpen});
        }
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