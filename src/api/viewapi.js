const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getViewCount = async () => {
    const response = await fetch(`${API_URL}/api/view_count`);

    let data;
    try {
        data = await response.json();
    } catch (error) {
        console.log('Could not parse response JSON:', error);
    }

    if (!response.ok) {
        throw new Error(data?.error || `Failed to fetch view count (${response.status})`);
    }

    return data;
};

export const updateViewCount = async (isChecked, systemInfo = {}) => {
    const response = await fetch(`${API_URL}/api/view_count`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isChecked, ...systemInfo }),
    });

    let data;
    try {
        data = await response.json();
    } catch (error) {
        console.log('Could not parse response JSON:', error);
    }

    if (!response.ok) {
        throw new Error(data?.error || `Failed to update view count (${response.status})`);
    }

    return data;
};
