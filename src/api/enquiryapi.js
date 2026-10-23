const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getEnquiries = async () => {
    const response = await fetch(`${API_URL}/api/enquiries`);
    let data;
    try {
        data = await response.json();
    } catch (error) {
        console.error('Could not parse JSON:', error);
    }

    if (!response.ok) {
        throw new Error(data?.error || `Failed to fetch enquiries (${response.status})`);
    }

    return data;
};

export const createEnquiry = async (enquiryData) => {
    const response = await fetch(`${API_URL}/api/enquiries`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(enquiryData),
    });

    let data;
    try {
        data = await response.json();
    } catch (error) {
        console.error('Could not parse JSON:', error);
    }

    if (!response.ok) {
        throw new Error(data?.error || `Failed to create enquiry (${response.status})`);
    }

    return data;
};

export const updateEnquiryStatus = async (id, status) => {
    const response = await fetch(`${API_URL}/api/enquiries/${id}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
    });

    let data;
    try {
        data = await response.json();
    } catch (error) {
        console.error('Could not parse JSON:', error);
    }

    if (!response.ok) {
        throw new Error(data?.error || `Failed to update enquiry status (${response.status})`);
    }

    return data;
};

export const deleteEnquiry = async (id) => {
    const response = await fetch(`${API_URL}/api/enquiries/${id}`, {
        method: 'DELETE',
    });

    let data;
    try {
        data = await response.json();
    } catch (error) {
        console.error('Could not parse JSON:', error);
    }

    if (!response.ok) {
        throw new Error(data?.error || `Failed to delete enquiry (${response.status})`);
    }

    return data;
};
