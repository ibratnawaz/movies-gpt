/* eslint-disable @typescript-eslint/no-explicit-any */

import auth from '@/utils/firebase.config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User
} from 'firebase/auth';

export type UserFormData = {
  username?: string;
  email: string;
  password: string;
};

export async function signInUser(user: UserFormData): Promise<User> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function signUpUser(user: UserFormData) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
    await updateProfile(userCredential.user, {
      displayName: user.username
    });
    return auth.currentUser;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function signOutUser() {
  try {
    await signOut(auth);
    console.log('Logged out!');
  } catch (error: any) {
    throw new Error(error);
  }
}
