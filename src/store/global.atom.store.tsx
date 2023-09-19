import { atom } from 'jotai';
import type { User } from 'firebase/auth';

export const userInfoAtom = atom<null | User>(null);
export const isUserLoggedInAtom = atom((get) => get(userInfoAtom) !== null);
