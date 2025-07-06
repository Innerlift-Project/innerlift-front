export interface ISignUpRequestBody {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    tosAndPrivacy: boolean;
}