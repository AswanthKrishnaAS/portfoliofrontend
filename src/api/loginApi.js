const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const loginUser = async ({ username, password }) => {
    // Send 'email: username' because the backend expects 'email'
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
    });

    let data;
    try {
        data = await response.json();
    } catch (error) {
        console.log('Could not parse response JSON:', error);
    }

    if (!response.ok) {
        throw new Error(data?.error || `Login failed (${response.status})`);
    }

    return data;
};
