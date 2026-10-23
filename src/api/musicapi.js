const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const uploadMusic = async (file) => {
    const formData = new FormData();
    formData.append('music', file);

    const response = await fetch(`${API_URL}/api/music/upload`, {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Failed to upload music');
    }
    return data;
};

export const getAllMusic = async () => {
    const response = await fetch(`${API_URL}/api/music/list`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch music list');
    }
    return data;
};

export const deleteMusic = async (id) => {
    const response = await fetch(`${API_URL}/api/music/${id}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Failed to delete music');
    }
    return data;
};

export const updateMusic = async (file) => {
    const formData = new FormData();
    formData.append('music', file);

    const response = await fetch(`${API_URL}/api/music/update`, {
        method: 'PUT',
        body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Failed to update music');
    }
    return data;
};
