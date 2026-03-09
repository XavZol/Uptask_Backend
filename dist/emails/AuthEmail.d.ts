interface IEmail {
    email: string;
    name: string;
    token: string;
}
export declare class AuthEmail {
    private static brandColors;
    private static createEmailTemplate;
    static sendConfirmationEmail: (user: IEmail) => Promise<void>;
    static sendPasswordResetToken: (user: IEmail) => Promise<void>;
}
export {};
