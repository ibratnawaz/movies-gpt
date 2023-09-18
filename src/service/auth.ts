import {
  type User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import auth from '../utils/firebase.config';

export type UserFormData = {
  username?: string;
  email: string;
  password: string;
};

export async function signInUser(user: UserFormData): Promise<User> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
    const userInfo = userCredential.user;
    return userInfo;
    // eslint-disable-next-line
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
    return signInUser(user);
    // eslint-disable-next-line
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function signOutUser() {
  try {
    await signOut(auth);
    console.log('Logged out!');
    // eslint-disable-next-line
  } catch (error: any) {
    throw new Error(error);
  }
}
