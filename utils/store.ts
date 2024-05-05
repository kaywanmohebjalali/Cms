import { create } from 'zustand'


export type State={
    count:number;
    increment:()=>void;
    reset:()=>void;
    decrement:(n:number)=>void;
    loading:boolean;
    setLoading:Function;
    funcSetLoading:(func:Function)=>void;
    funcLoading:(func:any)=>void;
  }

export type Action = {
    increment: () => void
    decrement: (num:number) => void
    funcLoading:(result:any)=>void
    funcSetLoading:(func:Function)=>void

  }


export const useStore = create<State & Action>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    reset: () => set({ count: 0 }),
    decrement: (newCount:number) => set({ count: newCount }),


    loading:false,
    funcLoading:((load:any) => set({ loading:  load})),

    setLoading:()=>{},
    funcSetLoading:((func:Function) => set({ setLoading: func }))
  }))
