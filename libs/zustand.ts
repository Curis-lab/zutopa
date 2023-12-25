import { create } from "zustand"

type cartStore = {
    userModal: boolean
}

export const use = create<cartStore>((set)=>({
    userModal:true
}))