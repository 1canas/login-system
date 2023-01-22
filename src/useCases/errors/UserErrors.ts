export class UserExistsError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, UserExistsError.prototype);
    }
}