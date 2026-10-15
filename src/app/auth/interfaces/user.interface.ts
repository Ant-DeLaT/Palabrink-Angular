export interface User {
    name: string;
    password: string;
    role: UserRole;
    email: string;
}

export enum UserRole {
    USER = 0,
    ADMIN = 1,
}