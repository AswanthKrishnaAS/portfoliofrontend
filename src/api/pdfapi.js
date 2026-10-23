const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const uploadPdf = async (file) => {
    const formData = new FormData();
    formData.append('pdf', file);

    const response = await fetch(`${API_URL}/api/pdf/upload`, {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Failed to upload PDF');
    }
    return data;
};

export const getActivePdf = async () => {
    const response = await fetch(`${API_URL}/api/pdf/active`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Failed to get active PDF');
    }
    return data;
};

export const getAllPdfs = async () => {
    const response = await fetch(`${API_URL}/api/pdf/list`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Failed to get PDF list');
    }
    return data;
};

export const deleteActivePdf = async () => {
    const response = await fetch(`${API_URL}/api/pdf/active`, {
        method: 'DELETE',
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Failed to delete PDF');
    }
    return data;
};
