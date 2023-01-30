export function responseMessage(statusCode: number, message: string) {
    const dateObject = new Date();
    
    return {
        statusCode,
        message,
        timestamp: dateObject.getTime()
    }
}