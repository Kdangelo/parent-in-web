export type User = {
    id: string;
    email: string;
    name: string;
    password?: string;
    enable: boolean
}

export type Rta = {
    accessToken: string;
    user: User
}