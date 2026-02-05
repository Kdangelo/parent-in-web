export type User = {
    id: string;
    email: string;
    name: string;
    lastName: string;
    password?: string;
    enable: boolean;
    isOnboardingCompleted: boolean;
    currentStage: string;
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