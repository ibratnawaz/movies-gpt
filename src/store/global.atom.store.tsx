import { atom } from 'jotai';
import type { User } from 'firebase/auth';

export const isUserLoggedInAtom = atom(false);
export const userInfoAtom = atom<null | User>(null);
