export interface User {
  id: number;
  email: string;
  emailVerified: boolean;
  name: string;
  pictureUrl: string;
  locale: string;
  familyName: string;
  givenName: string;
  claims: string;
}

type Role = 'owner' | 'member';

export interface Member extends User {
  role: Role;
}