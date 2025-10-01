export const apiLogin = async (email, password) => {

    await new Promise(resolve => setTimeout(resolve, 500));

    if (email === 'test@example.com' && password === 'password') {
        return {
            user: { id: 1, name: 'Test User', email },
            token: 'fake-jwt-token-for-testing-purposes',
        };
    }
    
    throw new Error('Invalid credentials');
};

export const apiSignup = async (name, email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log(`Signing up with name: ${name}, email: ${email}`);
    return {
        user: { id: Date.now(), name, email },
        token: 'fake-jwt-token-for-new-user',
    };
};