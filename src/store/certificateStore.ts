import { create } from 'zustand';

export type CertificateStore = {
  isCertificated: boolean;
  setIsCertificated: (state: boolean) => void;
};

export const certificateStore = create<CertificateStore>((set) => ({
  isCertificated: false,
  setIsCertificated: (state: boolean) => set({ isCertificated: state }),
}));
