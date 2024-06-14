import { create } from 'zustand'


export type StateType = {
  loading: boolean;
  teachers:String[];
  user:{};
  logout:true;
}


export type ActionType = {
  setLoading: (bool: Boolean) => void
  setTeachers: (values: string[]) => void
  setUser: (values: {}) => void
  setLogout: (values: {}) => void
}



export const useStore = create<StateType | ActionType>((set) => ({

  user:null,
  setUser: ((user) => set({ user: user })),

  teachers:[],
  setTeachers: ((teachers) => set({ teachers: teachers })),

  loading: false,
  setLoading: ((bool:any) => set({ loading: bool  })),

  logout: true,
  setLogout: ((bool:any) => set({ loading: bool  })),
}))

