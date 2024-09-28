export const loginCredentials = {
    valid: {
        login: process.env.LOGIN_NAME,
        pass: process.env.LOGIN_PASSWORD,
    },
    invalid: {
        login: 'invalid-email@example.com',
        pass: 'invalidPassword',
    }
}