import { create } from 'zustand'


export type StateType = {
  loading: boolean;
  teachers:String[];
  user:{};
}


export type ActionType = {
  setLoading: (bool: Boolean) => void
  setTeachers: (values: string[]) => void
  setUser: (values: {}) => void
}



export const useStore = create<StateType | ActionType>((set) => ({

  user:{},
  setUser: ((user) => set({ user: user })),

  teachers:[],
  setTeachers: ((teachers) => set({ teachers: teachers })),

  loading: false,
  setLoading: ((bool:any) => set({ loading: bool  })),
}))

