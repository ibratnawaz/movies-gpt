import type { LatestMoviesType } from '@/service/movies-api';
import type { User } from 'firebase/auth';
import { atom } from 'jotai';

export const userInfoAtom = atom<null | User>(null);
export const isUserLoggedInAtom = atom((get) => get(userInfoAtom) !== null);
export const newMoviesAtom = atom<null | LatestMoviesType>(null);
