export interface User {
  uid: string;
  email: string | null | undefined;
  name: string | null | undefined;
  token: string;
  provider: string | null | undefined;
  photoURL: string | null | undefined;
}

export type UserProfile = {
  displayName?: string;
  photoURL?: string;
};
