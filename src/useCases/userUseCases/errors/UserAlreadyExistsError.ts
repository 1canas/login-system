export class UserAlreadyExistError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UserAlreadyExistError";
    }
}