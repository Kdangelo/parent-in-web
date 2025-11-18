export type User = {
    id: string;
    email: string;
    name: string;
    password?: string;
    enable: boolean
}

export type UserCreate = User & { passwordConfirm: string };

export type UserVerify = {
    code: string;
    email: string
}

export type Rta = {
    accessToken: string;
    user: User;
    message?: string;
}