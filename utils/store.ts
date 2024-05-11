import { create } from 'zustand'


export type StateType = {
  loading: boolean;
  teachers:String[];
}


export type ActionType = {
  setLoading: (bool: Boolean) => void
  setTeachers: (values: string[]) => void
}



export const useStore = create<StateType & ActionType>((set) => ({
  teachers:[],
  setTeachers: ((teachers: any) => set({ teachers: teachers })),

  loading: false,
  setLoading: ((bool: any) => set({ loading: bool })),
}))
