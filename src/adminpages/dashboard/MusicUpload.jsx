import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { uploadMusic, getAllMusic, deleteMusic, updateMusic } from '../../api/musicapi';
import { 
    Search, 
    RefreshCw, 
    Upload, 
    Music, 
    X, 
    Trash2, 
    FileText,
    Play,
    Pause,
    Edit2
} from 'lucide-react';
import './Dashboard.css';

const MusicUpload = () => {
    const navigate = useNavigate();
    const [musicList, setMusicList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    // Modal States
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

    // Audio Playback State
    const [playingId, setPlayingId] = useState(null);
    const [audio] = useState(new Audio());

    const fetchMusic = async () => {
        setLoading(true);
        try {
            const data = await getAllMusic();
            setMusicList(data || []);
        } catch (error) {
            console.error("Failed to fetch music:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (!storedUser) {
            navigate('/admin/login');
            return;
        }
        fetchMusic();

        return () => {
            audio.pause();
        };
    }, [navigate, audio]);

    const handleTogglePlay = (id, path) => {
        if (playingId === id) {
            audio.pause();
            setPlayingId(null);
        } else {
            audio.src = `${API_URL}/${path}`;
            audio.play();
            setPlayingId(id);
            audio.onended = () => setPlayingId(null);
        }
    };

    const confirmDelete = async () => {
        try {
            setLoading(true);
            await deleteMusic(deleteModal.id);
            setDeleteModal({ show: false, id: null });
            fetchMusic();
        } catch (error) {
            alert(error.message);
            setLoading(false);
        }
    };

    const handleOpenUpload = () => {
        setIsEditMode(false);
        setShowUploadModal(true);
        setSelectedFile(null);
    };

    const handleOpenEdit = () => {
        setIsEditMode(true);
        setShowUploadModal(true);
        setSelectedFile(null);
    };

    const filteredMusic = musicList.filter(item => 
        (item.originalName || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="dashboard-container h-screen overflow-hidden">
            <Sidebar />

            <div className="dashboard-main flex-1 overflow-hidden">
                <Header />

                <main className="dashboard-content-area">
                    <div className="dashboard-inner-container animate-up">
                        
                        <div className="page-header-container">
                            <div className="page-header-text">
                                <h2 className="page-title">Music Management</h2>
                                <p className="page-subtitle">Upload and manage audio files for your portfolio.</p>
                            </div>
                            
                            <div className="page-actions-group">
                                <div className="dashboard-filter-wrap">
                                    <Search size={16} color="#94a3b8" />
                                    <input 
                                        type="text"
                                        placeholder="Search music..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="dashboard-filter-input"
                                    />
                                </div>

                                <button onClick={fetchMusic} className="page-action-btn">
                                    <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                                </button>

                                {musicList.length === 0 && (
                                    <button 
                                        onClick={handleOpenUpload}
                                        className="page-action-btn"
                                        style={{ background: 'var(--dash-green)', color: 'black', border: 'none', display: 'flex', gap: '8px', alignItems: 'center' }}
                                    >
                                        <Upload size={16} />
                                        Upload Music
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="dashboard-table container">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr>
                                            <th>Track Name</th>
                                            <th>Size</th>
                                            <th>Uploaded At</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr><td colSpan="4" className="text-center py-12 text-gray-400">Loading audio library...</td></tr>
                                        ) : filteredMusic.length === 0 ? (
                                            <tr><td colSpan="4" className="text-center py-12 text-gray-500">No music tracks found.</td></tr>
                                        ) : (
                                            filteredMusic.map(track => (
                                                <tr key={track._id}>
                                                    <td>
                                                        <div className="flex items-center gap-3">
                                                            <div className="icon-wrapper" style={{ width: '32px', height: '32px', margin: 0 }}>
                                                                <Music size={14} className="text-blue-400" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-gray-200">{track.originalName}</div>
                                                                <div className="text-[10px] text-gray-500 uppercase">Audio Track</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-gray-400 text-xs font-mono">
                                                        {(track.size / (1024 * 1024)).toFixed(2)} MB
                                                    </td>
                                                    <td className="text-gray-400 text-xs">
                                                        {new Date(track.uploadedAt).toLocaleDateString()}
                                                    </td>
                                                    <td>
                                                        <div className="flex items-center" style={{ gap: '24px' }}>
                                                            <button 
                                                                onClick={() => handleTogglePlay(track._id, track.path)}
                                                                className={`dashboard-action-btn ${playingId === track._id ? 'active' : ''}`}
                                                                style={{ background: playingId === track._id ? 'rgba(67, 160, 71, 0.1)' : '' }}
                                                                title={playingId === track._id ? 'Stop' : 'Play Preview'}
                                                            >
                                                                {playingId === track._id ? <Pause size={16} className="text-green-500" /> : <Play size={16} />}
                                                            </button>
                                                            <button 
                                                                onClick={handleOpenEdit}
                                                                className="dashboard-action-btn edit"
                                                                title="Replace / Edit"
                                                            >
                                                                <Edit2 size={16} />
                                                            </button>
                                                            <button 
                                                                onClick={() => setDeleteModal({ show: true, id: track._id })}
                                                                className="dashboard-action-btn delete"
                                                                title="Delete"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Upload/Edit Modal */}
            {showUploadModal && (
                <div className="dashboard-modal-overlay">
                    <div className="dashboard-modal animate-up">
                        <div className="dashboard-modal-header">
                            <h3 className="dashboard-modal-title">
                                {isEditMode ? 'REPLACE MUSIC' : 'UPLOAD MUSIC'}
                            </h3>
                            <button onClick={() => !uploading && setShowUploadModal(false)} className="dashboard-close-btn">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="upload-zone-premium" style={{ marginBottom: '24px' }}>
                            <input 
                                type="file" 
                                accept="audio/*"
                                onChange={(e) => setSelectedFile(e.target.files[0])}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                disabled={uploading}
                            />
                            <div className="text-center">
                                {selectedFile ? (
                                    <>
                                        <div className="icon-wrapper" style={{ color: 'var(--dash-green)', background: 'rgba(67, 160, 71, 0.1)' }}>
                                            <Music size={32} />
                                        </div>
                                        <p className="text-white font-bold text-sm truncate px-4">{selectedFile.name}</p>
                                    </>
                                ) : (
                                    <>
                                        <div className="icon-wrapper"><Upload size={32} /></div>
                                        <p className="text-white font-bold text-sm">Select Audio File</p>
                                        <p className="text-xs text-gray-500 mt-1">MP3, WAV, OGG up to 20MB</p>
                                    </>
                                )}
                            </div>
                        </div>

                        {statusMessage.text && (
                            <p className={`text-sm mb-4 ${statusMessage.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                                {statusMessage.text}
                            </p>
                        )}

                        <div className="dashboard-modal-actions">
                            <button onClick={() => setShowUploadModal(false)} className="dashboard-cancel-btn">Cancel</button>
                            <button 
                                onClick={async () => {
                                    if (!selectedFile) return;
                                    setUploading(true);
                                    try {
                                        if (isEditMode) {
                                            await updateMusic(selectedFile);
                                        } else {
                                            await uploadMusic(selectedFile);
                                        }
                                        setStatusMessage({ type: 'success', text: isEditMode ? 'Track updated!' : 'Music uploaded!' });
                                        setTimeout(() => {
                                            setShowUploadModal(false);
                                            fetchMusic();
                                            setSelectedFile(null);
                                            setStatusMessage({ type: '', text: '' });
                                        }, 1500);
                                    } catch (err) {
                                        setStatusMessage({ type: 'error', text: err.message });
                                    } finally {
                                        setUploading(false);
                                    }
                                }}
                                className="dashboard-confirm-btn success"
                                disabled={uploading || !selectedFile}
                            >
                                {uploading ? 'Processing...' : isEditMode ? 'Update' : 'Upload'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            {deleteModal.show && (
                <div className="dashboard-modal-overlay">
                    <div className="dashboard-modal animate-up">
                        <div className="dashboard-modal-icon" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                            <Trash2 className="text-red-500" size={32} />
                        </div>
                        <h3 className="dashboard-modal-title">Remove Track?</h3>
                        <p className="dashboard-modal-text">Are you sure you want to delete this track? This action cannot be undone.</p>
                        <div className="dashboard-modal-actions">
                            <button onClick={() => setDeleteModal({ show: false, id: null })} className="dashboard-cancel-btn">Back</button>
                            <button onClick={confirmDelete} className="dashboard-confirm-btn">Confirm Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MusicUpload;
