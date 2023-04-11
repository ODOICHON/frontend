import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

type UserStore = {
  user: User | null;
  token: Token | null;
  setUser: (user: User | null) => void;
  setToken: (token: Token | null) => void;
  logout: () => void;
};
type UserPersist = (
  config: StateCreator<UserStore>,
  options: PersistOptions<UserStore>,
) => StateCreator<UserStore>;

const userStore = create<UserStore>(
  (persist as UserPersist)(
    (set) => ({
      user: null,
      token: null,
      setToken: (token: Token | null) => set({ token }),
      setUser: (user: User | null) => set({ user }),
      logout: () => {
        set({ token: null });
        set({ user: null });
      },
    }),
    {
      name: 'user',
    },
  ),
);

export default userStore;
