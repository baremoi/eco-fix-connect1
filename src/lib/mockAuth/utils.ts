
import { MockUser, MockProfile, STORAGE_KEYS } from './types';

export const storeUserData = (user: MockUser, profile: MockProfile) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
};

export const clearUserData = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.PROFILE);
};
