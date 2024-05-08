import { create } from 'zustand'


export type StateType = {
  loading: boolean;
  setLoading: Function;
}


export type ActionType = {
  setLoading: (bool: Boolean) => void
}



export const useStore = create<StateType & ActionType>((set) => ({
  loading: false,
  setLoading: ((bool: any) => set({ loading: bool })),
}))
