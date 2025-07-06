export interface IUser {
    id: string;
    fullName: string;
    username?: string;
    email: string;
    supportLevel: UserSupportLevel | null;
    pronouns: UserPronouns[] | null;
    bio: string | null;
    profilePicture: string | null;
    createdAt?: string;
    password?: string; 
}

export enum UserSupportLevel {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3,
}

export enum UserPronouns {
    HE_HIM = 'he/him',
    SHE_HER = 'she/her',
    THEY_THEM = 'they/them',
    ZE_ZIR = 'ze/zir',
    XE_XEM = 'xe/xem',
    IT_ITS = 'it/its',
    ANY_ALL = 'any/all',
    PREFER_NOT_TO_SAY = 'prefer not to say',
    OTHER = 'other',
}