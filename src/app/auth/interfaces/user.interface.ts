export interface PalabrinkUser {
  name?: string;
  password?: string;
  role?: UserRole;
  email?: string;
  profileImgUrl?: string;
}

export enum UserRole {
  USER = 0,
  ADMIN = 1,
}
