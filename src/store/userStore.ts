import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

type UserStore = {
  user: User | null;
  tokens: Tokens | null;
  setUser: (user: User) => void;
  setTokens: (tokens: Tokens) => void;
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
      tokens: null,
      setTokens: (tokens: Tokens) => set({ tokens }),
      setUser: (user: User) => set({ user }),
      logout: () => {
        set({ tokens: null });
        set({ user: null });
      },
    }),
    {
      name: 'user',
    },
  ),
);

export default userStore;
