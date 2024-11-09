import { User } from '@/types/global'
import { defaultUser } from '../types/default'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserStore = {
    user: User,
    setUser: (newUser: User) => void,
    reset: () => void
}


export const useUserStore = create<UserStore>()(
    persist((set) => ({
        user: defaultUser(),
        setUser: (newUser) => set({user: newUser}),
        reset: () => {
            set({user: defaultUser()})
          },
    }),
    {
        name: "userStore"
    })
)