import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BranchId = 'wah-cantt';

export interface Branch {
  id: BranchId;
  name: string;
  shortName: string;
  address: string;
  mapUrl: string;
  phone: string;
  whatsapp: string;
  email: string;
}

export const BRANCHES: Record<BranchId, Branch> = {
  'wah-cantt': {
    id: 'wah-cantt',
    name: 'Wah Cantt',
    shortName: 'Wah Cantt',
    address: 'QQ84+P22, Wah Cantt, Punjab, Pakistan',
    mapUrl: 'https://maps.app.goo.gl/MeA3JkkUXXKNdfvP7',
    phone: '+92 332 5064607',
    whatsapp: 'https://wa.me/923325064607',
    email: 'supersweetsbakers@gmail.com'
  }
};

interface BranchState {
  selectedBranchId: BranchId;
  setBranch: (id: BranchId) => void;
  getCurrentBranch: () => Branch;
}

export const useBranchStore = create<BranchState>()(
  persist(
    (set, get) => ({
      selectedBranchId: 'wah-cantt', // Default branch
      setBranch: (id) => set({ selectedBranchId: id }),
      getCurrentBranch: () => {
        const branch = BRANCHES[get().selectedBranchId];
        return branch || BRANCHES['wah-cantt'];
      },
    }),
    {
      name: 'super-bakery-branch-storage', // unique name
    }
  )
);
