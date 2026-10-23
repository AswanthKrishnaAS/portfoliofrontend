const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const trackPdfDownload = async (isDownloaded, downloadStatus = 'successful', systemInfo = {}) => {
    const response = await fetch(`${API_URL}/api/download_track`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isDownloaded, downloadStatus, ...systemInfo }),
    });

    let data;
    try {
        data = await response.json();
    } catch (error) {
        console.log('Could not parse response JSON:', error);
    }

    if (!response.ok) {
        throw new Error(data?.error || `Failed to track download (${response.status})`);
    }

    return data;
};

export const getDownloadStats = async () => {
    const response = await fetch(`${API_URL}/api/download_track`);

    let data;
    try {
        data = await response.json();
    } catch (error) {
        console.log('Could not parse response JSON:', error);
    }

    if (!response.ok) {
        throw new Error(data?.error || `Failed to fetch download stats (${response.status})`);
    }

    return data;
};
