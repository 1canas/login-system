export class PasswordNotMatchError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PasswordNotMatchError";
    }
}